import React from 'react';
import Layout from '../components/Layout';

const About = () => (
  <Layout>
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">À propos</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Je suis étudiant en BTS SIO option SLAM, passionné par le développement web et les nouvelles technologies.</p>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Stage chez Capgemini</h2>
      <p className="text-gray-700 dark:text-gray-300">J'ai effectué un stage chez <span className="font-bold">Capgemini</span>, où j'ai pu développer mes compétences en développement, gestion de projet et travail en équipe sur des projets innovants.</p>
    </div>
  </Layout>
);

export default About;
