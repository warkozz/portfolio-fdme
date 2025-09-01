import React from 'react';
import Layout from '../components/Layout';

const About = () => (
  <Layout>
    <div className="max-w-4xl mx-auto mt-12 px-4 md:px-0 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">À propos</h1>

      {/* Présentation personnelle */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">Moi, c'est Rayane Hakim</h2>
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          J'ai 24 ans et je suis ingénieur logiciel. Après une reconversion en 2022 (je travaillais auparavant comme
          assistant de direction dans un hôtel), j'ai choisi de me consacrer pleinement au développement logiciel.
          J'aime concevoir des applications utiles, propres et maintenables, avec une attention particulière à
          l'expérience utilisateur, la qualité du code et la sécurité.
        </p>
      </div>

      {/* Entreprise */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">Mon entreprise — Capgemini</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Depuis septembre 2024, je suis en alternance chez <span className="font-bold">Capgemini</span>, un leader mondial des services
          du numérique. L'entreprise accompagne ses clients sur tout le cycle de vie des solutions: conseil, ingénierie,
          transformation digitale, intégration, cloud et cybersécurité. Les valeurs fortes qui m'animent au quotidien:
          proximité, confiance, esprit d'équipe et excellence.
        </p>
      </div>

      {/* Secteur Public */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">Ce que je fais — Secteur Public</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Je travaille sur des projets du <span className="font-medium">Secteur Public</span>, avec un impact direct sur les services
          rendus aux citoyens. Les objectifs: moderniser les systèmes d'information, améliorer l'accès aux services
          en ligne, renforcer la sécurité et la conformité (RGPD), et optimiser la performance des plateformes.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 marker:text-gray-400">
          <li><span className="font-medium">Conception & développement</span>: participation à la définition des solutions, réalisation de fonctionnalités, intégration d'APIs REST, et tests.</li>
          <li><span className="font-medium">Qualité & CI/CD</span>: revue de code, automatisation des tests, intégration continue, bonnes pratiques de sécurité.</li>
          <li><span className="font-medium">Collaboration</span>: travail en équipe agile (Scrum/Kanban), échanges réguliers avec les métiers et les équipes infra.</li>
        </ul>
      </div>

      {/* Compétences clés */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">Compétences & intérêts</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 marker:text-gray-400">
          <li>Développement web: conception d'APIs, intégration front/back, bases de données SQL.</li>
          <li>Bonnes pratiques: tests, sécurité, performance, documentation, accessibilité.</li>
          <li>Outils & méthodes: Git, revues de code, intégration continue, méthodologies agiles.</li>
          <li>Soft skills: communication, rigueur, sens du service public, curiosité technique.</li>
        </ul>
      </div>
    </div>
  </Layout>
);

export default About;
