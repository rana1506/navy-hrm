import React, { useEffect, useState } from 'react'
import { API } from '../api'

export default function AdminPanel(){
  const [roles, setRoles] = useState([])
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])

  const load = ()=>{
    API.get('/roles').then(r=>setRoles(r.data))
    API.get('/users').then(r=>setUsers(r.data))
  }
  useEffect(()=>{ load() },[])

  const addRole = async ()=>{
    await API.post('/roles', { name }); setName(''); load();
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <div className="grid">
        <div className="card">
          <h3>System Roles</h3>
          <ul>{roles.map(r=> <li key={r._id}>{r.name}</li>)}</ul>
          <div style={{display:'flex', gap:8}}>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Add role" />
            <button className="btn" onClick={addRole}>Add</button>
          </div>
        </div>
        <div className="card">
          <h3>All Users</h3>
          <table className="table"><thead><tr><th>Name</th><th>Service No</th><th>Rank</th><th>Roles</th><th>Status</th></tr></thead>
          <tbody>
            {users.map(u=> <tr key={u._id}><td>{u.name}</td><td>{u.serviceNo}</td><td>{u.rank}</td><td>{(u.roles||[]).join(',')}</td><td>{u.status}</td></tr>)}
          </tbody></table>
        </div>
      </div>
    </div>
  )
}
