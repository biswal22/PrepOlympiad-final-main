'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Sign up with email and password
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`
        }
      }
    });
    
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    
    router.push(returnUrl);
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-gray-700 text-2xl font-bold mb-6">Create an Account</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {returnUrl !== '/' && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded mb-4">
          Please create an account to access this page
        </div>
      )}
      
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-gray-600 w-full p-2 border rounded" 
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <input 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-gray-600 w-full p-2 border rounded" 
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="text-gray-600 w-full p-2 border rounded" 
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-gray-600 w-full p-2 border rounded" 
            required
            minLength={6}
          />
          <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      
      <p className="text-gray-600 mt-6 text-center">
        Already have an account? <Link href={`/login?returnUrl=${encodeURIComponent(returnUrl)}`} className="text-indigo-600">Login</Link>
      </p>
    </div>
  );
} 