import React, { useEffect, useState } from 'react'
import { API } from '../api'
import { useAuth } from '../auth/AuthContext'

export default function Requests(){
  const { user } = useAuth()
  const [list, setList] = useState([])
  const [form, setForm] = useState({ type:'leave', title:'', details:'', fromDate:'', toDate:'', onBehalfOf:'' })

  const load = ()=> API.get('/requests/mine').then(r=>setList(r.data))
  useEffect(()=>{ load() },[])

  const submit = async ()=>{ await API.post('/requests', form); setForm({ type:'leave', title:'', details:'', fromDate:'', toDate:'', onBehalfOf:'' }); load(); }

  const decide = async (id, status)=>{ await API.post(`/requests/${id}/decision`, { status }); load(); }

  const isDO = (user.roles||[]).includes('DO')

  return (
    <div>
      <h2>Requests</h2>
      <div className="card">
        <h3>New Request</h3>
        <div className="grid">
          <div>
            <label>Type</label>
            <select className="input" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
              <option value="leave">Leave</option>
              <option value="welfare">Welfare</option>
              <option value="general">General</option>
            </select>
          </div>
          <div>
            <label>Title</label>
            <input className="input" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
          </div>
          <div>
            <label>From</label>
            <input className="input" type="date" value={form.fromDate} onChange={e=>setForm({...form, fromDate:e.target.value})}/>
          </div>
          <div>
            <label>To</label>
            <input className="input" type="date" value={form.toDate} onChange={e=>setForm({...form, toDate:e.target.value})}/>
          </div>
          {isDO && (
            <div>
              <label>On Behalf Of (Sailor ID)</label>
              <input className="input" value={form.onBehalfOf} onChange={e=>setForm({...form, onBehalfOf:e.target.value})} placeholder="Paste Sailor ObjectId"/>
            </div>
          )}
        </div>
        <label>Details</label>
        <textarea className="input" rows={4} value={form.details} onChange={e=>setForm({...form, details:e.target.value})}></textarea>
        <button className="btn" onClick={submit}>Submit</button>
      </div>

      <div className="card">
        <h3>My & Division Requests</h3>
        <table className="table"><thead><tr><th>Type</th><th>Title</th><th>Status</th><th>From</th><th>To</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(r=> (
            <tr key={r._id}>
              <td>{r.type}</td>
              <td>{r.title}</td>
              <td>{r.status}</td>
              <td>{r.fromDate?new Date(r.fromDate).toLocaleDateString():''}</td>
              <td>{r.toDate?new Date(r.toDate).toLocaleDateString():''}</td>
              <td>
                {isDO && r.status==='submitted' && (
                  <>
                    <button className="btn" onClick={()=>decide(r._id,'approved')}>Approve</button>{' '}
                    <button className="btn" onClick={()=>decide(r._id,'rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody></table>
      </div>
    </div>
  )
}
