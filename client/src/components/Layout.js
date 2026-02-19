import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, containerSize = 'default' }) => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme-dark');
    if (stored !== null) return stored === '1';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Container size variants for different page layouts
  const containerClasses = {
    default: 'max-w-7xl',   // Wider for projects, veille, technologies, admin
    narrow: 'max-w-4xl',    // Narrower for text-heavy content (about)
    medium: 'max-w-5xl',    // Medium for forms and CV
    full: 'max-w-none'      // Full width if needed
  };

  // Memoized theme toggle handler
  const toggleTheme = useCallback(() => {
    setDark((d) => !d);
  }, []);

  // Apply dark mode to document
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
      <Header dark={dark} toggleTheme={toggleTheme} />
      <main className={`flex-1 container ${containerClasses[containerSize]} px-4 sm:px-6 lg:px-8 py-8`}>
        {children}
      </main>
      <Footer containerSize={containerSize} />
    </div>
  );
};

export default Layout;
