'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import AuthCheck from '@/components/AuthCheck';
import { ExamData, LinkItem, extractYear, generateExamId, processExamLinks } from '@/utils/examUtils'; // Import from utils
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; // Use standard Auth Helpers client

// Dynamically import the PDF components to avoid SSR issues
const PDFViewer = dynamic(
  () => import('@/components/PDFViewer'),
  { ssr: false }
);

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient(); // Initialize standard client
  const subject = params.subject as string;
  const examId = params.examId as string; // This ID comes from the URL
  const examKey = `${subject}-${examId}`; // The key used to lookup in fetched data
  
  const [allExamData, setAllExamData] = useState<{ [key: string]: ExamData } | null>(null);
  const [currentExam, setCurrentExam] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [numericInputValues, setNumericInputValues] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // State for saving progress

  // Define handleSubmit *before* the timer useEffect
  const handleSubmit = useCallback(async (isAutoSubmit = false) => { 
    if (isSubmitted || isLoading || !currentExam || isSaving) return; 
    
    if (!isAutoSubmit) {
        const confirmed = window.confirm("Are you sure you want to submit your exam?");
        if (!confirmed) return;
    }

    setIsSaving(true); 
    setIsSubmitted(true);
    setError(null); 
    
    let correctCount = 0;
    if (currentExam.answers) {
      for (let i = 1; i <= currentExam.totalQuestions; i++) {
        if (answers[i] !== undefined && String(answers[i]) === String(currentExam.answers[i-1])) {
          correctCount++;
        }
      }
    }
    const calculatedScore = currentExam.totalQuestions > 0 
      ? Math.round((correctCount / currentExam.totalQuestions) * 100)
      : 0;
    setScore(calculatedScore);

    // --- Save score to Supabase --- 
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: upsertError } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            subject: subject, 
            timed_exam_percentage: calculatedScore,
            last_updated: new Date().toISOString(),
          }, {
            onConflict: 'user_id,subject' 
          });

        if (upsertError) {
          throw upsertError;
        }
        console.log('Exam score saved successfully!');
      } else {
          console.warn('User not logged in. Score not saved.');
      }
    } catch (error) {
      console.error('Error saving exam score:', error);
      setError('Failed to save your score. Please try again later.');
    } finally {
        setIsSaving(false); 
    }
  }, [isSubmitted, isLoading, currentExam, isSaving, answers, supabase, subject]);

  // Fetch and process exam data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error on new fetch
      try {
        const response = await fetch('/collected_links.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const links: LinkItem[] = await response.json();
        const processedData = processExamLinks(links);
        setAllExamData(processedData);

        // *** Use the constructed examKey for lookup ***
        if (processedData[examKey]) { 
          setCurrentExam(processedData[examKey]);
          setTimeLeft(processedData[examKey].timeLimit * 60);
        } else {
          console.error(`Exam key not found: ${examKey}. Available keys:`, Object.keys(processedData));
          setError(`Exam data not found for key: ${examKey}. Please check the URL or exam list.`);
        }
      } catch (e) {
        console.error("Failed to fetch or process exam data:", e);
        setError(`Failed to load exam list. ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (examKey) { // Only fetch if examKey is valid
      fetchData();
    }
  }, [examKey]); // Re-run if examKey changes

  // Timer useEffect (no changes needed here)
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (!isLoading && timeLeft > 0 && !isSubmitted && currentExam) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalId) clearInterval(intervalId); // Clear interval before submitting
            handleSubmit(true); // Pass flag to indicate auto-submit due to time
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalId) clearInterval(intervalId); }; // Cleanup interval
  }, [isLoading, timeLeft, isSubmitted, currentExam, handleSubmit]); // Added handleSubmit dependency

  // handleAnswerSelect, handleNumericInputChange, handleSubmit, formatTime (no changes needed)
  const handleAnswerSelect = (questionNumber: number, answer: string | number) => {
    if (isSubmitted) return; // Prevent changes after submission
    setAnswers(prev => ({ ...prev, [questionNumber]: answer }));
  };

  const handleNumericInputChange = (questionNumber: number, value: string) => {
    if (isSubmitted) return;
    setNumericInputValues(prev => ({ ...prev, [questionNumber]: value }));
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      handleAnswerSelect(questionNumber, numericValue);
    } else {
      const newAnswers = { ...answers };
      delete newAnswers[questionNumber];
      setAnswers(newAnswers);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Loading and Error states (no changes needed)
  if (isLoading) {
     return (
       <div className="flex items-center justify-center h-screen">
         Loading exam data...
       </div>
     );
  }

  if (error && !isSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!currentExam) {
    // This state should ideally be covered by the error state, but keep as fallback
    return (
      <div className="flex items-center justify-center h-screen">
        Exam details could not be loaded. Key: {examKey}
      </div>
    );
  }

  // Results screen rendering (no changes needed, uses currentExam)
  if (isSubmitted && score !== null) {
    let correctCount = 0;
    if (currentExam?.answers) {
      for (let i = 1; i <= currentExam.totalQuestions; i++) {
        if (answers[i] !== undefined && String(answers[i]) === String(currentExam.answers[i-1])) {
          correctCount++;
        }
      }
    }
    return (
      <AuthCheck>
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">Exam Completed!</h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{currentExam.name} ({currentExam.year})</h2>
            {isSaving && <p className="text-blue-600 my-2">Saving score...</p>} 
            {error && !isSaving && <p className="text-red-600 my-2">Error saving score: {error}</p>} {/* Show save error here */} 
            <div className="text-6xl font-bold text-gray-700 my-4">{score}%</div>
            <p className="text-gray-700 mb-6">
              You got {correctCount} out of {currentExam.totalQuestions} questions correct.
            </p>
            <button
              onClick={() => router.push(`/subjects/${subject}/exams`)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Return to Exams List
            </button>
          </div>
        </div>
      </AuthCheck>
    );
  }

  // Main Exam UI rendering (no changes needed, uses currentExam)
  return (
    <AuthCheck>
      <div className="flex h-screen">
        {/* PDF Viewer */}
        <div className="w-1/2 h-full overflow-auto bg-gray-100 p-4">
          <div className="sticky top-0 bg-white p-4 shadow-sm mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">{currentExam.name} ({currentExam.year})</h2>
              <div className="text-red-600 font-bold">{formatTime(timeLeft)}</div>
            </div>
          </div>
          <PDFViewer pdfPath={currentExam.pdfUrl} />
        </div>

        {/* Answer Sheet */}
        <div className="w-1/2 h-full overflow-auto bg-white p-6 border-l">
          <div className="sticky top-0 bg-white p-4 shadow-sm mb-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Answer Sheet</h2>
            <div className={`grid ${currentExam.totalQuestions > 40 ? 'grid-cols-5' : currentExam.totalQuestions > 20 ? 'grid-cols-4' : 'grid-cols-3'} gap-3`}>
              {Array.from({ length: currentExam.totalQuestions }, (_, i) => i + 1).map(
                (questionNumber) => (
                  <div
                    key={questionNumber}
                    className="border rounded-lg p-3"
                  >
                    <div className="text-sm font-medium mb-2 text-center text-gray-700">Q{questionNumber}</div>
                    {currentExam.answerFormat === 'mcq' ? (
                      <div className={`grid ${currentExam.options?.length === 5 ? 'grid-cols-5' : currentExam.options?.length === 4 ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                        {(currentExam.options || []).map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAnswerSelect(questionNumber, option)}
                            disabled={isSubmitted} // Disable buttons after submission
                            className={`p-2 text-sm rounded-md ${
                              answers[questionNumber] === option
                                ? 'bg-indigo-600 text-white font-medium'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={numericInputValues[questionNumber] || ''}
                        onChange={(e) => handleNumericInputChange(questionNumber, e.target.value)}
                        disabled={isSubmitted} // Disable input after submission
                        className={`w-full border border-gray-300 rounded-md p-2 text-center text-sm focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        placeholder="0-999"
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="mt-4 sticky bottom-0 bg-white py-4">
            <button
              onClick={() => handleSubmit(false)} // Pass false for manual submit
              disabled={isSaving || isSubmitted}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors ${
                (isSaving || isSubmitted) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSaving ? 'Submitting...' : 'Submit Exam'}
            </button>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
} 