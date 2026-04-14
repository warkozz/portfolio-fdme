import React, { useEffect, useState } from 'react';
import { fetchVeille } from '../api/veille';
import VeilleCard from '../components/VeilleCard';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import usePageMeta from '../hooks/usePageMeta';

const TOOLS = [
  { name: 'Feedly', desc: "Agrégateur RSS — je suis les blogs officiels (React, MDN, OWASP…) pour recevoir les nouveautés automatiquement.", icon: '📰' },
  { name: 'Google Alerts', desc: "Alertes e-mail sur des mots-clés (\"React 2025\", \"faille PHP\", \"API REST sécurité\") pour ne rien manquer.", icon: '🔔' },
  { name: 'GitHub Trending', desc: "Page Trending de GitHub pour découvrir les dépôts populaires du moment par langage (JavaScript, Python…).", icon: '⭐' },
  { name: 'Stack Overflow', desc: "Lecture des discussions sur les nouveautés et bonnes pratiques, notamment les questions les plus votées.", icon: '💬' },
  { name: 'LinkedIn', desc: "Suivi des ingénieurs et entreprises du secteur pour voir les retours d'expérience et tendances professionnelles.", icon: '🔗' },
  { name: 'MDN / doc officielle', desc: "Consultation systématique des docs officielles (MDN, React.dev, PHP.net) pour valider les informations collectées.", icon: '📖' },
];

const Veille = () => {
  usePageMeta('Veille technologique', 'Ma veille technologique – articles, découvertes et ressources sur le développement web.');
  const [veille, setVeille] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVeille()
      .then(data => setVeille(data))
      .catch(() => setError('Erreur lors du chargement de la veille'))
      .finally(() => setLoading(false));
  }, []);

  const veilleAutomatique = veille.filter(v => v.category === 'automatique');
  const veilleForum = veille.filter(v => v.category === 'forum');

  return (
    <Layout containerSize="default">
      <PageTitle title="Veille technologique" />

      {/* Bloc intro : sujet + pourquoi */}
      <section className="mb-10 bg-primary-50 dark:bg-gray-800 rounded-2xl p-6 border border-primary-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">🎯 Sujet de ma veille</h2>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          J'ai choisi de faire ma veille sur le <strong>développement web moderne et la sécurité applicative</strong> — deux axes
          directement liés à mon parcours BTS SIO SLAM et à mes expériences en alternance chez Capgemini.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          En tant que développeur, je dois rester à jour sur les frameworks que j'utilise (React, PHP, Python), anticiper
          les failles de sécurité (OWASP), et comprendre les tendances du marché pour orienter ma montée en compétences.
          Cette veille est tenue depuis septembre 2025, avec une fiche publiée toutes les 2 à 3 semaines.
        </p>
      </section>

      {/* Bloc méthode / outils */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🛠️ Ma méthode de veille</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
          Pour structurer ma veille, j'utilise plusieurs sources complémentaires que je croise systématiquement avant de retenir une information :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map(tool => (
            <div key={tool.name} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex gap-3">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{tool.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {loading && <div className="text-gray-500">Chargement...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && veille.length === 0 && (
        <div className="text-gray-500">Aucune veille à afficher.</div>
      )}

      {!loading && !error && veille.length > 0 && (
        <>
          {/* Informations collectées – flux automatique */}
          {veilleAutomatique.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">🧠 Informations collectées</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Articles, nouveautés, comparaisons et analyses — résumés avec mes mots et mon avis personnel.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {veilleAutomatique.map((v) => (
                  <VeilleCard key={v.id} veille={v} />
                ))}
              </div>
            </section>
          )}

          {/* Communautés et forums */}
          {veilleForum.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">💬 Communautés & forums</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Tendances et discussions issues de la communauté développeur (Stack Overflow, GitHub, LinkedIn…).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {veilleForum.map((v) => (
                  <VeilleCard key={v.id} veille={v} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
};

export default Veille;
