import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('admin@navy.mil')
  const [password, setPassword] = useState('Password@123')
  const [error, setError] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    try { await login(email, password); nav('/') } catch(e){ setError(e.response?.data?.message||'Login failed') }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, margin:'2rem auto'}}>
        <h2>Login</h2>
        {error && <div style={{color:'#ef4444'}}>{error}</div>}
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button className="btn" type="submit">Login</button>
            <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
