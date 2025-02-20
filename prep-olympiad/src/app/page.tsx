export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">Welcome to PrepOlympiad</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Practice Questions</h2>
          <p className="text-gray-600">
            Start practicing with our collection of olympiad questions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Track Progress</h2>
          <p className="text-gray-600">
            Monitor your performance and improvement over time.
          </p>
        </div>
      </div>
    </div>
  );
}