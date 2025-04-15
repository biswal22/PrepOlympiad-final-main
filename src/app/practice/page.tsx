import PracticeProblem from '@/components/PracticeProblem';
import AuthCheck from '@/components/AuthCheck';

export default function PracticePage() {
  return (
    <main className="min-h-screen p-4">
      <AuthCheck>
        <PracticeProblem subject="general" />
      </AuthCheck>
    </main>
  );
} 