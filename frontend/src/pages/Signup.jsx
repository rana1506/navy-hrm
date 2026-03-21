import React, { useState } from 'react'
import { API } from '../api'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
  const [form, setForm] = useState({ userType:'sailor', name:'', email:'', password:'', rank:'Seaman', serviceNo:'' })
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const ranks = {
    officer: ['Midshipman','Sub-Lieutenant','Lieutenant','Lieutenant Commander','Commander','Captain'],
    sailor: ['Seaman Recruit','Seaman Apprentice','Seaman','Petty Officer','Chief Petty Officer','Master Chief Petty Officer']
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const r = await API.post('/auth/signup', form)
      setMsg(r.data.message)
      setErr('')
      setTimeout(()=> nav('/login'), 1200)
    }catch(e){ setErr(e.response?.data?.message||'Signup failed') }
  }

  return (
    <div className="card" style={{maxWidth:600, margin:'2rem auto'}}>
      <h2>Signup</h2>
      {msg && <div style={{color:'#22c55e'}}>{msg}</div>}
      {err && <div style={{color:'#ef4444'}}>{err}</div>}
      <form onSubmit={onSubmit}>
        <label>User Type</label>
        <select className="input" value={form.userType} onChange={e=>setForm({...form, userType:e.target.value, rank: ranks[e.target.value][0]})}>
          <option value="officer">Officer</option>
          <option value="sailor">Sailor</option>
        </select>
        <label>Service No</label>
        <input className="input" value={form.serviceNo} onChange={e=>setForm({...form, serviceNo:e.target.value})} placeholder="e.g., SR0123"/>
        <label>Rank</label>
        <select className="input" value={form.rank} onChange={e=>setForm({...form, rank:e.target.value})}>
          {ranks[form.userType].map(r=> <option key={r} value={r}>{r}</option>)}
        </select>
        <label>Name</label>
        <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <label>Email</label>
        <input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <label>Password</label>
        <input className="input" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn" type="submit">Submit</button>
          <Link to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  )
}
