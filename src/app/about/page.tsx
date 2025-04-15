export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">About PrepOlympiad</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8">
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          PrepOlympiad was born from personal experience. As a former olympiad participant,
          I found that one of the biggest challenges wasn't just understanding the material—it
          was finding a structured way to practice and track progress effectively.
        </p>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Preparing for olympiads often meant scattered resources, inconsistent practice
          schedules, and difficulty gauging improvement. I created PrepOlympiad to solve
          these challenges, providing a centralized platform where students can:
        </p>
        
        <ul className="list-disc list-inside text-gray-600 text-lg leading-relaxed mb-6 ml-4">
          <li>Access quality practice problems</li>
          <li>Track their progress systematically</li>
          <li>Prepare with structured, exam-like conditions</li>
          <li>Find curated resources for each subject</li>
        </ul>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          Our mission is to make olympiad preparation more accessible, structured, and
          effective for students around the world.
        </p>
      </div>
    </div>
  );
} 