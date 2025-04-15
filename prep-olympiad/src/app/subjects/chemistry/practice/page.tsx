import PracticeProblem from '@/components/PracticeProblem';
import AuthCheck from '@/components/AuthCheck';

export default function ChemistryPractice() {
  return (
    <AuthCheck>
      <PracticeProblem subject="Chemistry" />
    </AuthCheck>
  );
} 