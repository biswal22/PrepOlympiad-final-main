export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PrepOlympiad</h3>
            <p className="text-gray-300">
              Helping students excel in science olympiads through comprehensive practice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Twitter
              </a>
              <a href="https://linkedin.com/in/aniketbiswal" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/biswal22" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} PrepOlympiad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
