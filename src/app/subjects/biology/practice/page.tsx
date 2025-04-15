import PracticeProblem from '@/components/PracticeProblem';
import AuthCheck from '@/components/AuthCheck';

export default function BiologyPractice() {
  return (
    <AuthCheck>
      <PracticeProblem subject="Biology" />
    </AuthCheck>
  );
} 