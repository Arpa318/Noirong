import { useState } from 'react'
import api from '../lib/api.js'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.user.name)
      alert('Registered!')
      window.location.href = '/'
    }catch(e){
      alert(e.response?.data?.message || 'Error')
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3">Create your account</h2>
      <form className="card" onSubmit={submit}>
        <label className="block text-sm mb-1">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="bg-softgrey rounded px-3 py-2 w-full" required />
        <label className="block text-sm mt-3 mb-1">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="bg-softgrey rounded px-3 py-2 w-full" required />
        <label className="block text-sm mt-3 mb-1">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="bg-softgrey rounded px-3 py-2 w-full" required />
        <button className="mt-3 btn w-full">Create account</button>
      </form>
    </section>
  )
}
