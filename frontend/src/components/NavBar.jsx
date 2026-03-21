import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function NavBar(){
  const { user, logout } = useAuth();
  const r = user?.roles || [];
  return (
    <div className="nav">
      <strong>Navy HRM</strong>
      <Link to="/">Dashboard</Link>
      {(r.includes('XO') || r.includes('RO')) && <Link to="/approvals">Approvals</Link>}
      {r.includes('RO') && <Link to="/assign/department">Assign Dept</Link>}
      {r.includes('GO') && <Link to="/assign/division">Assign Div</Link>}
      {(r.includes('XO')||r.includes('EO')||r.includes('LO')||r.includes('SO')||r.includes('MO')) && <Link to="/department">Department</Link>}
      {(r.includes('DO')||r.includes('GO')) && <Link to="/division">Division</Link>}
      {(r.includes('ADMIN')||r.includes('CO')) && <Link to="/admin">Admin</Link>}
      <span style={{ marginLeft: 'auto' }}>
        {user && <span className="badge">{user.rank} {user.name} ({user.roles.join(',') || 'No Role'})</span>}
      </span>
      {user ? <button className="btn" onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
    </div>
  );
}
