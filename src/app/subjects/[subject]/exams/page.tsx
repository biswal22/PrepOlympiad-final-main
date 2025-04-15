'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Mock data - replace with actual data from your backend
const mockExams = {
  mathematics: [
    { id: '1', name: '2023 Mathematics Olympiad', duration: 120, questions: 30 },
    { id: '2', name: '2022 Mathematics Olympiad', duration: 120, questions: 30 },
    { id: '3', name: '2021 Mathematics Olympiad', duration: 120, questions: 30 },
  ],
  physics: [
    { id: '1', name: '2023 Physics Olympiad', duration: 120, questions: 30 },
    { id: '2', name: '2022 Physics Olympiad', duration: 120, questions: 30 },
  ],
  chemistry: [
    { id: '1', name: '2023 Chemistry Olympiad', duration: 120, questions: 30 },
    { id: '2', name: '2022 Chemistry Olympiad', duration: 120, questions: 30 },
  ],
  biology: [
    { id: '1', name: '2023 Biology Olympiad', duration: 120, questions: 30 },
    { id: '2', name: '2022 Biology Olympiad', duration: 120, questions: 30 },
  ],
  'earth-science': [
    { id: '1', name: '2023 Earth Science Olympiad', duration: 120, questions: 30 },
    { id: '2', name: '2022 Earth Science Olympiad', duration: 120, questions: 30 },
  ],
};

export default function ExamSelection() {
  const params = useParams();
  const subject = params.subject as string;
  const exams = mockExams[subject as keyof typeof mockExams] || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Select an Exam</h1>
      <div className="grid gap-6">
        {exams.map((exam) => (
          <Link
            key={exam.id}
            href={`/subjects/${subject}/exams/${exam.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">{exam.name}</h2>
            <div className="flex gap-4 text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{exam.duration} minutes</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{exam.questions} questions</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 