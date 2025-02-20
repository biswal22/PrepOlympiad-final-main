'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const { user, isLoading } = useUser();

  const subjects = [
    { name: 'Math', href: '/subjects/mathematics' },
    { name: 'Chemistry', href: '/subjects/chemistry' },
    { name: 'Physics', href: '/subjects/physics' },
    { name: 'Biology', href: '/subjects/biology' },
    { name: 'Earth Science', href: '/subjects/earth-science' },
  ];

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              PrepOlympiad
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link href="/" className="hover:bg-indigo-700 px-3 py-2 rounded-md">
                  Home
                </Link>
                <Link href="/about" className="hover:bg-indigo-700 px-3 py-2 rounded-md">
                  About Us
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
                    className="hover:bg-indigo-700 px-3 py-2 rounded-md inline-flex items-center"
                  >
                    <span>Subjects</span>
                    <svg
                      className="ml-2 h-5 w-5"
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
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        {subjects.map((subject) => (
                          <Link
                            key={subject.name}
                            href={subject.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setIsSubjectsOpen(false)}
                          >
                            {subject.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            {isLoading ? (
              <div className="h-8 w-20 bg-indigo-500 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">{user.name}</span>
                <a
                  href="/api/auth/logout"
                  className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm"
                >
                  Logout
                </a>
              </div>
            ) : (
              <a
                href="/api/auth/login"
                className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}