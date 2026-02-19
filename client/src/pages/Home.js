import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { fetchProjects } from '../api/projects';
import usePageMeta from '../hooks/usePageMeta';

/*  Domaines  */
const DOMAINS = [
  {
    label: 'Web',
    desc: 'Applications full-stack, APIs REST, interfaces réactives.',
    color: 'bg-primary-50 text-primary-700 border-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-800/40',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18"/>
        <circle cx="7" cy="6" r=".5" fill="currentColor"/>
        <circle cx="10" cy="6" r=".5" fill="currentColor"/>
        <circle cx="13" cy="6" r=".5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Mobile',
    desc: 'Apps Android & iOS, éco-système cross-platform.',
    color: 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800/40',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="7" y="2" width="10" height="20" rx="2"/>
        <circle cx="12" cy="18" r="1" fill="currentColor"/>
        <path d="M10 5h4"/>
      </svg>
    ),
  },
  {
    label: 'Logiciel',
    desc: 'Outils desktop, scripts, automatisation et systèmes.',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/40',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="4" x2="12" y2="20" opacity=".4"/>
      </svg>
    ),
  },
  {
    label: 'R&D',
    desc: 'Scripting, analyse de données, IA, optimisation & expérimentations.',
    color: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/40',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    ),
  },
];

/*  Tech badges  */
const TECHS = [
  {
    label: 'React',
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'React Native',
    color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="7" y="2" width="10" height="20" rx="2"/>
        <circle cx="12" cy="18" r="1" fill="currentColor"/>
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
  {
    label: 'AWS',
    color: 'bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z"/>
      </svg>
    ),
  },
  {
    label: 'Java',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2v6a6 6 0 0 0 12 0V2"/>
        <path d="M6 8h12"/>
        <path d="M18 8h2a2 2 0 0 1 0 4h-2"/>
        <path d="M4 22h16"/>
        <path d="M6 14v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/>
      </svg>
    ),
  },
  {
    label: 'SQL',
    color: 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-200',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
  },
];

/*  Metric cards  */
const metrics = (projCount) => [
  {
    label: `+${projCount} projets`,
    sub: 'Web, mobile, logiciel & R&D',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3.5 7.75A1.75 1.75 0 0 1 5.25 6h3.17c.46 0 .9.2 1.2.54l1.06 1.18c.33.37.81.58 1.32.58h4.5A1.75 1.75 0 0 1 18.25 10v6.25A1.75 1.75 0 0 1 16.5 18h-11A1.75 1.75 0 0 1 3.75 16.25V7.75Z"/>
      </svg>
    ),
    iconBg: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
  },
  {
    label: 'Capgemini',
    sub: 'Alternance  Secteur public',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  },
  {
    label: '4 domaines',
    sub: 'Web  Mobile  Logiciel  R&D',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  {
    label: 'R&D & Cloud',
    sub: 'AWS, CI/CD, veille techno active',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z"/>
      </svg>
    ),
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
];

/*  */

const Home = () => {
  usePageMeta(
    'Accueil',
    'Portfolio de Rayane Hakim  Software Engineer : développement web, mobile, logiciel et R&D. Alternant chez Capgemini.'
  );

  const [projCount, setProjCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

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

      {/*  Hero  */}
      <section
        className={`relative flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16 overflow-visible transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 -left-20 h-60 w-60 bg-primary-400/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-16 -right-20 h-72 w-72 bg-violet-400/20 blur-3xl rounded-full" />
        </div>

        {/* Texte */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 border border-primary-100 dark:border-primary-800/50">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
              BTS SIO SLAM
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              Alternant Capgemini
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Disponible
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            <span className="text-gray-900 dark:text-white">Je suis </span>
            <span className="bg-gradient-to-r from-primary-600 to-violet-500 bg-clip-text text-transparent">Rayane Hakim</span>
            <span className="block text-gray-700 dark:text-gray-300 text-2xl md:text-3xl font-semibold mt-1">
              Software Engineer
            </span>
          </h1>

          <p className="mb-8 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
            Je conçois des solutions couvrant le{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">web</span>,{' '}
            le <span className="font-medium text-gray-700 dark:text-gray-300">mobile</span> et les{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">outils métier</span> 
            avec une appétence pour la R&D et les technologies cloud.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button as="link" to="/projects" aria-label="Voir mes projets">
              <span className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3.5 7.75A1.75 1.75 0 0 1 5.25 6h3.17c.46 0 .9.2 1.2.54l1.06 1.18c.33.37.81.58 1.32.58h4.5A1.75 1.75 0 0 1 18.25 10v6.25A1.75 1.75 0 0 1 16.5 18h-11A1.75 1.75 0 0 1 3.75 16.25V7.75Z"/>
                </svg>
                Voir mes projets
              </span>
            </Button>
            <Button as="link" to="/contact" variant="secondary" aria-label="Me contacter">
              <span className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92Z"/>
                </svg>
                Me contacter
              </span>
            </Button>
          </div>
        </div>

        {/* Photo */}
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
                    alt="Rayane Hakim  Software Engineer"
                    className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                    onError={handleImgError}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Scroll indicator  */}
      <div className="flex justify-center mb-6 -mt-4">
        <div className="flex flex-col items-center gap-1 text-gray-300 dark:text-gray-600 animate-bounce">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>

      {/*  Métriques  */}
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

      {/*  Ce que je fais  */}
      <section
        className={`mt-10 transition-all duration-700 delay-200 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Ce que je fais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DOMAINS.map((d) => (
            <div
              key={d.label}
              className={`rounded-xl border p-4 flex flex-col gap-2 ${d.color}`}
            >
              <div className="opacity-80">{d.icon}</div>
              <p className="font-semibold text-sm">{d.label}</p>
              <p className="text-xs opacity-75 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  Stack technique  */}
      <section
        className={`mt-8 transition-all duration-700 delay-[250ms] ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Stack</h2>
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

      {/*  Derniers projets  */}
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
            Tous les projets
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
                to={`/projects#project-${project.id}`}
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

    </Layout>
  );
};

export default Home;
