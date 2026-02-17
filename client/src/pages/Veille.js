import React, { useEffect, useState } from 'react';
import { fetchVeille } from '../api/veille';
import VeilleCard from '../components/VeilleCard';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';

const Veille = () => {
  const [veille, setVeille] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVeille()
      .then(data => setVeille(data))
      .catch(() => setError('Erreur lors du chargement de la veille'))
      .finally(() => setLoading(false));
  }, []);

  // Filtrer les veilles par catégorie
  const veilleAutomatique = veille.filter(v => v.category === 'automatique');
  const veilleForum = veille.filter(v => v.category === 'forum');

  return (
    <Layout containerSize="default">
      <PageTitle title="Veille technologique" />
      {loading && <div className="text-gray-500">Chargement...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && veille.length === 0 && (
        <div className="text-gray-500">Aucune veille à afficher.</div>
      )}
      
      {!loading && !error && veille.length > 0 && (
        <>
          {/* Section Veille Automatique */}
          {veilleAutomatique.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Veille automatique</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Newsletters, flux RSS, alertes et outils d'agrégation pour rester informé des dernières actualités technologiques.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {veilleAutomatique.map((v) => (
                  <VeilleCard key={v.id} veille={v} />
                ))}
              </div>
            </section>
          )}

          {/* Section Forums et Communautés */}
          {veilleForum.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Forums et communautés</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Discord, forums techniques, communautés et plateformes d'échange pour partager et apprendre avec d'autres développeurs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
