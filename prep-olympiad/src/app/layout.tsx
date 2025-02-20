import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: "PrepOlympiad",
  description: "Practice platform for olympiad exams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen flex flex-col">
        <UserProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}