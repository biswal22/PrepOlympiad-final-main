import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Sample student testimonials
  const testimonials = [
    {
      quote: "PrepOlympiad helped me score in the top 5% at my regional Science Olympiad!",
      student: "Alex K., 11th Grade",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "The practice problems are challenging and fun. I've improved so much in just a few months.",
      student: "Mira P., 10th Grade",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  // Subject cards for quick navigation
  const subjects = [
    { name: "Mathematics", icon: "🧮", color: "from-blue-400 to-blue-600" },
    { name: "Physics", icon: "⚛️", color: "from-purple-400 to-purple-600" },
    { name: "Chemistry", icon: "🧪", color: "from-green-400 to-green-600" },
    { name: "Biology", icon: "🧬", color: "from-pink-400 to-pink-600" },
    { name: "Earth Science", icon: "🌍", color: "from-amber-400 to-amber-600" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600 to-purple-700 transform -skew-y-6 origin-top-left z-0"></div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-5xl font-extrabold mb-6 text-white leading-tight">
                Ace Your <span className="text-yellow-300">Olympiads</span> with Confidence
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Master complex concepts, solve challenging problems, and compete at your best with our specialized practice platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/signup" 
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="w-full md:w-2/5 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-300 rounded-full opacity-40"></div>
                <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Students studying for olympiad" 
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Students Love PrepOlympiad</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-indigo-500">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Focused Practice</h3>
              <p className="text-gray-600">
                Practice with problems specifically designed for olympiad competitions, categorized by difficulty and topic.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Track Progress</h3>
              <p className="text-gray-600">
                See your improvement over time with detailed analytics and performance tracking for each subject.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Exam Simulation</h3>
              <p className="text-gray-600">
                Prepare for the real competition with timed exams that simulate the pressure and format of actual olympiads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Explore Subjects</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Dive into our comprehensive collection of olympiad preparation materials across all major subjects.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subjects.map((subject) => (
              <Link 
                key={subject.name}
                href={`/subjects/${subject.name.toLowerCase().replace(' ', '-')}`}
                className={`bg-gradient-to-r ${subject.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-3">{subject.icon}</span>
                  <h3 className="text-xl font-bold">{subject.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg relative">
                <div className="absolute top-0 -right-3 w-16 h-16 bg-indigo-500 rounded-full transform -translate-y-1/3 flex items-center justify-center">
                  <span className="text-white text-2xl">❝</span>
                </div>
                <p className="text-gray-700 italic mb-8 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.student} 
                    width={50} 
                    height={50}
                    className="rounded-full"
                  />
                  <span className="ml-4 font-medium text-gray-800">{testimonial.student}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your Next Olympiad?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are improving their skills and confidence with PrepOlympiad.
          </p>
          <Link 
            href="/signup" 
            className="px-8 py-4 bg-white text-indigo-700 font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  );
}