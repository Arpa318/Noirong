// client/src/pages/Orders.jsx
import { useEffect, useState } from 'react'
import api from '../lib/api.js'
import { Link } from 'react-router-dom'

export default function Orders(){
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    async function load() {
      try{
        const res = await api.get('/orders/my')
        setOrders(res.data)
      }catch(e){
        if (e.response?.status === 401) {
          alert('Please login to view order history.')
          window.location.href = '/login'
        }
      }
    }
    load()
  }, [])

  if (!orders) return <p>Loading...</p>
  if (orders.length === 0) return <p>No orders yet. <Link to="/products" className="link-hover">Start shopping</Link></p>

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o._id} className="card">
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <div>
                <div className="font-semibold">Order #{o._id.slice(-6).toUpperCase()}</div>
                <div className="text-sm text-gray-600">
                  Placed {new Date(o.createdAt).toLocaleString()} • Status: {o.status}
                </div>
              </div>
              <div className="badge">${o.total.toFixed(2)}</div>
            </div>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2">
              {o.items.map((it, idx) => (
                <li key={idx} className="bg-softgrey rounded-xl px-3 py-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{it.name}</span>
                  <span>x{it.quantity} • ${it.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
