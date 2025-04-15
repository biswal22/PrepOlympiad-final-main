'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

interface UserStatsProps {
  subject: string;
}

export default function UserStats({ subject }: UserStatsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoading(false);
    };
    
    fetchUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const getSubjectColor = () => {
    switch(subject.toLowerCase()) {
      case 'mathematics':
        return 'from-blue-500 to-indigo-600';
      case 'physics':
        return 'from-purple-500 to-indigo-600';
      case 'chemistry':
        return 'from-green-500 to-teal-600';
      case 'biology':
        return 'from-pink-500 to-rose-600';
      case 'earth science':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-indigo-500 to-blue-600';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full lg:w-64 bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full lg:w-64 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md overflow-hidden">
        <div className={`h-3 bg-gradient-to-r ${getSubjectColor()}`}></div>
        <div className="p-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-3">Track Your Progress</h3>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Sign in to track your progress, save your scores, and unlock personalized recommendations.
          </p>
          <div className="flex flex-col space-y-2">
            <Link
              href={`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`}
              className="w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Log In
            </Link>
            <Link
              href={`/signup?returnUrl=${encodeURIComponent(window.location.pathname)}`}
              className="w-full text-center border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
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

  // Get user's name from metadata
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="w-full lg:w-64 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md overflow-hidden">
      <div className={`h-3 bg-gradient-to-r ${getSubjectColor()}`}></div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-1">{subject} Stats</h3>
          <p className="text-sm text-gray-500">Hi, {userName}!</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-medium text-gray-500">Problems Attempted</h4>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                {Math.round((stats.problemsSolved / stats.totalProblems) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full" 
                style={{width: `${(stats.problemsSolved / stats.totalProblems) * 100}%`}}
              ></div>
            </div>
            <p className="text-xl font-semibold text-gray-800 mt-1">
              {stats.problemsSolved}/{stats.totalProblems}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Accuracy</h4>
              <p className="text-xl font-semibold text-gray-800">{stats.accuracy}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Avg Time</h4>
              <p className="text-xl font-semibold text-gray-800">{stats.averageTime}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Scores</h4>
            <div className="flex gap-1 h-16 items-end">
              {stats.recentScores.map((score, index) => {
                // Determine color based on score
                const getScoreColor = () => {
                  if (score >= 90) return 'bg-green-400';
                  if (score >= 75) return 'bg-blue-400';
                  if (score >= 60) return 'bg-yellow-400';
                  return 'bg-pink-400';
                };
                
                return (
                  <div
                    key={index}
                    className="flex-1 rounded-t transition-all duration-300 hover:translate-y-[-4px]"
                    style={{ height: `${score}%`, backgroundColor: getScoreColor() }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100">
                      {score}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 