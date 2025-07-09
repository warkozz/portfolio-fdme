import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [dark, setDark] = useState(false);
  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-gray-800 dark:bg-gray-950 text-white p-4 flex justify-between items-center">
        <nav className="flex gap-4">
          <Link to="/" className="font-bold hover:underline">Accueil</Link>
          <Link to="/projects" className="hover:underline">Projets</Link>
          <Link to="/veille" className="hover:underline">Veille</Link>
          <Link to="/about" className="hover:underline">À propos</Link>
          <Link to="/technologies" className="hover:underline">Technologies</Link>
          <Link to="/cv" className="hover:underline">CV</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </nav>
        <button onClick={() => setDark(d => !d)} className="ml-4 px-3 py-1 rounded bg-gray-700 dark:bg-gray-800 text-sm">
          {dark ? 'Clair' : 'Sombre'}
        </button>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 text-center p-4 mt-8">
        © {new Date().getFullYear()} Portfolio BTS SIO SLAM
      </footer>
    </div>
  );
};

export default Layout;
