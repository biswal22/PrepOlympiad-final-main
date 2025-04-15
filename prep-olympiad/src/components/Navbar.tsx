'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

export default function Navbar() {
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSubjectsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsSubjectsOpen(false);
  }, [pathname]);

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const subjects = [
    { name: 'Mathematics', icon: '🧮', href: '/subjects/mathematics' },
    { name: 'Chemistry', icon: '🧪', href: '/subjects/chemistry' },
    { name: 'Physics', icon: '⚛️', href: '/subjects/physics' },
    { name: 'Biology', icon: '🧬', href: '/subjects/biology' },
    { name: 'Earth Science', icon: '🌍', href: '/subjects/earth-science' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              <span className="font-bold text-xl tracking-tight">PrepOlympiad</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-1">
                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
                  Home
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-200 inline-flex items-center"
                  >
                    <span>Subjects</span>
                    <svg
                      className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isSubjectsOpen ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  
                  {isSubjectsOpen && (
                    <div className="absolute z-50 mt-2 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="py-2 divide-y divide-gray-100" role="menu">
                        {subjects.map((subject) => (
                          <Link
                            key={subject.name}
                            href={subject.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                            role="menuitem"
                          >
                            <span className="text-xl mr-3">{subject.icon}</span>
                            <span>{subject.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
                  About Us
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Authentication area */}
          <div className="hidden md:block">
            {isLoading ? (
              <div className="h-8 w-24 bg-white bg-opacity-20 rounded-full animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-10 rounded-full px-3 py-1.5 text-sm">
                  <span className="opacity-80">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-1.5 rounded-full text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-full text-sm hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-700 bg-opacity-50 backdrop-blur">
          <Link href="/" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <button
            onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-200 flex justify-between items-center"
          >
            <span>Subjects</span>
            <svg
              className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isSubjectsOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          
          {isSubjectsOpen && (
            <div className="pl-4 space-y-1">
              {subjects.map((subject) => (
                <Link
                  key={subject.name}
                  href={subject.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                  onClick={() => {
                    setIsSubjectsOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="text-xl mr-3">{subject.icon}</span>
                  <span>{subject.name}</span>
                </Link>
              ))}
            </div>
          )}
          
          <Link href="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          
          {/* Mobile auth buttons */}
          <div className="pt-4 pb-3 border-t border-indigo-800">
            {isLoading ? (
              <div className="mx-3 h-8 bg-white bg-opacity-20 rounded-full animate-pulse" />
            ) : user ? (
              <div className="flex flex-col space-y-2">
                <div className="px-3 text-sm font-medium text-indigo-100">
                  {user.user_metadata?.full_name || user.email || 'User'}
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="mx-3 px-4 py-2 rounded-full text-sm text-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="mx-3 px-4 py-2 rounded-full text-sm text-center hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="mx-3 px-4 py-2 rounded-full text-sm font-medium text-center bg-white text-indigo-700 hover:bg-opacity-90 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}