// Import the test output directly
import sampleQuestions from '../../scripts/chemistry/test_output.json';

export const getQuestions = () => {
  return sampleQuestions.all_questions.map(q => ({
    id: q.number.toString(),
    title: q.text.substring(0, 100),
    content: q.text,
    choices: q.choices.map(c => ({
      text: c.text,
      image: c.image,
      isCorrect: c.is_correct
    })),
    difficulty: q.difficulty,
    subject: "chemistry"
  }));
}; 