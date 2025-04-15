'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
      
      if (!data.user) {
        // Redirect to login if no user is found
        router.push('/login?returnUrl=' + encodeURIComponent(window.location.pathname));
      }
    };
    
    fetchUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
        
        if (!session?.user) {
          router.push('/login?returnUrl=' + encodeURIComponent(window.location.pathname));
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-center mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
} 