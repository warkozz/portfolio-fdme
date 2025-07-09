import React, { useEffect, useState } from 'react';
import { fetchVeille } from '../api/veille';
import VeilleCard from '../components/VeilleCard';
import Layout from '../components/Layout';

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

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Veille technologique</h1>
      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && veille.length === 0 && (
        <div className="text-gray-500">Aucune veille à afficher.</div>
      )}
      <div className="flex flex-wrap justify-center">
        {veille.map((v) => (
          <VeilleCard key={v.id} veille={v} />
        ))}
      </div>
    </Layout>
  );
};

export default Veille;
