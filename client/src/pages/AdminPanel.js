import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ProjectsAdmin from '../components/admin/ProjectsAdmin';
import VeilleAdmin from '../components/admin/VeilleAdmin';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost/portfolio-fdme/server/api';

const AdminPanel = () => {
  const { isAdmin, setIsAdmin, loading, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const csrfRes = await axios.get(`${API_URL}/get_csrf.php`, { withCredentials: true });
      const csrf_token = csrfRes.data.csrf_token;
      await axios.post(`${API_URL}/login.php`, { email, password, csrf_token }, { withCredentials: true });
      setLoggedIn(true);
      setIsAdmin(true);
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  if (loading) return <Layout><div>Chargement...</div></Layout>;
  if (!isAdmin && !loggedIn) {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Admin - Connexion</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="border p-2" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" className="border p-2" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">Se connecter</button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">AdminPanel</h1>
        <p className="text-gray-700 dark:text-gray-300">Bienvenue, vous êtes connecté en tant qu'admin.</p>
        <div className="mt-8">
          <ProjectsAdmin />
          <div className="my-8" />
          <VeilleAdmin />
        </div>
        <button onClick={logout} className="mt-8 bg-gray-700 text-white px-4 py-2 rounded">Déconnexion</button>
      </div>
    </Layout>
  );
};

export default AdminPanel;
