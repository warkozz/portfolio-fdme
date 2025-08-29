import React from 'react';
import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <section className="flex flex-col md:flex-row items-center justify-between mb-10">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">
          Bonjour, je suis HAKIM Rayane,<br />étudiant BTS SIO SLAM
        </h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          Passionné par le développement web et les technologies innovantes.
        </p>
        <a
          href="/projects"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow-soft hover:bg-primary-700 transition"
        >
          Découvrir mes projets
        </a>
      </div>
      <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="w-44 h-44 rounded-full bg-primary-50 dark:bg-gray-800 flex items-center justify-center shadow-soft">
          <svg width="88" height="88" viewBox="0 0 80 80" fill="none" aria-hidden>
            <circle cx="40" cy="40" r="40" fill="#6366F1" />
            <circle cx="40" cy="40" r="28" fill="#A5B4FC" />
          </svg>
        </div>
      </div>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <a href="/projects" className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start hover:shadow-lg transition">
        <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M7 8h10v8H7V8z" fill="#fff"/></svg>
        </div>
        <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">Projets</h2>
        <p className="text-sm text-gray-500">Découvrez mes projets réalisés durant ma formation.</p>
      </a>
      <a href="/cv" className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start hover:shadow-lg transition">
        <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M8 8h8v8H8V8z" fill="#fff"/></svg>
        </div>
        <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">CV</h2>
        <p className="text-sm text-gray-500">Téléchargez mon CV pour en savoir plus sur mon parcours.</p>
      </a>
      <a href="/contact" className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start hover:shadow-lg transition">
        <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">Contact</h2>
        <p className="text-sm text-gray-500">N'hésitez pas à me contacter pour toute demande ou question.</p>
      </a>
    </section>
  </Layout>
);

export default Home;