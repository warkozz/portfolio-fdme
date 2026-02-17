import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ProjectsAdmin from '../components/admin/ProjectsAdmin';
import VeilleAdmin from '../components/admin/VeilleAdmin';
import { useAuth } from '../context/AuthContext';

const API_URL = '/portfolio-fdme/server/api';

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
      const body = new URLSearchParams();
      body.append('email', email);
      body.append('password', password);
      body.append('csrf_token', csrf_token);
      await axios.post(`${API_URL}/login.php`, body, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setLoggedIn(true);
      setIsAdmin(true);
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  if (loading) return <Layout><div className="text-gray-500">Chargement...</div></Layout>;
  if (!isAdmin && !loggedIn) {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Admin - Connexion</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium self-start">Se connecter</button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AdminPanel</h1>
            <p className="text-gray-700 dark:text-gray-300">Bienvenue, vous êtes connecté en tant qu'admin.</p>
          </div>
          <button onClick={logout} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Déconnexion</button>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
            <ProjectsAdmin />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
            <VeilleAdmin />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
