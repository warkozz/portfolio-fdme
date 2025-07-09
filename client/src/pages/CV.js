import React from 'react';
import Layout from '../components/Layout';

const CV = () => (
  <Layout>
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Mon CV</h1>
      <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-4 block">Télécharger le CV (PDF)</a>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
        <li><strong>Formation :</strong> BTS SIO SLAM</li>
        <li><strong>Compétences :</strong> React, PHP, MariaDB, Tailwind CSS, ...</li>
        <li><strong>Expérience :</strong> Stage Capgemini, projets scolaires, ...</li>
        {/* Ajoute d'autres infos si besoin */}
      </ul>
    </div>
  </Layout>
);

export default CV;
