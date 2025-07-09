import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddVeilleForm from './AddVeilleForm';
import EditVeilleForm from './EditVeilleForm';

const API_URL = 'http://localhost/portfolio-fdme/server/api';

const VeilleAdmin = () => {
  const [veille, setVeille] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const veilleToEdit = veille.find(v => v.id === editId);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/get_all_veille.php`, { withCredentials: true });
      setVeille(res.data);
    } catch {
      setError('Erreur chargement veille');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette veille ?')) return;
    const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
    const csrf_token = csrfRes.data.csrf_token;
    await axios.post(`${API_URL}/delete_veille.php`, { id, csrf_token }, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    fetchAll();
  };

  // Pour la démo, juste affichage, CRUD à compléter
  if (loading) return <div>Chargement veille...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Gestion de la veille</h2>
      <AddVeilleForm onAdded={fetchAll} />
      <ul>
        {veille.map(v => (
          <li key={v.id} className="mb-2 border-b pb-2">
            {editId === v.id ? (
              <EditVeilleForm veille={v} onUpdated={() => { setEditId(null); fetchAll(); }} onCancel={() => setEditId(null)} />
            ) : (
              <>
                <span className="font-semibold">{v.title}</span> — {v.visible ? 'Visible' : 'Caché'}
                <button onClick={() => setEditId(v.id)} className="ml-2 text-blue-600">Éditer</button>
                <button onClick={() => handleDelete(v.id)} className="ml-2 text-red-600">Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VeilleAdmin;
