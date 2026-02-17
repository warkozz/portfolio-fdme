import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProjectForm from './AddProjectForm';
import EditProjectForm from './EditProjectForm';

const API_URL = '/portfolio-fdme/server/api';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/get_all_projects.php`, { withCredentials: true });
      console.log("✅ Projets chargés:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.error("❌ Erreur chargement projets:", err);
      setError('Erreur chargement projets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;

    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;

      console.log("🔍 Données envoyées à PHP:", { id, csrf_token });

      const body = new URLSearchParams();
      body.append('id', String(id));
      body.append('csrf_token', csrf_token);

      const res = await axios.post(
        `${API_URL}/delete_project.php`,
        body,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      console.log("✅ Suppression OK:", res.data);
      fetchAll();
    } catch (error) {
      if (error.response) {
        console.error("❌ Erreur suppression (status):", error.response.status);
        console.error("❌ Erreur suppression (data):", error.response.data);
        alert("Erreur suppression: " + JSON.stringify(error.response.data));
      } else {
        console.error("❌ Erreur suppression (message):", error.message);
        alert("Erreur suppression: " + error.message);
      }
    }
  };

  const handleToggle = async (id, visible) => {
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;

      const body = new URLSearchParams();
      body.append('id', String(id));
      body.append('visible', String(visible ? 0 : 1));
      body.append('csrf_token', csrf_token);

      const res = await axios.post(
        `${API_URL}/toggle_visibility.php`,
        body,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      console.log("✅ Toggle visibilité:", res.data);
      fetchAll();
    } catch (err) {
      console.error("❌ Erreur toggle:", err.response?.data || err.message);
    }
  };

  if (loading) return <div>Chargement projets...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Gestion des projets</h2>
      <AddProjectForm onAdded={fetchAll} />
      <ul>
        {projects.map(p => (
          <li key={p.id} className="mb-2 border-b pb-2">
            {editId === p.id ? (
              <EditProjectForm
                project={p}
                onUpdated={() => { setEditId(null); fetchAll(); }}
                onCancel={() => setEditId(null)}
              />
            ) : (
              <>
                <span className="font-semibold">{p.title}</span> — {p.visible ? 'Visible' : 'Caché'}
                <button onClick={() => setEditId(p.id)} className="ml-2 text-blue-600">Éditer</button>
                <button onClick={() => handleDelete(p.id)} className="ml-2 text-red-600">Supprimer</button>
                <button onClick={() => handleToggle(p.id, p.visible)} className="ml-2 text-yellow-600">
                  {p.visible ? 'Cacher' : 'Afficher'}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsAdmin;
