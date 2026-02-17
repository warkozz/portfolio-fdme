import axios from 'axios';
import API_BASE from './config';

const API_URL = API_BASE; // Centralisé via config.js

export const fetchProjects = async () => {
  const res = await axios.get(`${API_URL}/get_projects.php`);
  return res.data;
};

// Ajoute ici d'autres fonctions pour le CRUD admin si besoin
