'use client';
import React from 'react';
import Link from 'next/link';

// Mock data - replace with actual data from your backend
const mathematicsExams = [
  { id: 'amc10', name: 'AMC 10', year: '2018', duration: 75, questions: 25, difficulty: 'Intermediate' },
  { id: 'amc12', name: 'AMC 12', year: '2018', duration: 75, questions: 25, difficulty: 'Advanced' },
  { id: 'aime', name: 'AIME', year: '2019', duration: 180, questions: 15, difficulty: 'Expert' },
];

export default function MathematicsExams() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-700">Mathematics Exams</h1>
      <p className="text-gray-700 mb-8">Select an exam to begin the timed test</p>
      
      <div className="grid gap-6">
        {mathematicsExams.map((exam) => (
          <Link
            key={exam.id}
            href={`/subjects/mathematics/exams/${exam.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-gray-700">{exam.name} ({exam.year})</h2>
                <p className="text-gray-700 mb-3">{exam.questions} questions • {exam.duration} minutes</p>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-gray-700 rounded-full text-sm font-medium">
                {exam.difficulty}
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
        ))}
      </div>
    </div>
  );
} 