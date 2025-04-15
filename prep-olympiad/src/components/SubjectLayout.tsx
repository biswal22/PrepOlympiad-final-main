import Link from 'next/link';
import UserStats from './UserStats';
import Image from 'next/image';

interface SubjectLayoutProps {
  subject: string;
  description: string;
}

export default function SubjectLayout({ subject, description }: SubjectLayoutProps) {
  // Custom styling based on subject
  const getSubjectStyles = () => {
    switch(subject.toLowerCase()) {
      case 'mathematics':
        return {
          gradient: 'from-blue-500 to-indigo-600',
          color: 'text-blue-600',
          bgLight: 'bg-blue-50',
          emoji: '🧮',
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
      case 'physics':
        return {
          gradient: 'from-purple-500 to-indigo-600',
          color: 'text-purple-600', 
          bgLight: 'bg-purple-50',
          emoji: '⚛️',
          imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
      case 'chemistry':
        return {
          gradient: 'from-green-500 to-teal-600',
          color: 'text-green-600',
          bgLight: 'bg-green-50',
          emoji: '🧪',
          imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
      case 'biology':
        return {
          gradient: 'from-pink-500 to-rose-600',
          color: 'text-pink-600',
          bgLight: 'bg-pink-50',
          emoji: '🧬',
          imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
      case 'earth science':
        return {
          gradient: 'from-amber-500 to-orange-600',
          color: 'text-amber-600',
          bgLight: 'bg-amber-50',
          emoji: '🌍',
          imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
      default:
        return {
          gradient: 'from-indigo-500 to-blue-600',
          color: 'text-indigo-600',
          bgLight: 'bg-indigo-50',
          emoji: '📚',
          imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        };
    }
  };

  const style = getSubjectStyles();

  const features = [
    {
      title: "Practice Random Problems",
      description: "Get randomly selected problems to practice specific topics",
      href: `/subjects/${subject.toLowerCase().replace(' ', '-')}/practice`,
      icon: "📝",
      color: style.color.replace('text', 'border')
    },
    {
      title: "Take a Timed Exam",
      description: "Simulate real exam conditions with timed tests",
      href: `/subjects/${subject.toLowerCase().replace(' ', '-')}/exam`,
      icon: "⏱️",
      color: style.color.replace('text', 'border')
    },
    {
      title: "Download Exam Papers",
      description: "Download practice exams for offline study",
      href: `/subjects/${subject.toLowerCase().replace(' ', '-')}/download`,
      icon: "⬇️",
      color: style.color.replace('text', 'border')
    },
    {
      title: "Study Resources",
      description: "Access curated study materials and guides",
      href: `/subjects/${subject.toLowerCase().replace(' ', '-')}/resources`,
      icon: "📚",
      color: style.color.replace('text', 'border')
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section with diagonal gradient */}
      <section className={`relative overflow-hidden mb-16`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${style.gradient} transform -skew-y-6 origin-top-right`}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{style.emoji}</span>
                <h1 className="text-4xl font-bold text-white">{subject}</h1>
              </div>
              
              <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
                {description}
              </p>
              
              <Link 
                href={`/subjects/${subject.toLowerCase().replace(' ', '-')}/practice`}
                className="px-8 py-3 bg-white text-gray-800 font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-flex items-center"
              >
                <span>Start Practicing</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="w-full md:w-2/5 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-white opacity-20"></div>
                <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-white opacity-20"></div>
                <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl">
                  <Image 
                    src={style.imageUrl}
                    alt={`${subject} illustration`}
                    width={500}
                    height={350}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content area */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stats sidebar */}
          <div className="lg:w-1/3">
            <UserStats subject={subject} />
            
            {/* Quick tips */}
            <div className={`mt-8 rounded-xl ${style.bgLight} p-6 shadow-md`}>
              <h3 className={`text-xl font-semibold mb-4 ${style.color}`}>Quick Tips</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="mr-3">💡</span>
                  <p className="text-gray-700">Practice regularly, even just 20 minutes a day can make a big difference.</p>
                </li>
                <li className="flex">
                  <span className="mr-3">💡</span>
                  <p className="text-gray-700">Focus on understanding concepts, not just memorizing formulas.</p>
                </li>
                <li className="flex">
                  <span className="mr-3">💡</span>
                  <p className="text-gray-700">Review your mistakes thoroughly - they're your best learning opportunities.</p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Feature cards */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">What Would You Like to Do?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Link 
                  href={feature.href} 
                  key={feature.title}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-transparent hover:border-l-4 hover:border-opacity-100 hover:border-solid"
                  style={{borderLeftColor: `var(--${feature.color.split('-')[1]}-500)`}}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-14 h-14 ${style.bgLight} rounded-lg flex items-center justify-center`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-xl font-semibold mb-2 ${style.color}`}>{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 