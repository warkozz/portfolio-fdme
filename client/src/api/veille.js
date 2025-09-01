import axios from 'axios';
import API_BASE from './config';

const API_URL = API_BASE; // Centralisé via config.js

export const fetchVeille = async () => {
  const res = await axios.get(`${API_URL}/get_veille.php`);
  return res.data;
};
