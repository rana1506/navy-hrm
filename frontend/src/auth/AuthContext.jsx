import React, { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../api';

const Ctx = createContext();
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) return setLoading(false);
    API.get('/users/me').then(r=>{ setUser(r.data); }).finally(()=>setLoading(false));
  },[]);

  const login = async (email, password) => {
    const r = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', r.data.token);
    setUser(r.data.user);
  };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  const value = { user, setUser, login, logout };
  if (loading) return <div className="container">Loading...</div>
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
