import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'text-primary-700 dark:text-primary-100 bg-primary-50 dark:bg-gray-800'
      : 'text-gray-700 hover:text-primary-700 dark:text-gray-300 dark:hover:text-white'
  }`;

const Layout = ({ children, containerSize = 'default' }) => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme-dark');
    if (stored !== null) return stored === '1';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Container size variants for different page layouts
  const containerClasses = {
    default: 'max-w-7xl',   // Wider for projects, veille, technologies, admin
    narrow: 'max-w-4xl',    // Narrower for text-heavy content (about)
    medium: 'max-w-5xl',    // Medium for forms and CV
    full: 'max-w-none'      // Full width if needed
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-dark', '1');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme-dark', '0');
    }
  }, [dark]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-100 dark:border-gray-800">
        <div className="container max-w-6xl flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Rayane Portfolio" 
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-gray-800 dark:text-white">Rayane Portfolio</span>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>Accueil</NavLink>
            <NavLink to="/about" className={navLinkClass}>À propos</NavLink>
            <NavLink to="/projects" className={navLinkClass}>Projets</NavLink>
            <NavLink to="/veille" className={navLinkClass}>Veille</NavLink>
            <NavLink to="/technologies" className={navLinkClass}>Technologies</NavLink>
            <NavLink to="/cv" className={navLinkClass}>CV</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Basculer le thème"
              onClick={() => setDark((d) => !d)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M21.64 13A9 9 0 1 1 11 2.36a7 7 0 1 0 10.66 10.64Z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 7h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM3 12H2a1 1 0 1 1 0-2h1a1 1 0 0 1 0 2Zm15.66 7.66a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.46 6.05a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 1 1 6.75 3.93l.71.71a1 1 0 0 1 0 1.41ZM4.34 19.66a1 1 0 0 1 0-1.41l.71-.71A1 1 0 1 1 6.46 19l-.71.71a1 1 0 0 1-1.41 0Zm13.31-13.31a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0Z"/></svg>
              )}
            </button>
            {/* Mobile burger */}
            <button
              type="button"
              className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile navigation panel */}
        {mobileOpen && (
          <div id="mobile-nav" className="md:hidden border-t border-gray-100 dark:border-gray-800">
            <nav className="container max-w-6xl py-2 flex flex-col gap-1">
              <NavLink to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>Accueil</NavLink>
              <NavLink to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>À propos</NavLink>
              <NavLink to="/projects" className={navLinkClass} onClick={() => setMobileOpen(false)}>Projets</NavLink>
              <NavLink to="/veille" className={navLinkClass} onClick={() => setMobileOpen(false)}>Veille</NavLink>
              <NavLink to="/technologies" className={navLinkClass} onClick={() => setMobileOpen(false)}>Technologies</NavLink>
              <NavLink to="/cv" className={navLinkClass} onClick={() => setMobileOpen(false)}>CV</NavLink>
              <NavLink to="/contact" className={navLinkClass} onClick={() => setMobileOpen(false)}>Contact</NavLink>
              <NavLink to="/admin" className={navLinkClass} onClick={() => setMobileOpen(false)}>Admin</NavLink>
            </nav>
          </div>
        )}
      </header>
      <main className={`flex-1 container ${containerClasses[containerSize]} px-4 sm:px-6 lg:px-8 py-8`}>
        {children}
      </main>
      <footer className="border-t border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300">
        <div className={`container ${containerClasses[containerSize]} px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-6 text-sm`}>
          <div>© {new Date().getFullYear()} Portfolio Rayane – Tous droits réservés</div>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a 
              href="https://github.com/warkozz" 
              className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/rayane-hakim-5849bb218/" 
              className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              href="mailto:hakimrayane@hotmail.fr" 
              className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 7L2 7"/>
              </svg>
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
