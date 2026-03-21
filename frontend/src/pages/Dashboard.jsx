import React, { useEffect, useState } from 'react'
import { API } from '../api'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'

export default function Dashboard(){
  const [data, setData] = useState(null)
  useEffect(()=>{ API.get('/dashboards/me').then(r=>setData(r.data)) },[])
  if (!data) return <div>Loading...</div>
  const { user, requests, promotions } = data
  return (
    <div>
      <div className="grid">
        <StatCard title="My Requests" value={requests.length} />
        <StatCard title="My Promotions" value={promotions.length} color="#22c55e" />
        <StatCard title="Department" value={user.department?.name || '—'} color="#fbbf24" />
        <StatCard title="Division" value={user.division?.name || '—'} color="#ef4444" />
      </div>
      <div className="card">
        <h3>My Profile</h3>
        <p><b>{user.rank} {user.name}</b> — {user.serviceNo}</p>
        <p>Roles: {user.roles.join(', ') || 'None (awaiting XO/RO)'}</p>
        <div style={{display:'flex', gap:12}}>
          <Link className="btn" to="/requests">Requests</Link>
          <Link className="btn" to="/promotions">Promotions</Link>
        </div>
      </div>
      <div className="card">
        <h3>My Recent Requests</h3>
        <table className="table">
          <thead><tr><th>Type</th><th>Title</th><th>Status</th><th>From</th><th>To</th></tr></thead>
          <tbody>
            {requests.map(r=> (
              <tr key={r._id}><td>{r.type}</td><td>{r.title}</td><td>{r.status}</td><td>{r.fromDate?new Date(r.fromDate).toLocaleDateString():''}</td><td>{r.toDate?new Date(r.toDate).toLocaleDateString():''}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
