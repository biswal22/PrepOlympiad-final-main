import PracticeProblem from '@/components/PracticeProblem';
import AuthCheck from '@/components/AuthCheck';

export default function EarthSciencePractice() {
  return (
    <AuthCheck>
      <PracticeProblem subject="Earth Science" />
    </AuthCheck>
  );
} 