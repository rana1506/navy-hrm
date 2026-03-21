import React, { useEffect, useState } from 'react'
import { API } from '../api'

export default function DepartmentDashboard(){
  const [departments, setDepartments] = useState([])
  const [selected, setSelected] = useState('')
  const [data, setData] = useState(null)

  useEffect(()=>{ API.get('/departments').then(r=>setDepartments(r.data)) },[])
  useEffect(()=>{ if(selected) API.get(`/dashboards/department/${selected}`).then(r=>setData(r.data)) },[selected])

  return (
    <div>
      <h2>Department Dashboard</h2>
      <select className="input" value={selected} onChange={e=>setSelected(e.target.value)}>
        <option value="">Select Department</option>
        {departments.map(d=> <option key={d._id} value={d._id}>{d.name}</option>)}
      </select>
      {data && (
        <div className="card">
          <h3>{data.department.name}</h3>
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
