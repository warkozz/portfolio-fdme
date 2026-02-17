import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Home = () => {
  const [projCount, setProjCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProjCount(15);
      return;
    }

    let start = 0;
    const end = 15;
    const duration = 1200; // ms
    let startTs = 0;

    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setProjCount(value);
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
  <Layout containerSize="default">
    <section className="relative flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16 overflow-visible">
      {/* Decorative blurred background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-60 w-60 bg-primary-400/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-16 -right-20 h-72 w-72 bg-violet-400/20 blur-3xl rounded-full" />
      </div>
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          <span className="text-gray-900 dark:text-white">Bonjour, je suis</span>{' '}
          <span className="bg-gradient-to-r from-primary-600 to-violet-500 bg-clip-text text-transparent">HAKIM Rayane</span>,<br />
          <span className="text-gray-900 dark:text-white">étudiant BTS SIO SLAM</span>
        </h1>
        <p className="mb-2 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Passionné par le développement web, le design système et les technologies cloud.
        </p>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
          React, Tailwind, PHP, MySQL • Alternance chez Capgemini • Objectif: construire des apps utiles et performantes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            as="link"
            to="/projects"
            aria-label="Découvrir mes projets"
          >
            Découvrir mes projets
          </Button>
          <Button
            as="link"
            to="/contact"
            variant="secondary"
            aria-label="Me contacter"
          >
            Me contacter
          </Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="relative group">
          {/* Card container matching site style */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-3 transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 hover:border-primary-300 dark:hover:border-primary-600">
            <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-xl overflow-hidden">
              <img 
                src="/image.png" 
                alt="HAKIM Rayane - Développeur BTS SIO SLAM"
                className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>
            
            {/* Status badge */}
            <div className="mt-3 flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Disponible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Bandeau de métriques */}
    <section className="mt-4 md:mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-4 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">+{projCount} projets</p>
            <p className="text-xs text-gray-500">Web, outils internes, POCs</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-4 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Alternance Capgemini</p>
            <p className="text-xs text-gray-500">Secteur public</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-4 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Formations & R&D</p>
            <p className="text-xs text-gray-500">AWS, bonnes pratiques, CI/CD</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-4 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Disponible</p>
            <p className="text-xs text-gray-500">Contactez‑moi pour échanger</p>
          </div>
        </div>
      </div>
    </section>

    {/* Badges technos mis en avant */}
    <section className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200">
          React
        </span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
          Python
        </span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
          Tailwind CSS
        </span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200">
          C++
        </span>
      </div>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-primary-500/30 via-violet-500/20 to-transparent hover:from-primary-500/60 hover:via-violet-500/40 transition">
        <Button as="link" to="/projects" variant="link" className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start h-full transition transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center" aria-hidden>
            {/* Folder / Projects icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3.5 7.75A1.75 1.75 0 0 1 5.25 6h3.17c.46 0 .9.2 1.2.54l1.06 1.18c.33.37.81.58 1.32.58h4.5A1.75 1.75 0 0 1 18.25 10v6.25A1.75 1.75 0 0 1 16.5 18h-11A1.75 1.75 0 0 1 3.75 16.25V7.75Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">Projets</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Découvrez mes projets réalisés durant ma formation et mon alternance.</p>
        </Button>
      </div>
      <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-primary-500/30 via-violet-500/20 to-transparent hover:from-primary-500/60 hover:via-violet-500/40 transition">
        <Button as="link" to="/cv" variant="link" className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start h-full transition transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center" aria-hidden>
            {/* Document / CV icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M7 4.75A1.75 1.75 0 0 1 8.75 3h4.69c.46 0 .9.18 1.23.51l2.82 2.82c.33.33.51.77.51 1.23V18.25A1.75 1.75 0 0 1 16.25 20h-7.5A1.75 1.75 0 0 1 7 18.25V4.75Z" fill="currentColor"/>
              <path d="M13.5 3.5v3.25c0 .41.34.75.75.75H17.5" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">CV</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Téléchargez mon CV pour en savoir plus sur mon parcours professionnel.</p>
        </Button>
      </div>
      <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-primary-500/30 via-violet-500/20 to-transparent hover:from-primary-500/60 hover:via-violet-500/40 transition">
        <Button as="link" to="/contact" variant="link" className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start h-full transition transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center" aria-hidden>
            {/* Phone / Contact icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59c.5.23 1.09.14 1.48-.25l1.94-1.94a1 1 0 0 1 1.05-.24l3.06 1.02a1 1 0 0 1 .66.94v2.49a2 2 0 0 1-2 2c-9.39 0-17-7.61-17-17a2 2 0 0 1 2-2h2.49a1 1 0 0 1 .94.66l1.02 3.06c.14.44.03.93-.24 1.28l-1.94 1.94c-.4.4-.5.99-.25 1.48Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">Contact</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">N'hésitez pas à me contacter pour toute demande ou question.</p>
        </Button>
      </div>
    </section>
  </Layout>
  );
};

export default Home;