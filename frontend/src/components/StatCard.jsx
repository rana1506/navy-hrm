import React from 'react';
export default function StatCard({ title, value, hint, color='#3ea0ff' }){
  return (
    <div className="card" style={{ borderLeft: `4px solid ${color}`}}>
      <div style={{ fontSize: 12, color: '#96a0c8' }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      {hint && <div style={{ fontSize: 12, color: '#96a0c8' }}>{hint}</div>}
    </div>
  )
}
