import React from 'react';
import Layout from '../components/Layout';

const CV = () => (
  <Layout>
    <h1 className="text-4xl font-extrabold mb-8 text-center">Mon CV</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex-1 mb-6 md:mb-0">
        <h2 className="font-bold text-xl mb-4">Résumé</h2>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 text-lg">
          <li>BTS SIO SLAM</li>
          <li>Stage Capgemini</li>
          <li>Compétences clés</li>
        </ul>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-32 h-32 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#6366F1" />
            <circle cx="12" cy="10" r="4" fill="#fff" />
            <rect x="6" y="16" width="12" height="2" rx="1" fill="#fff" />
          </svg>
        </div>
        <a
          href="/cv.pdf"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Télécharger mon CV (PDF)
        </a>
      </div>
    </div>
    <footer className="mt-12 text-center text-gray-400 text-sm">
      ©2025 Mon Portfolio – Tous droits réservés<br />
      <span className="inline-block mt-2">
        <a href="#" className="hover:underline">GitHub</a>
        <a href="#" className="ml-2 hover:underline">Linkedin</a>
      </span>
    </footer>
  </Layout>
);

export default CV;