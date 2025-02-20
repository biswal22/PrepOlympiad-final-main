'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

interface UserStatsProps {
  subject: string;
}

export default function UserStats({ subject }: UserStatsProps) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="w-64 bg-white rounded-lg shadow-sm p-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-64 bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-gray-800 text-lg font-semibold mb-4">Track Your Progress</h3>
        <p className="text-gray-600 mb-4">Log in to see your statistics and track your progress.</p>
        <a
          href="/api/auth/login"
          className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
        >
          Log In
        </a>
      </div>
    );
  }

  // Example statistics - replace with real data from your database
  const stats = {
    totalProblems: 150,
    problemsSolved: 45,
    accuracy: "76%",
    averageTime: "12m",
    recentScores: [85, 92, 78, 88],
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
      <div className="mb-4">
        <h3 className="text-gray-800 text-lg font-semibold mb-2">Your {subject} Stats</h3>
        <p className="text-sm text-gray-600">Welcome, {user.name}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600">Problems Attempted</h4>
          <p className="text-2xl font-semibold text-gray-600">{stats.problemsSolved}/{stats.totalProblems}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600">Accuracy</h4>
          <p className="text-2xl font-semibold text-gray-600">{stats.accuracy}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600">Average Time per Problem</h4>
          <p className="text-2xl font-semibold text-gray-600">{stats.averageTime}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-6">Recent Scores</h4>
          <div className="flex gap-1 mt-1 h-24 items-end">
            {stats.recentScores.map((score, index) => (
              <div
                key={index}
                className="relative w-8 bg-indigo-100 rounded-t"
                style={{ height: `${score}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 