export interface ExamData {
  name: string;
  year: string;
  pdfUrl: string;
  totalQuestions: number;
  timeLimit: number; // in minutes
  answerFormat: 'mcq' | 'numeric';
  options?: string[]; // For MCQ
  answers?: any[]; // Correct answers (can be string for MCQ, number for numeric)
}

export interface LinkItem {
  subject: string;
  category: string;
  url: string;
  link_text: string;
  suggested_filename: string;
}

// Function to extract year from filename or text
export const extractYear = (filename: string, text: string): string => {
  const yearMatch = filename.match(/^(\d{4})_/) || text.match(/(\d{4})/);
  return yearMatch ? yearMatch[1] : 'Unknown';
};

// Function to generate a simple exam ID from filename/text
export const generateExamId = (filename: string): string => {
  let baseName = filename.replace(/^\d{4}_/, '').replace(/\.pdf$/i, '');
  baseName = baseName.toLowerCase().replace(/[^a-z0-9\-]+/g, '-').replace(/^-+|-+$/g, '');
  return baseName.substring(0, 30) || 'exam'; // Fallback id
};

// Helper function to process the fetched links into the full allExamData structure
export const processExamLinks = (links: LinkItem[]): { [key: string]: ExamData } => {
  const processedData: { [key: string]: ExamData } = {
      // --- Math exams (kept for now) ---
    'mathematics-amc10': {
      name: 'AMC 10',
      year: '2018',
      pdfUrl: '/exams/mathematics/AMC10/amc10a_b_2018.pdf',
      totalQuestions: 25,
      timeLimit: 75,
      answerFormat: 'mcq',
      options: ['A', 'B', 'C', 'D', 'E'],
      answers: ['A', 'B', 'D', 'E', 'C', 'B', 'A', 'D', 'E', 'C', 'A', 'D', 'B', 'C', 'E', 'A', 'B', 'D', 'C', 'E', 'A', 'D', 'B', 'C', 'E']
    },
    'mathematics-amc12': {
      name: 'AMC 12',
      year: '2018',
      pdfUrl: '/exams/mathematics/AMC10/amc10a_b_2018.pdf', // Placeholder
      totalQuestions: 25,
      timeLimit: 75,
      answerFormat: 'mcq',
      options: ['A', 'B', 'C', 'D', 'E'],
      answers: ['B', 'C', 'A', 'D', 'E', 'B', 'C', 'A', 'D', 'E', 'B', 'C', 'A', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E']
    },
    'mathematics-aime': {
      name: 'AIME',
      year: '2019',
      pdfUrl: '/exams/mathematics/AMC10/amc10a_b_2018.pdf', // Placeholder
      totalQuestions: 15,
      timeLimit: 180,
      answerFormat: 'numeric',
      answers: [42, 78, 120, 36, 840, 60, 144, 72, 126, 54, 45, 360, 48, 210, 90]
    },
  };

  links
    .filter(link => link.category === 'questions' && link.subject !== 'mathematics')
    .forEach(link => {
      const year = extractYear(link.suggested_filename, link.link_text);
      const examFileId = generateExamId(link.suggested_filename);
      const generatedExamId = `${examFileId}-${year}`; // This is the ID part for the URL
      const name = link.link_text.includes(year) ? link.link_text : `${link.link_text} ${year}`; 
      
      let defaultQuestions = 50;
      let defaultTimeLimit = 90; 
      let defaultOptions = ['A', 'B', 'C', 'D'];
      if (link.subject === 'chemistry') { defaultQuestions = 60; defaultTimeLimit = 110; }
      if (link.subject === 'physics') { defaultQuestions = 25; defaultTimeLimit = 75; defaultOptions = ['A', 'B', 'C', 'D', 'E']; }
      if (link.subject === 'biology') { defaultTimeLimit = 120; }

      const key = `${link.subject.replace(/\s+/g, '-')}-${generatedExamId}`;
      processedData[key] = {
        name: name,
        year: year,
        pdfUrl: link.url,
        totalQuestions: defaultQuestions,
        timeLimit: defaultTimeLimit,
        answerFormat: 'mcq',
        options: defaultOptions,
        answers: Array(defaultQuestions).fill('A')
      };
    });
  return processedData;
}; 