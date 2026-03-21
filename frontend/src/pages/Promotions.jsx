import React, { useEffect, useState } from 'react'
import { API } from '../api'
import { useAuth } from '../auth/AuthContext'

export default function Promotions(){
  const { user } = useAuth()
  const [list, setList] = useState([])
  const [form, setForm] = useState({ sailorId:'', proposedRank:'Petty Officer', notes:'' })
  const [users, setUsers] = useState([])

  const isDO = (user.roles||[]).includes('DO')

  const load = ()=>{
    API.get('/promotions/mine').then(r=>setList(r.data))
    API.get('/users').then(r=>setUsers(r.data))
  }
  useEffect(()=>{ load() },[])

  const submit = async ()=>{ await API.post('/promotions', form); setForm({ sailorId:'', proposedRank:'Petty Officer', notes:'' }); load(); }

  const sailors = users.filter(u=> (u.roles||[]).includes('SAILOR'))

  return (
    <div>
      <h2>Promotions</h2>
      {isDO && (
        <div className="card">
          <h3>Propose Promotion (DO)</h3>
          <label>Sailor</label>
          <select className="input" value={form.sailorId} onChange={e=>setForm({...form, sailorId:e.target.value})}>
            <option value="">Select Sailor</option>
            {sailors.map(s=> <option key={s._id} value={s._id}>{s.name} — {s.rank} ({s.serviceNo})</option>)}
          </select>
          <label>Proposed Rank</label>
          <select className="input" value={form.proposedRank} onChange={e=>setForm({...form, proposedRank:e.target.value})}>
            {['Seaman Apprentice','Seaman','Petty Officer','Chief Petty Officer','Master Chief Petty Officer'].map(r=> <option key={r} value={r}>{r}</option>)}
          </select>
          <label>Notes</label>
          <textarea className="input" rows={3} value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}></textarea>
          <button className="btn" onClick={submit}>Submit</button>
        </div>
      )}

      <div className="card">
        <h3>My Promotions</h3>
        <ul>
          {list.map(p=> <li key={p._id}><b>{p.proposedRank}</b> — {p.status} {p.sailor ? `for ${p.sailor.name}` : ''}</li>)}
        </ul>
      </div>
    </div>
  )
}
