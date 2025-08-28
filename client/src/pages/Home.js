import React from 'react';
import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <div className="flex flex-col md:flex-row items-center justify-between mb-10">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Bonjour, je suis HAKIM Rayane,<br />étudiant BTS SIO SLAM
        </h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          Passionné par le développement web et les technologies innovantes.
        </p>
        <a
          href="/projects"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Découvrir mes projets
        </a>
      </div>
      <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center">
          {/* Illustration stylisée */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="#6366F1" />
            <circle cx="40" cy="40" r="28" fill="#A5B4FC" />
          </svg>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#6366F1" />
          <path d="M7 8h10v8H7V8z" fill="#fff" />
        </svg>
        <h2 className="font-bold text-lg mb-2 mt-2">Projets</h2>
        <p className="text-sm text-gray-500">Découvrez mes projets réalisés durant ma formation.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#6366F1" />
          <path d="M8 8h8v8H8V8z" fill="#fff" />
        </svg>
        <h2 className="font-bold text-lg mb-2 mt-2">CV</h2>
        <p className="text-sm text-gray-500">Téléchargez mon CV pour en savoir plus sur mon parcours.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#6366F1" />
          <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h2 className="font-bold text-lg mb-2 mt-2">Contact</h2>
        <p className="text-sm text-gray-500">N'hésitez pas à me contacter pour toute demande ou question.</p>
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

export default Home;