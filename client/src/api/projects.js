import axios from 'axios';

const API_URL = '/portfolio-fdme/server/api'; // Utilise le proxy CRA en dev

export const fetchProjects = async () => {
  const res = await axios.get(`${API_URL}/get_projects.php`);
  return res.data;
};

// Ajoute ici d'autres fonctions pour le CRUD admin si besoin
