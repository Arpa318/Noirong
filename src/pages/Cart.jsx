import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api.js'

export default function Cart(){
  const [data, setData] = useState({ items: [], total: 0 })

  async function load(){
    try{
      const res = await api.get('/cart')
      setData(res.data)
    }catch(e){
      if (e.response?.status === 401) {
        alert('Please login to view your cart')
      }
    }
  }
  useEffect(()=>{ load() }, [])

  async function changeQty(pid, qty){
    await api.patch(`/cart/${pid}`, { quantity: qty })
    load()
  }
  async function remove(pid){
    await api.delete(`/cart/${pid}`)
    load()
  }

  if (!data.items || data.items.length === 0) {
    return <p>Your cart is empty. <Link to="/products" className="link-hover">Shop now</Link></p>
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Your Cart</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          {data.items.map(({product, quantity, subtotal}) => (
            <div key={product._id} className="card flex items-center gap-4">
              <img src={product.image} className="w-20 h-20 rounded-xl object-cover"/>
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
              </div>
              <input type="number" min="1" value={quantity} onChange={e=>changeQty(product._id, Number(e.target.value))} className="w-20 bg-softgrey rounded px-3 py-2"/>
              <button className="btn" onClick={()=>remove(product._id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="card h-fit">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="badge">${data.total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="mt-3 btn w-full text-center">Proceed to Checkout</Link>
        </div>
      </div>
    </section>
  )
}
