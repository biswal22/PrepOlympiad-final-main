'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LinkItem, extractYear, generateExamId } from '@/utils/examUtils';

export default function BiologyExams() {
  const [exams, setExams] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subjectName = 'biology'; // Define the subject for this page

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/collected_links.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const links: LinkItem[] = await response.json();
        // Filter for biology questions
        const biologyExams = links.filter(
          link => link.subject === subjectName && link.category === 'questions'
        );
        setExams(biologyExams);
      } catch (e) {
        console.error("Failed to fetch exam links:", e);
        setError(`Failed to load exam list. ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Fetch only once on mount

  if (isLoading) {
    return <div className="max-w-4xl mx-auto p-6 text-center">Loading exams...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600">
        <p>Error loading exams:</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-700">Biology Exams</h1>
      <p className="text-gray-700 mb-8">Select an exam to begin the timed test</p>
      
      <div className="grid gap-6">
        {exams.length === 0 && !isLoading && (
          <p className="text-gray-500">No biology exams found.</p>
        )}
        {exams.map((exam) => {
          const year = extractYear(exam.suggested_filename, exam.link_text);
          const examFileId = generateExamId(exam.suggested_filename);
          const examUrlId = `${examFileId}-${year}`;
          const name = exam.link_text.includes(year) ? exam.link_text : `${exam.link_text} ${year}`;
          // Add placeholders for duration/questions/difficulty
          const duration = 120; // Default for biology
          const questions = 50;  // Default for biology
          const difficulty = 'Intermediate'; // Placeholder

          return (
            <Link
              key={examUrlId}
              href={`/subjects/${subjectName}/exams/${examUrlId}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-1 text-gray-700">{name}</h2>
                  <p className="text-gray-700 mb-3">{questions} questions • {duration} minutes</p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-gray-700 rounded-full text-sm font-medium">
                  {difficulty}
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center text-gray-700 font-medium">
                  Start Exam 
                  <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 