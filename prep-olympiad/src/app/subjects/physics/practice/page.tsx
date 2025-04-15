import PracticeProblem from '@/components/PracticeProblem';
import AuthCheck from '@/components/AuthCheck';

export default function PhysicsPractice() {
  return (
    <AuthCheck>
      <PracticeProblem subject="Physics" />
    </AuthCheck>
  );
} 