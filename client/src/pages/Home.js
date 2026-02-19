import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { fetchProjects } from '../api/projects';
import usePageMeta from '../hooks/usePageMeta';

/* ── Tech badges config ─────────────────────────── */
const TECHS = [
  {
    label: 'React',
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2.5"/>
        <path d="M12 2C6.47 2 2 6.70 2 12s4.47 10 10 10 10-4.70 10-10S17.53 2 12 2Zm0 18c-4.41 0-8-3.59-8-8 0-1.48.41-2.86 1.11-4.06C6.99 9.78 9.36 11 12 11s5.01-1.22 6.89-3.06C19.59 9.14 20 10.52 20 12c0 4.41-3.59 8-8 8Z" opacity=".3"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    label: 'Python',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.3 2 7 3.1 7 4.5V7h5v1H5.5C3.6 8 2 9.8 2 12s1.6 4 3.5 4H7v-2.5C7 12 9.3 11 12 11s5 1 5 2.5V16h1.5c1.9 0 3.5-1.8 3.5-4s-1.6-4-3.5-4H17V4.5C17 3.1 14.7 2 12 2Zm-1 2.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z"/>
        <path d="M12 22c2.7 0 5-1.1 5-2.5V17h-5v-1h6.5c1.9 0 3.5-1.8 3.5-4s-1.6-4-3.5-4H17v2.5C17 12 14.7 13 12 13s-5-1-5-2.5V8H5.5C3.6 8 2 9.8 2 12s1.6 4 3.5 4H7v2.5C7 20.9 9.3 22 12 22Zm1-2.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z"/>
      </svg>
    ),
  },
  {
    label: 'Tailwind CSS',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C13.37 10.8 14.38 12 16.5 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.13 7.2 14.12 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.37 16.8 9.38 18 11.5 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.13 13.2 9.12 12 7 12Z"/>
      </svg>
    ),
  },
  {
    label: 'PHP',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 14H9V8h4c1.66 0 3 1.34 3 3s-1.34 3-3 3h-2v2Zm0-4h2c.55 0 1-.45 1-1s-.45-1-1-1h-2v2Z"/>
      </svg>
    ),
  },
  {
    label: 'MySQL',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="6" rx="8" ry="3"/>
        <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
        <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"/>
      </svg>
    ),
  },
  {
    label: 'C++',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.5 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5c.96 0 1.82.38 2.46 1l1.42-1.42A5.47 5.47 0 0 0 10.5 6.5C7.46 6.5 5 8.96 5 12s2.46 5.5 5.5 5.5c1.56 0 2.96-.65 3.98-1.68l-1.42-1.42c-.64.62-1.5 1.1-2.56 1.1Z"/>
        <path d="M16 11h-1v-1h-1v1h-1v1h1v1h1v-1h1v-1ZM20 11h-1v-1h-1v1h-1v1h1v1h1v-1h1v-1Z"/>
      </svg>
    ),
  },
];

/* ── Metric cards config ────────────────────────── */
const metrics = (projCount) => [
  {
    dot: 'bg-primary-500',
    label: `+${projCount} projets`,
    sub: 'Web, outils internes, POCs',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3.5 7.75A1.75 1.75 0 0 1 5.25 6h3.17c.46 0 .9.2 1.2.54l1.06 1.18c.33.37.81.58 1.32.58h4.5A1.75 1.75 0 0 1 18.25 10v6.25A1.75 1.75 0 0 1 16.5 18h-11A1.75 1.75 0 0 1 3.75 16.25V7.75Z"/>
      </svg>
    ),
    iconBg: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
  },
  {
    dot: 'bg-violet-500',
    label: 'Capgemini',
    sub: 'Alternance – Secteur public',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  },
  {
    dot: 'bg-emerald-500',
    label: 'R&D & Cloud',
    sub: 'AWS, bonnes pratiques, CI/CD',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z"/>
      </svg>
    ),
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  {
    dot: 'bg-amber-500',
    label: 'Disponible',
    sub: 'Contactez-moi pour échanger',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92Z"/>
      </svg>
    ),
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
];

