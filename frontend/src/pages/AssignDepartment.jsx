import React, { useEffect, useState } from 'react'
import { API } from '../api'

export default function AssignDepartment(){
  const [deps, setDeps] = useState([])
  const [sailors, setSailors] = useState([])
  const [sel, setSel] = useState({ userId:'', departmentId:'' })

  const load = async ()=>{
    const d = await API.get('/departments'); setDeps(d.data)
    const u = await API.get('/users');
    const onlySailors = u.data.filter(x=> (x.roles||[]).includes('SAILOR'))
    setSailors(onlySailors)
  }
  useEffect(()=>{ load() },[])

  const assign = async ()=>{ await API.post('/departments/assign', sel); alert('Assigned'); }

  return (
    <div>
      <h2>Assign Department (RO)</h2>
      <div className="card">
        <label>Sailor</label>
        <select className="input" value={sel.userId} onChange={e=>setSel({...sel, userId:e.target.value})}>
          <option value="">Select Sailor</option>
          {sailors.map(s=> <option key={s._id} value={s._id}>{s.name} — {s.serviceNo}</option>)}
        </select>
        <label>Department</label>
        <select className="input" value={sel.departmentId} onChange={e=>setSel({...sel, departmentId:e.target.value})}>
          <option value="">Select Department</option>
          {deps.map(d=> <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <button className="btn" onClick={assign}>Assign</button>
      </div>
    </div>
  )
}
