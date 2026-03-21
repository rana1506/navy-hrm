import React, { useEffect, useState } from 'react'
import { API } from '../api'

export default function AssignDivision(){
  const [divs, setDivs] = useState([])
  const [sailors, setSailors] = useState([])
  const [sel, setSel] = useState({ userId:'', divisionId:'' })
  const [divSel, setDivSel] = useState({ divisionId:'', doUserId:'' })
  const [officers, setOfficers] = useState([])

  const load = async ()=>{
    const d = await API.get('/divisions'); setDivs(d.data)
    const u = await API.get('/users');
    setSailors(u.data.filter(x=> (x.roles||[]).includes('SAILOR')))
    setOfficers(u.data.filter(x=> (x.roles||[]).includes('DO')))
  }
  useEffect(()=>{ load() },[])

  const assign = async ()=>{ await API.post('/divisions/assign', sel); alert('Assigned'); }
  const setDO = async ()=>{ await API.post(`/divisions/${divSel.divisionId}/set-do`, { doUserId: divSel.doUserId }); alert('DO set') }

  return (
    <div>
      <h2>Assign Division (GO)</h2>
      <div className="card">
        <label>Sailor</label>
        <select className="input" value={sel.userId} onChange={e=>setSel({...sel, userId:e.target.value})}>
          <option value="">Select Sailor</option>
          {sailors.map(s=> <option key={s._id} value={s._id}>{s.name} — {s.serviceNo}</option>)}
        </select>
        <label>Division</label>
        <select className="input" value={sel.divisionId} onChange={e=>setSel({...sel, divisionId:e.target.value})}>
          <option value="">Select Division</option>
          {divs.map(d=> <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <button className="btn" onClick={assign}>Assign</button>
      </div>

      <div className="card">
        <h3>Set Divisional Officer</h3>
        <label>Division</label>
        <select className="input" value={divSel.divisionId} onChange={e=>setDivSel({...divSel, divisionId:e.target.value})}>
          <option value="">Select Division</option>
          {divs.map(d=> <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <label>DO Officer</label>
        <select className="input" value={divSel.doUserId} onChange={e=>setDivSel({...divSel, doUserId:e.target.value})}>
          <option value="">Select DO</option>
          {officers.map(o=> <option key={o._id} value={o._id}>{o.name} — {o.rank}</option>)}
        </select>
        <button className="btn" onClick={setDO}>Set DO</button>
      </div>
    </div>
  )
}
