import PracticeProblem from '@/components/PracticeProblem';
import AuthCheck from '@/components/AuthCheck';

export default function MathPractice() {
  return (
    <AuthCheck>
      <PracticeProblem subject="Mathematics" />
    </AuthCheck>
  );
} 