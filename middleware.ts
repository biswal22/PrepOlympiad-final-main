import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Check auth state
  const { data: { session } } = await supabase.auth.getSession();
  
  // Get the pathname of the request
  const path = req.nextUrl.pathname;
  
  // Protected routes - add your exam routes here
  const protectedRoutes = [
    '/subjects/mathematics/exams',
    '/subjects/physics/exams',
    '/subjects/chemistry/exams',
    '/subjects/biology/exams',
    '/subjects/earth-science/exams',
  ];
  
  // Check if the current path starts with any of the protected routes
  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // If the route is protected and the user is not logged in, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('returnUrl', path);
    return NextResponse.redirect(redirectUrl);
  }
  
  return res;
} 