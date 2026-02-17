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
  const [activeTab, setActiveTab] = useState('projets');

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

  const tabs = [
    { id: 'projets', label: 'Projets', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    )},
    { id: 'veille', label: 'Veille', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )}
  ];

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
            <PageTitle title="Administration" className="mb-0" />
            <p className="text-gray-600 dark:text-gray-400 mt-1">Gérez vos projets et votre veille technologique</p>
          </div>
          <Button onClick={logout} variant="ghost">Déconnexion</Button>
        </div>
        
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex gap-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'projets' && <ProjectsAdmin />}
          {activeTab === 'veille' && <VeilleAdmin />}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
