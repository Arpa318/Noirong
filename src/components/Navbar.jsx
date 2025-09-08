import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useDebounce from '../lib/useDebounce.js'

export default function Navbar(){
  const [q, setQ] = useState('')
  const debounced = useDebounce(q, 300)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    if (location.pathname.startsWith('/products')){
      const params = new URLSearchParams(window.location.search)
      if (debounced) params.set('q', debounced); else params.delete('q')
      navigate(`/products?${params.toString()}`)
    }
  }, [debounced])

  const token = localStorage.getItem('token')
  const name = localStorage.getItem('name')

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="font-extrabold text-xl"
          style={{background: 'linear-gradient(90deg, var(--brand-purple), var(--brand-pink))', WebkitBackgroundClip:'text', color:'transparent'}}>
          Noirong
        </Link>
        <nav className="ml-6 hidden sm:flex gap-4">
          <Link className="link-hover" to="/products">Shop</Link>
          <Link className="link-hover" to="/orders">Orders</Link>
          <Link className="link-hover" to="/faq">FAQs</Link>
        </nav>
        <div className="flex-1"></div>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search in real-time..."
          className="w-56 sm:w-72 bg-softgrey rounded-full px-4 py-2 outline-none focus:ring-2 ring-purple"
        />
        <Link to="/cart" className="ml-3 btn">Cart</Link>
        {token ? (
          <button className="ml-2 btn" onClick={()=>{ localStorage.clear(); window.location.href='/' }}>
            {name ? `Hi, ${name.split(' ')[0]}` : 'Logout'}
          </button>
        ) : (
          <>
            <Link to="/login" className="ml-2 btn">Login</Link>
            <Link to="/register" className="ml-2 btn">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
