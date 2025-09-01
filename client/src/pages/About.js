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

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Informations clés</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Type</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">Groupe international de services numériques (ESN / conseil & ingénierie)</dd>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Secteurs</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">Secteur public, finance, industrie, énergie, retail, télécoms, santé, etc.</dd>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 md:col-span-2">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Produits & services</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">
                Conseil en transformation, architecture & développement logiciel, intégration de systèmes, data/IA,
                cloud & DevOps, cybersécurité, modernisation applicative, UX/UI, infogérance et support.
              </dd>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Clients</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">Grandes entreprises et administrations, en France et à l'international</dd>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
              <dt className="text-sm text-gray-500 dark:text-gray-400">Chiffre d'affaires</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">Chiffre d’affaires de 22 096 millions d’euros en 2024</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Secteur Public */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">Ce que je fais — Secteur Public</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Ingénieur logiciel en alternance chez Capgemini, j'interviens sur des projets du <span className="font-medium">Secteur Public </span>
          avec un impact direct pour les citoyens. Mon périmètre va de la conception à la mise en production, avec des objectifs clairs:
          moderniser les systèmes d'information, améliorer l'accès aux services en ligne, renforcer la sécurité et la conformité (RGPD)
          et optimiser la performance des plateformes.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 marker:text-gray-400">
          <li><span className="font-medium">Conception & développement</span>: définition des solutions, réalisation de fonctionnalités, intégration d'APIs REST/GraphQL, et tests.</li>
          <li><span className="font-medium">Applications web</span>: front-end et back-end, performance, accessibilité.</li>
          <li><span className="font-medium">Applications mobiles</span>: contribution aux features et optimisation de l'expérience utilisateur.</li>
          <li><span className="font-medium">Logiciels & outillage</span>: outils internes et scripts d'automatisation.</li>
          <li><span className="font-medium">Collaboration</span>: ateliers métiers, réunions de cadrage, démos, suivi d'avancement (Scrum/Kanban).</li>
          <li><span className="font-medium">Qualité & CI/CD</span>: revues de code, automatisation des tests, intégration continue, bonnes pratiques de sécurité.</li>
          <li><span className="font-medium">R&D</span>: veille technologique, POC/prototypage pour accélérer et sécuriser les choix.
          </li>
          <li><span className="font-medium">Formations & certifications</span>: parcours continus (ex. AWS) pour renforcer les compétences cloud et sécurité.</li>
        </ul>
      </div>

      {/* Compétences clés */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">Compétences & intérêts</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 marker:text-gray-400">
          <li> <span className="font-medium">Développement web</span>: conception d'APIs, intégration front/back, bases de données SQL.</li>
          <li> <span className="font-medium">Bonnes pratiques</span>: tests, sécurité, performance, documentation, accessibilité.</li>
          <li> <span className="font-medium">Outils & méthodes</span>: Git, revues de code, intégration continue, méthodologies agiles.</li>
          <li> <span className="font-medium">Soft skills</span>: communication, rigueur, sens du service public, curiosité technique.</li>
        </ul>
      </div>
    </div>
  </Layout>
);

export default About;
