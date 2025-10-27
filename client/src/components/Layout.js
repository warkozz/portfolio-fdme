import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'text-primary-700 dark:text-primary-100 bg-primary-50 dark:bg-gray-800'
      : 'text-gray-700 hover:text-primary-700 dark:text-gray-300 dark:hover:text-white'
  }`;

const Layout = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('theme-dark') === '1';
    setDark(stored);
    if (stored) document.documentElement.classList.add('dark');
  }, []);

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
          <div className="text-sm font-semibold text-gray-800 dark:text-white">Rayane Portfolio</div>
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
      <main className="flex-1 container max-w-6xl py-8">
        {children}
      </main>
      <footer className="border-t border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between py-6 text-sm">
          <div>© {new Date().getFullYear()} Portfolio Rayane – Tous droits réservés</div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary-700">GitHub</a>
            <a href="https://www.linkedin.com/in/rayane-hakim-5849bb218/" className="hover:text-primary-700">Linkedin</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
