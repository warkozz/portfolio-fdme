import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'text-primary-700 dark:text-primary-100 bg-primary-50 dark:bg-gray-800'
      : 'text-gray-700 hover:text-primary-700 dark:text-gray-300 dark:hover:text-white'
  }`;

const Layout = ({ children }) => {
  const [dark, setDark] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-100 dark:border-gray-800">
        <div className="container max-w-6xl flex items-center justify-between py-3">
          <div className="text-sm font-semibold text-gray-800 dark:text-white">Rayane Portfolio</div>
          <nav className="flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>Accueil</NavLink>
            <NavLink to="/about" className={navLinkClass}>À propos</NavLink>
            <NavLink to="/projects" className={navLinkClass}>Projets</NavLink>
            <NavLink to="/veille" className={navLinkClass}>Veille</NavLink>
            <NavLink to="/technologies" className={navLinkClass}>Technologies</NavLink>
            <NavLink to="/cv" className={navLinkClass}>CV</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          </nav>
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
        </div>
      </header>
      <main className="flex-1 container max-w-6xl py-8">
        {children}
      </main>
      <footer className="border-t border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between py-6 text-sm">
          <div>© {new Date().getFullYear()} Mon Portfolio – Tous droits réservés</div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary-700">GitHub</a>
            <a href="#" className="hover:text-primary-700">Linkedin</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
