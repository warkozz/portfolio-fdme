import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import usePageMeta from '../hooks/usePageMeta';

const NotFound = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  usePageMeta('404 – Page introuvable', 'Cette page n\'existe pas sur le portfolio de Rayane Hakim.');
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <Layout containerSize="narrow">
      <div
        className={`flex flex-col items-center justify-center py-24 text-center transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Code 404 stylisé */}
        <div className="relative mb-6 select-none">
          <span className="text-[9rem] md:text-[12rem] font-extrabold leading-none bg-gradient-to-br from-primary-400/20 to-violet-400/20 dark:from-primary-400/10 dark:to-violet-400/10 bg-clip-text text-transparent">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <path d="M11 8v4M11 15h.01"/>
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page introuvable
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-2 max-w-sm">
          La page <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-700 dark:text-gray-300">{pathname}</code> n'existe pas ou a été déplacée.
        </p>

        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          Vérifiez l'URL ou utilisez les liens ci-dessous.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-colors duration-200 shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Retour à l'accueil
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm transition-colors duration-200 bg-white dark:bg-gray-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92Z"/>
            </svg>
            Signaler un problème
          </Link>
        </div>

        {/* Suggestions de liens */}
        <div className="w-full max-w-sm text-left border border-gray-200 dark:border-gray-700 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur overflow-hidden">
          <p className="px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
            Pages disponibles
          </p>
          {[
            { to: '/projects', label: 'Projets', icon: <path d="M3.5 7.75A1.75 1.75 0 0 1 5.25 6h3.17c.46 0 .9.2 1.2.54l1.06 1.18c.33.37.81.58 1.32.58h4.5A1.75 1.75 0 0 1 18.25 10v6.25A1.75 1.75 0 0 1 16.5 18h-11A1.75 1.75 0 0 1 3.75 16.25V7.75Z" /> },
            { to: '/about', label: 'À propos', icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></> },
            { to: '/cv', label: 'CV', icon: <><path d="M7 4.75A1.75 1.75 0 0 1 8.75 3h4.69c.46 0 .9.18 1.23.51l2.82 2.82c.33.33.51.77.51 1.23V18.25A1.75 1.75 0 0 1 16.25 20h-7.5A1.75 1.75 0 0 1 7 18.25V4.75Z"/><path d="M13.5 3.5v3.25c0 .41.34.75.75.75H17.5"/></> },
            { to: '/contact', label: 'Contact', icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92Z"/> },
          ].map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 flex-shrink-0">
                {icon}
              </svg>
              {label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-gray-300 dark:text-gray-600">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
