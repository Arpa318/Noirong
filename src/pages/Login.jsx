import { useState } from 'react'
import api from '../lib/api.js'

export default function Login(){
  const [email, setEmail] = useState('demo@noirong.test')
  const [password, setPassword] = useState('password123')

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.user.name)
      alert('Logged in!')
      window.location.href = '/'
    }catch(e){
      alert(e.response?.data?.message || 'Error')
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3">Login</h2>
      <form className="card" onSubmit={submit}>
        <label className="block text-sm mb-1">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="bg-softgrey rounded px-3 py-2 w-full" />
        <label className="block text-sm mt-3 mb-1">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="bg-softgrey rounded px-3 py-2 w-full" />
        <button className="mt-3 btn w-full">Login</button>
      </form>
    </section>
  )
}
