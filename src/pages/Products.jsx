import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../lib/api.js'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Products(){
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('All')
  const [params] = useSearchParams()
  const q = params.get('q') || ''

  useEffect(()=>{
    async function load(){
      const res = await api.get('/products', { params: { q, category } })
      setItems(res.data)
    }
    load()
  }, [q, category])

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
      <h2 className="text-2xl font-bold mb-1">Shop</h2>
      <p className="text-gray-500 text-sm">Real-time search & category filtering</p>
      <CategoryFilter category={category} setCategory={setCategory} />
      {items.length === 0 ? <p>No results.</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(p => <ProductCard key={p._id} p={p} onAdd={add} />)}
        </div>
      )}
    </section>
  )
}
