'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import UserStats from '@/components/UserStats';

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
  const subjectKey = subject.toLowerCase().replace(/\s+/g, '-');
  const data = subjectData[subjectKey as keyof typeof subjectData];

  if (!data) {
    return <div>Subject not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="flex items-center mb-6">
          <span className="text-4xl mr-4">{data.icon}</span>
          <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">{data.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/subjects/${subjectKey}/practice`}
            className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-indigo-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-700 group-hover:text-indigo-800 transition-colors">Practice Questions</h2>
            <p className="text-gray-600">Practice with individual questions and get immediate feedback.</p>
          </Link>

          <Link
            href={`/subjects/${subjectKey}/exams`}
            className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-indigo-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-700 group-hover:text-indigo-800 transition-colors">Timed Exams</h2>
            <p className="text-gray-600">Take full-length timed exams under realistic conditions.</p>
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-64 lg:sticky lg:top-24 self-start">
        <UserStats subject={subjectKey} />
      </div>
    </div>
  );
} 