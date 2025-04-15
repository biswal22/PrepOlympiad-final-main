'use client';
import { useState } from 'react';
import AuthCheck from '@/components/AuthCheck';

export default function MathExamPage() {
  return (
    <AuthCheck>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Mathematics Timed Exam</h1>
        <p className="text-gray-600 mb-8">
          This is a timed exam to test your mathematics skills under exam conditions.
        </p>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-4">Exam Instructions</h2>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>You have 60 minutes to complete this exam</li>
            <li>There are 10 problems of varying difficulty</li>
            <li>You can only submit once</li>
            <li>Your results will be available immediately after submission</li>
          </ul>
          
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Start Exam
          </button>
        </div>
      </div>
    </AuthCheck>
  );
} 