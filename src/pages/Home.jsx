import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../lib/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home(){
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    async function load(){
      // Ask server for 8 latest
      const res = await api.get('/products', { params: { limit: 8 } })
      setFeatured(res.data)
    }
    load()
  }, [])

  async function add(p){
    try{
      await api.post('/cart', { productId: p._id, quantity: 1 })
      alert('Added to cart')
    }catch(e){
      if (e.response?.status === 401) alert('Please login to add to cart')
      else alert(e.response?.data?.message || 'Error')
    }
  }

  return (
    <section>
      {/* Hero */}
      <div className="rounded-3xl p-10 md:p-16 shadow-soft bg-gradient-to-br from-skyblue via-babypink to-mellowyellow text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2" style={{color:'#111827'}}>Welcome To Noirong</h1>
        <p className="text-gray-800">Modern & lively decor, showpieces, furniture and paintings.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/products" className="btn">Shop Now</Link>
          <Link to="/faq" className="btn">FAQs</Link>
        </div>
      </div>

      {/* Categories CTA */}
      <h2 className="text-2xl font-bold mt-8 mb-3">Browse by Category</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Home decor', copy: 'Coziness in every corner.' },
          { name: 'Showpiece', copy: 'Pieces that speak.' },
          { name: 'Furniture', copy: 'Form meets function.' },
          { name: 'Paints', copy: 'Art with heart.' },
        ].map(c => (
          <Link key={c.name} to={`/products?category=${encodeURIComponent(c.name)}`} className="card hover:-translate-y-0.5 transition">
            <h3 className="font-semibold mb-1">{c.name}</h3>
            <p className="text-sm text-gray-600">{c.copy}</p>
          </Link>
        ))}
      </div>

      {/* Featured */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured</h2>
        <Link to="/products" className="link-hover">View all</Link>
      </div>
      {featured.length === 0 ? (
        <p className="text-sm text-gray-500">Loading featured products...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          {featured.map(p => <ProductCard key={p._id} p={p} onAdd={add} />)}
        </div>
      )}
    </section>
  )
}
