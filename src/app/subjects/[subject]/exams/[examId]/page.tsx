'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Mock data - replace with actual data from your backend
const mockExamData = {
  'mathematics-1': {
    pdfUrl: '/exams/mathematics/AMC10/amc10a_b_2018.pdf',
    totalQuestions: 25,
    timeLimit: 75,
  },
  'physics-1': {
    pdfUrl: '/exams/physics/fma/2021_Fma_exam.pdf',
    totalQuestions: 25,
    timeLimit: 75,
  },
  'chemistry-1': {
    pdfUrl: '/exams/chemistry/local/2022-usnco-local-exam.pdf',
    totalQuestions: 60,
    timeLimit: 110,
  },
  'biology-1': {
    pdfUrl: '/exams/biology/open/USABO 18 Open Exam.Final wo ans.pdf',
    totalQuestions: 50,
    timeLimit: 90,
  },
  'earth-science-1': {
    pdfUrl: '/exams/earth-science/open/2024_USESO_Open_Section-I_Test_Color.pdf',
    totalQuestions: 30,
    timeLimit: 120,
  }
  // Add more mock data as needed
};

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const subject = params.subject as string;
  const examId = params.examId as string;
  const examKey = `${subject}-${examId}`;
  
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(mockExamData[examKey as keyof typeof mockExamData]?.timeLimit * 60 || 0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionNumber: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    // Calculate score (mock implementation)
    const totalQuestions = mockExamData[examKey as keyof typeof mockExamData]?.totalQuestions || 0;
    const correctAnswers = Object.keys(answers).length;
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(calculatedScore);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isSubmitted && score !== null) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Exam Completed!</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl font-bold text-indigo-600 mb-4">{score}%</div>
          <p className="text-gray-600 mb-6">
            You answered {Object.keys(answers).length} out of {mockExamData[examKey as keyof typeof mockExamData]?.totalQuestions} questions
          </p>
          <button
            onClick={() => router.push(`/subjects/${subject}/exams`)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* PDF Viewer */}
      <div className="w-1/2 h-full overflow-auto bg-gray-100 p-4">
        <div className="sticky top-0 bg-white p-4 shadow-sm mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Exam Paper</h2>
            <div className="text-red-600 font-bold">{formatTime(timeLeft)}</div>
          </div>
        </div>
        <Document
          file={mockExamData[examKey as keyof typeof mockExamData]?.pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="bg-white p-4 rounded-lg shadow"
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Answer Sheet */}
      <div className="w-1/2 h-full overflow-auto bg-white p-6">
        <div className="sticky top-0 bg-white p-4 shadow-sm mb-4">
          <h2 className="text-xl font-semibold mb-4">Answer Sheet</h2>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: mockExamData[examKey as keyof typeof mockExamData]?.totalQuestions || 0 }, (_, i) => i + 1).map(
              (questionNumber) => (
                <div
                  key={questionNumber}
                  className="border rounded-lg p-2"
                >
                  <div className="text-sm font-medium mb-1">Q{questionNumber}</div>
                  <div className="grid grid-cols-4 gap-1">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(questionNumber, option)}
                        className={`p-1 text-xs rounded ${
                          answers[questionNumber] === option
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
} 