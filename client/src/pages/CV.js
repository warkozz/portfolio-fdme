import React from 'react';
import Layout from '../components/Layout';

const CV = () => (
  <Layout>
    <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">Mon CV</h1>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex-1 mb-6 md:mb-0">
        <h2 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white">Résumé</h2>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 text-lg space-y-1">
          <li>BTS SIO SLAM</li>
          <li>Stage Capgemini</li>
          <li>Compétences clés</li>
        </ul>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-36 h-36 rounded-xl bg-gray-100 dark:bg-gray-700 mb-4 flex items-center justify-center">
          <svg width="72" height="72" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#6366F1" />
            <circle cx="12" cy="10" r="4" fill="#fff" />
            <rect x="6" y="16" width="12" height="2" rx="1" fill="#fff" />
          </svg>
        </div>
        <a
          href="/cv.pdf"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow-soft hover:bg-primary-700 transition"
        >
          Télécharger mon CV (PDF)
        </a>
      </div>
    </div>
  </Layout>
);

export default CV;