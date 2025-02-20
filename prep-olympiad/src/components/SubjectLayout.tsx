import Link from 'next/link';
import UserStats from './UserStats';

interface SubjectLayoutProps {
  subject: string;
  description: string;
}

export default function SubjectLayout({ subject, description }: SubjectLayoutProps) {
  const features = [
    {
      title: "Practice Random Problems",
      description: "Get randomly selected problems to practice specific topics",
      href: `/subjects/${subject.toLowerCase().replace(' ', '-')}/practice`,
      icon: "📝"
    },
    {
      title: "Take a Timed Exam",
      description: "Simulate real exam conditions with timed tests",
      href: `exam`,
      icon: "⏱️"
    },
    {
      title: "Download Exam",
      description: "Download practice exams for offline study",
      href: `download`,
      icon: "⬇️"
    },
    {
      title: "Resources",
      description: "Access curated study materials and guides",
      href: `resources`,
      icon: "📚"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{subject}</h1>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>

      <div className="flex gap-8">
        <UserStats subject={subject} />
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link 
              href={feature.href} 
              key={feature.title}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 