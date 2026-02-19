import React from 'react';
import usePageMeta from '../hooks/usePageMeta';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';

const CV = () => {
  usePageMeta('CV', 'Curriculum vitae de Rayane Hakim – développeur web en alternance chez Capgemini, BTS SIO SLAM.');
  return (
  <Layout containerSize="default">
    {/* En-tête avec déco */}
    <section className="relative text-center mb-10 md:mb-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-64 w-64 bg-primary-400/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 bg-violet-400/20 blur-3xl rounded-full" />
      </div>
      <div className="flex flex-col items-center">
        <PageTitle 
          title="Mon CV" 
          subtitle="Dernière mise à jour • Disponible pour opportunités" 
          variant="gradient" 
        />
      </div>
      <div className="mt-5 flex justify-center gap-3">
      <Button
        as="a"
        href="/CV_2025-09-01_Rayane_Hakim.pdf"
        download
        aria-label="Télécharger mon CV en PDF"
        className="gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        Télécharger le PDF
      </Button>
      <Button
        as="link"
        to="/contact"
        variant="secondary"
        className="gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" stroke="currentColor" strokeWidth="1.6"/><path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Me contacter
      </Button>
      </div>
    </section>

    {/* Résumé */}
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 md:p-8 mb-8">
      <h2 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">Résumé</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Étudiant en BTS SIO option SLAM, passionné par le développement web et logiciel. Je conçois des
        interfaces modernes et des API robustes. Alternant chez Capgemini (secteur public), je pratique
        quotidiennement les bonnes pratiques (revues de code, CI/CD, sécurité, RGPD).
      </p>
    </section>

    {/* Expérience & Formation */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Expérience */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">Expérience</h3>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Capgemini — Alternance</p>
              <span className="text-xs text-gray-500">2024 — présent</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Dév. web/mobile, ateliers, R&amp;D, CI/CD, sécurité (secteur public).
            </p>
          </div>
        </div>
      </div>

      {/* Formation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">Formation</h3>
        </div>
        <div className="space-y-4">
          {/* BTS SIO — SLAM */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                BTS SIO — SLAM, Faculté des Métiers à Massy (91300)
              </p>
              <span className="text-xs text-gray-500">2024 — 2026</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Développement d'applications, bases de données, sécurité, gestion de projet.
            </p>
          </div>

          {/* Développeur Web et Web Mobile — Studi */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Développeur Web et Web Mobile — Studi, école en ligne digitale
              </p>
              <span className="text-xs text-gray-500">2022 — 2024</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Création de sites et applications web, bases de données, intégration front-end et développement back-end.
            </p>
          </div>
        </div>
      </div>
    </section>


    {/* Compétences */}
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 md:p-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <h3 className="font-bold text-xl text-gray-900 dark:text-white">Compétences</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200">React</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">Python</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">Tailwind CSS</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200">C++</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">JavaScript</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200">PHP</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">MySQL</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200">Git</span>
      </div>
    </section>
  </Layout>
  );
};

export default CV;