const Home = () => {
  usePageMeta('Accueil', 'Portfolio de Rayane Hakim – Développeur BTS SIO SLAM passionné par le web, React et le cloud.');
  const [projCount, setProjCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  // Fade-in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Animated counter
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setProjCount(15); return; }
    let startTs = 0;
    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / 1200, 1);
      setProjCount(Math.floor(progress * 15));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Fetch recent projects
  useEffect(() => {
    fetchProjects()
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setRecentProjects(arr.slice(0, 3));
        if (arr.length > 0) setProjCount(arr.length);
      })
      .catch(() => {})
      .finally(() => setLoadingProjects(false));
  }, []);

  const handleImgError = useCallback(() => setImgError(true), []);

  return (
  <Layout containerSize="default">

    {/* ── Hero ──────────────────────────────────────── */}
    <section
      className={`relative flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16 overflow-visible transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Blobs décoratifs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-60 w-60 bg-primary-400/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-16 -right-20 h-72 w-72 bg-violet-400/20 blur-3xl rounded-full" />
      </div>

      {/* Texte */}
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
          React · Tailwind · PHP · MySQL &nbsp;•&nbsp; Alternance chez Capgemini &nbsp;•&nbsp; Objectif : construire des apps utiles et performantes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button as="link" to="/projects" aria-label="Découvrir mes projets">
            Découvrir mes projets
          </Button>
          <Button as="link" to="/contact" variant="secondary" aria-label="Me contacter">
            Me contacter
          </Button>
        </div>
      </div>

      {/* Photo + badge */}
      <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="relative group">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-3 transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 hover:border-primary-300 dark:hover:border-primary-600">
            <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              {imgError ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-2">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
                  </svg>
                  <span className="text-xs">Photo</span>
                </div>
              ) : (
                <img
                  src="/image.png"
                  alt="HAKIM Rayane – Développeur BTS SIO SLAM"
                  className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                  onError={handleImgError}
                />
              )}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 transition-colors duration-300">
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

    {/* ── Scroll indicator ─────────────────────────── */}
    <div className="flex justify-center mb-6 -mt-4">
      <div className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 animate-bounce">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </div>

    {/* ── Métriques ────────────────────────────────── */}
    <section
      className={`mt-2 transition-all duration-700 delay-150 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics(projCount).map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-4 flex items-center gap-3 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
          >
            <div className={`flex-shrink-0 p-2 rounded-lg ${m.iconBg}`}>{m.icon}</div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{m.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{m.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── Badges technos ───────────────────────────── */}
    <section
      className={`mt-6 transition-all duration-700 delay-200 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {TECHS.map((t) => (
          <span
            key={t.label}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-150 hover:scale-105 cursor-default ${t.color}`}
            title={t.label}
          >
            {t.icon}
            {t.label}
          </span>
        ))}
      </div>
    </section>

    {/* ── Derniers projets ─────────────────────────── */}
    <section
      className={`mt-10 transition-all duration-700 delay-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Derniers projets</h2>
        <Link
          to="/projects"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium flex items-center gap-1"
        >
          Voir tout
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {loadingProjects ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-4 animate-pulse">
              <div className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700 mb-3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            </div>
          ))}
        </div>
      ) : recentProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentProjects.map((project) => (
            <Link
              key={project.id}
              to="/projects"
              className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-4 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {project.image && (
                <div className="h-32 rounded-lg overflow-hidden mb-3 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={`http://localhost/portfolio-fdme/server/upload/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">{project.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{project.description}</p>
              {project.competencies && (
                <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 w-fit">
                  {project.competencies.split(',')[0].trim()}
                </span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">Aucun projet disponible pour l'instant.</p>
      )}
    </section>

    {/* ── Cards navigation ─────────────────────────── */}
    <section
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 transition-all duration-700 delay-[400ms] ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-primary-500/30 via-violet-500/20 to-transparent hover:from-primary-500/60 hover:via-violet-500/40 transition">
        <Button as="link" to="/projects" variant="link" className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start h-full transition transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3.5 7.75A1.75 1.75 0 0 1 5.25 6h3.17c.46 0 .9.2 1.2.54l1.06 1.18c.33.37.81.58 1.32.58h4.5A1.75 1.75 0 0 1 18.25 10v6.25A1.75 1.75 0 0 1 16.5 18h-11A1.75 1.75 0 0 1 3.75 16.25V7.75Z"/>
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">Projets</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Découvrez mes projets réalisés durant ma formation et mon alternance.</p>
        </Button>
      </div>
      <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-primary-500/30 via-violet-500/20 to-transparent hover:from-primary-500/60 hover:via-violet-500/40 transition">
        <Button as="link" to="/cv" variant="link" className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start h-full transition transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 4.75A1.75 1.75 0 0 1 8.75 3h4.69c.46 0 .9.18 1.23.51l2.82 2.82c.33.33.51.77.51 1.23V18.25A1.75 1.75 0 0 1 16.25 20h-7.5A1.75 1.75 0 0 1 7 18.25V4.75Z"/>
              <path d="M13.5 3.5v3.25c0 .41.34.75.75.75H17.5"/>
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1 mt-3 text-gray-900 dark:text-white">CV</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Téléchargez mon CV pour en savoir plus sur mon parcours professionnel.</p>
        </Button>
      </div>
      <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-primary-500/30 via-violet-500/20 to-transparent hover:from-primary-500/60 hover:via-violet-500/40 transition">
        <Button as="link" to="/contact" variant="link" className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 flex flex-col items-start h-full transition transform hover:-translate-y-1 hover:shadow-lg">
          <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59c.5.23 1.09.14 1.48-.25l1.94-1.94a1 1 0 0 1 1.05-.24l3.06 1.02a1 1 0 0 1 .66.94v2.49a2 2 0 0 1-2 2c-9.39 0-17-7.61-17-17a2 2 0 0 1 2-2h2.49a1 1 0 0 1 .94.66l1.02 3.06c.14.44.03.93-.24 1.28l-1.94 1.94c-.4.4-.5.99-.25 1.48Z"/>
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