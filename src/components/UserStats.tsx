'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

interface UserStatsProps {
  subject: string;
}

interface UserProgressData {
  timed_exam_percentage: number | null;
  practice_percentage: number | null;
}

export default function UserStats({ subject }: UserStatsProps) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgressData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingUser(true);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoadingUser(false);
    };
    
    fetchUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoadingUser(false);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    if (user) {
      const fetchProgress = async () => {
        setIsLoadingProgress(true);
        setError(null);
        const subjectKey = subject.toLowerCase().replace(/\s+/g, '-');
        try {
          const { data, error: fetchError } = await supabase
            .from('user_progress')
            .select('timed_exam_percentage, practice_percentage')
            .eq('user_id', user.id)
            .eq('subject', subjectKey)
            .maybeSingle();

          if (fetchError) {
            throw fetchError;
          }
          setProgress(data as UserProgressData | null);
        } catch (e) {
          console.error('Error fetching user progress:', e);
          setError('Could not load your progress.');
        } finally {
          setIsLoadingProgress(false);
        }
      };
      fetchProgress();
    } else {
      setProgress(null);
    }
  }, [user, subject, supabase]);

  const getSubjectColor = () => {
    const lowerSubject = subject.toLowerCase().replace(/\s+/g, '-');
    switch(lowerSubject) {
      case 'mathematics': return 'from-blue-500 to-indigo-600';
      case 'physics': return 'from-purple-500 to-indigo-600';
      case 'chemistry': return 'from-green-500 to-teal-600';
      case 'biology': return 'from-pink-500 to-rose-600';
      case 'earth-science': return 'from-amber-500 to-orange-600';
      default: return 'from-indigo-500 to-blue-600';
    }
  };

  if (isLoadingUser) {
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
            Sign in to track your progress and save your scores.
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

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const subjectDisplayName = subject.charAt(0).toUpperCase() + subject.slice(1);

  return (
    <div className="w-full lg:w-64 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md overflow-hidden">
      <div className={`h-3 bg-gradient-to-r ${getSubjectColor()}`}></div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-1">{subjectDisplayName} Stats</h3>
          <p className="text-sm text-gray-500">Hi, {userName}!</p>
        </div>
        
        {isLoadingProgress && (
          <div className="text-center text-gray-500">Loading progress...</div>
        )}
        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}
        {!isLoadingProgress && !error && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Timed Exam Score</h4>
              <p className="text-2xl font-semibold text-gray-800">
                {progress?.timed_exam_percentage !== null && progress?.timed_exam_percentage !== undefined
                  ? `${progress.timed_exam_percentage}%`
                  : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Latest Score</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Practice Accuracy</h4>
              <p className="text-2xl font-semibold text-gray-800">
                {progress?.practice_percentage !== null && progress?.practice_percentage !== undefined
                  ? `${progress.practice_percentage}%`
                  : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Overall Accuracy</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 