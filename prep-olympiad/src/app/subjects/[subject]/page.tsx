'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const subjectData = {
  mathematics: {
    name: 'Mathematics',
    icon: '🧮',
    description: 'Practice and learn mathematics concepts for olympiad competitions.',
  },
  physics: {
    name: 'Physics',
    icon: '⚛️',
    description: 'Master physics concepts and problem-solving techniques.',
  },
  chemistry: {
    name: 'Chemistry',
    icon: '🧪',
    description: 'Explore chemical concepts and reactions.',
  },
  biology: {
    name: 'Biology',
    icon: '🧬',
    description: 'Study biological systems and processes.',
  },
  'earth-science': {
    name: 'Earth Science',
    icon: '🌍',
    description: 'Learn about Earth\'s systems and processes.',
  },
};

export default function SubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const data = subjectData[subject as keyof typeof subjectData];

  if (!data) {
    return <div>Subject not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <span className="text-4xl mr-4">{data.icon}</span>
        <h1 className="text-3xl font-bold">{data.name}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{data.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href={`/subjects/${subject}/practice`}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-xl font-semibold mb-2">Practice Questions</h2>
          <p className="text-gray-600">Practice with individual questions and get immediate feedback.</p>
        </Link>
        
        <Link
          href={`/subjects/${subject}/exams`}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-xl font-semibold mb-2">Timed Exams</h2>
          <p className="text-gray-600">Take full-length timed exams to test your knowledge under exam conditions.</p>
        </Link>
      </div>
    </div>
  );
} 