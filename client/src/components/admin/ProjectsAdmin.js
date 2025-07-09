import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProjectForm from './AddProjectForm';
import EditProjectForm from './EditProjectForm';

const API_URL = 'http://localhost/portfolio-fdme/server/api';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);

  const projectToEdit = projects.find(p => p.id === editId);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/get_all_projects.php`, { withCredentials: true });
      setProjects(res.data);
    } catch {
      setError('Erreur chargement projets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
    const csrf_token = csrfRes.data.csrf_token;
    await axios.post(`${API_URL}/delete_project.php`, { id, csrf_token }, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    fetchAll();
  };

  const handleToggle = async (id, visible) => {
    const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
    const csrf_token = csrfRes.data.csrf_token;
    await axios.post(`${API_URL}/toggle_visibility.php`, { id, visible: visible ? 0 : 1, csrf_token }, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    fetchAll();
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
              <EditProjectForm project={p} onUpdated={() => { setEditId(null); fetchAll(); }} onCancel={() => setEditId(null)} />
            ) : (
              <>
                <span className="font-semibold">{p.title}</span> — {p.visible ? 'Visible' : 'Caché'}
                <button onClick={() => setEditId(p.id)} className="ml-2 text-blue-600">Éditer</button>
                <button onClick={() => handleDelete(p.id)} className="ml-2 text-red-600">Supprimer</button>
                <button onClick={() => handleToggle(p.id, p.visible)} className="ml-2 text-yellow-600">{p.visible ? 'Cacher' : 'Afficher'}</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsAdmin;
