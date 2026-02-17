import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
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
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
          <PageTitle title="Admin - Connexion" className="mb-4" />
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit">Se connecter</Button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout containerSize="default">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <PageTitle title="AdminPanel" className="mb-0" />
            <p className="text-gray-700 dark:text-gray-300">Bienvenue, vous êtes connecté en tant qu'admin.</p>
          </div>
          <Button onClick={logout} variant="ghost">Déconnexion</Button>
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
