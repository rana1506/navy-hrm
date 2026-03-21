import React, { useEffect, useState } from 'react'
import { API } from '../api'

export default function DivisionDashboard(){
  const [divs, setDivs] = useState([])
  const [selected, setSelected] = useState('')
  const [data, setData] = useState(null)

  useEffect(()=>{ API.get('/divisions').then(r=>setDivs(r.data)) },[])
  useEffect(()=>{ if(selected) API.get(`/dashboards/division/${selected}`).then(r=>setData(r.data)) },[selected])

  return (
    <div>
      <h2>Division Dashboard</h2>
      <select className="input" value={selected} onChange={e=>setSelected(e.target.value)}>
        <option value="">Select Division</option>
        {divs.map(d=> <option key={d._id} value={d._id}>{d.name}</option>)}
      </select>
      {data && (
        <div className="card">
          <h3>{data.division.name} — DO: {data.division.divisionalOfficer?.name || '—'}</h3>
          <p>Sailors: <b>{data.sailorCount}</b></p>
          <h4>Requests</h4>
          <ul>
            {data.requests.map(r=> <li key={r._id}>{r.type} — {r.title} [{r.status}]</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
