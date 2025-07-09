import axios from 'axios';

const API_URL = 'http://localhost/portfolio-fdme/server/api'; // Adapter selon ton hébergement

export const fetchVeille = async () => {
  const res = await axios.get(`${API_URL}/get_veille.php`);
  return res.data;
};
