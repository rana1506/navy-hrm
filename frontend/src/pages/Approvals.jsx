import React, { useEffect, useState } from 'react'
import { API } from '../api'
import { useAuth } from '../auth/AuthContext'

export default function Approvals(){
  const { user } = useAuth()
  const roles = user?.roles||[]
  const [officers, setOfficers] = useState([])
  const [sailors, setSailors] = useState([])
  const [assign, setAssign] = useState({})

  const load = ()=>{
    if (roles.includes('XO')) API.get('/approvals/officers').then(r=>setOfficers(r.data))
    if (roles.includes('RO')) API.get('/approvals/sailors').then(r=>setSailors(r.data))
  }
  useEffect(()=>{ load() },[])

  const approveOfficer = async (id)=>{
    const rolesStr = assign[id]||''; const rolesArr = rolesStr.split(',').map(s=>s.trim()).filter(Boolean)
    await API.post(`/approvals/officers/${id}/approve`, { roles: rolesArr });
    load();
  }
  const approveSailor = async (id)=>{ await API.post(`/approvals/sailors/${id}/approve`); load(); }

  return (
    <div>
      <h2>Approvals</h2>
      {roles.includes('XO') && (
        <div className="card">
          <h3>Officer Signups</h3>
          <table className="table"><thead><tr><th>Name</th><th>Rank</th><th>Email</th><th>Assign Roles (comma)</th><th></th></tr></thead>
          <tbody>
            {officers.map(o=> (
              <tr key={o._id}>
                <td>{o.name}</td><td>{o.rank}</td><td>{o.email}</td>
                <td><input className="input" placeholder="e.g., GO,EO" value={assign[o._id]||''} onChange={e=>setAssign({...assign, [o._id]: e.target.value})}/></td>
                <td><button className="btn" onClick={()=>approveOfficer(o._id)}>Approve</button></td>
              </tr>
            ))}
          </tbody></table>
        </div>
      )}
      {roles.includes('RO') && (
        <div className="card">
          <h3>Sailor Signups</h3>
          <table className="table"><thead><tr><th>Name</th><th>Rank</th><th>Email</th><th></th></tr></thead>
          <tbody>
            {sailors.map(s=> (
              <tr key={s._id}>
                <td>{s.name}</td><td>{s.rank}</td><td>{s.email}</td>
                <td><button className="btn" onClick={()=>approveSailor(s._id)}>Approve</button></td>
              </tr>
            ))}
          </tbody></table>
        </div>
      )}
    </div>
  )
}
