import axios from 'axios';

const API_URL = '/portfolio-fdme/server/api'; // Utilise le proxy CRA en dev

export const fetchVeille = async () => {
  const res = await axios.get(`${API_URL}/get_veille.php`);
  return res.data;
};
