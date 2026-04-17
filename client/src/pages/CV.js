import React from 'react';
import usePageMeta from '../hooks/usePageMeta';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';

const SKILLS = [
  { label: 'JavaScript',   color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' },
  { label: 'TypeScript',   color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  { label: 'React',        color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200' },
  { label: 'Next.js',      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200' },
  { label: 'React Native', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200' },
  { label: 'Python',       color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' },
  { label: 'FastAPI',      color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200' },
  { label: 'PHP',          color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  { label: 'C++',          color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200' },
  { label: 'Tailwind CSS', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200' },
  { label: 'MySQL',        color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  { label: 'PostgreSQL',   color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200' },
  { label: 'Prisma',       color: 'bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200' },
  { label: 'Git / GitHub', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200' },
  { label: 'Docker',       color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200' },
  { label: 'AWS',          color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  { label: 'CI/CD',        color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200' },
  { label: 'Scrum / Agile',color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200' },
];

const TimelineItem = ({ title, place, period, desc, color }) => (
  <div className="relative pl-5 border-l-2 border-gray-200 dark:border-gray-700 pb-6 last:pb-0">
    <span className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full ${color}`} />
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
      <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug">{title}</p>
      <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{period}</span>
    </div>
    <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">{place}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{desc}</p>
  </div>
);

const CV = () => {
  usePageMeta('CV', 'Curriculum vitae de Rayane Hakim – ingénieur logiciel en alternance chez Capgemini, BTS SIO SLAM.');
  return (
    <Layout containerSize="default">
      <div className="space-y-8">
        <PageTitle title="Mon CV" />

        {/* En-tête identité + actions */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rayane Hakim</h2>
              <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">Ingénieur logiciel · Alternant Capgemini · BTS SIO SLAM</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-xl leading-relaxed">
                Développeur full-stack passionné, en reconversion depuis 2022. Je conçois des applications web et mobiles
                modernes (React, Next.js, Python, PHP) avec une attention particulière à la qualité du code, la sécurité et
                l'expérience utilisateur. Actuellement en alternance chez Capgemini (secteur public).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              <Button
                as="a"
                href="/CV-Epitech.pdf"
                download
                aria-label="Télécharger mon CV en PDF"
                className="gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Télécharger PDF
              </Button>
              <Button as="link" to="/contact" variant="secondary" className="gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Me contacter
              </Button>
            </div>
          </div>
        </div>

        {/* Expérience & Formation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Expérience */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Expérience</h3>
            </div>
            <div className="space-y-0">
              <TimelineItem
                title="Software Engineer — Alternant"
                place="Capgemini · Issy-les-Moulineaux"
                period="Sept. 2024 — présent"
                desc="Développement web/mobile (React, React Native, Python), R&D IA générative, CI/CD, sécurité RGPD. Secteur public."
                color="bg-primary-500"
              />
              <TimelineItem
                title="Alternant / Chef de rang / Assist. direction"
                place="Novotel Orly-Rungis · Rungis (94)"
                period="Sept. 2019 — Mars 2024"
                desc="Management d'équipe en restauration gastronomique, gestion de service et relation clientèle internationale."
                color="bg-gray-400"
              />
            </div>
          </div>

          {/* Formation */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-600 dark:text-violet-400">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Formation</h3>
            </div>
            <div className="space-y-0">
              <TimelineItem
                title="BTS SIO — option SLAM"
                place="Faculté des Métiers de l'Essonne · Massy (91)"
                period="2024 — 2026"
                desc="Développement d'applications, bases de données, sécurité, réseaux, gestion de projet. En alternance."
                color="bg-violet-500"
              />
              <TimelineItem
                title="Titre Développeur Web et Web Mobile (Bac+2)"
                place="Studi · École en ligne"
                period="2022 — 2024"
                desc="Développement front-end et back-end, intégration web, bases de données, optimisation des performances."
                color="bg-violet-400"
              />
              <TimelineItem
                title="BTS Management en Hôtellerie-Restauration"
                place="Université Théodore Monod · Antony (92)"
                period="2019 — 2021"
                desc="Gestion d'équipe, management, langues étrangères, comptabilité et technologie appliquée."
                color="bg-gray-300 dark:bg-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Compétences techniques */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Compétences techniques</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => (
              <span key={s.label} className={`px-3 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
            ))}
          </div>
        </div>

        {/* Langues */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Langues</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { lang: 'Français', level: 'Langue maternelle', pct: 100, color: 'bg-emerald-500' },
              { lang: 'Anglais',  level: 'Avancé (C1)',         pct: 88,  color: 'bg-emerald-500' },
              { lang: 'Arabe',    level: 'Intermédiaire',       pct: 55,  color: 'bg-amber-500' },
            ].map(({ lang, level, pct, color }) => (
              <div key={lang} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{lang}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{level}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CV;