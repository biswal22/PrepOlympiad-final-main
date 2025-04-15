import PracticeProblem from '@/components/PracticeProblem'
import AuthCheck from '@/components/AuthCheck';

export default function TestPage() {
  return (
    <AuthCheck>
      <PracticeProblem subject="mathematics" />
    </AuthCheck>
  );
} 