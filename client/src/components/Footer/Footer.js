import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ containerSize = 'default' }) => {
  const containerClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    medium: 'max-w-5xl',
    full: 'max-w-none'
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur">
      <div className={`container ${containerClasses[containerSize]} px-4 sm:px-6 lg:px-8 py-5 text-sm`}>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">

          {/* Col gauche : copyright + mentions légales */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>© {new Date().getFullYear()} <span className="font-semibold text-gray-800 dark:text-gray-200">Portfolio Rayane</span></span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <Link
              to="/copyright"
              className="hover:text-primary-600 dark:hover:text-primary-400 underline underline-offset-2 decoration-dotted transition-colors duration-200 text-xs"
            >
              Mentions légales
            </Link>
            <a
              href="http://localhost/portfolio-fdme/server/check_admin.php"
              className="text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-500 transition-colors duration-200 text-[10px] opacity-30 hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
              title="."
            >
              •
            </a>
          </div>

          {/* Col centre : badges */}
          <div className="flex items-center gap-2">
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors duration-200"
              aria-label="Licence MIT"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M14.83 14.83A4 4 0 1 1 9.17 9.17"/>
              </svg>
              MIT
            </a>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              Open to work
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              React · Tailwind
            </span>
          </div>

          {/* Col droite : liens sociaux */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/warkozz"
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-200 group-hover:scale-110">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rayane-hakim-5849bb218/"
              className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-200 group-hover:scale-110">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="mailto:hakimrayane@hotmail.fr"
              className="group flex items-center gap-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-all duration-200"
              aria-label="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover:scale-110">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 7L2 7"/>
              </svg>
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
