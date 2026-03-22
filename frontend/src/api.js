import axios from 'axios';

export const API = axios.create({ baseURL: `https://${window.location.hostname.replace('-5173', '-5000')}/api` });

API.interceptors.request.use(cfg => {console.log('API Request:', cfg.method.toUpperCase(), cfg.url, cfg.data || '');  
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
