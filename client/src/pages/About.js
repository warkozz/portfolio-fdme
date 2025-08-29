import React from 'react';
import Layout from '../components/Layout';

const About = () => (
  <Layout>
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">À propos</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg">Je suis étudiant en BTS SIO option SLAM, passionné par le développement web et les nouvelles technologies.</p>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Stage chez Capgemini</h2>
        <p className="text-gray-700 dark:text-gray-300">J'ai effectué un stage chez <span className="font-bold">Capgemini</span>, où j'ai pu développer mes compétences en développement, gestion de projet et travail en équipe sur des projets innovants.</p>
      </div>
    </div>
  </Layout>
);

export default About;
