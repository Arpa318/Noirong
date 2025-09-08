import { useEffect, useState } from 'react'
import api from '../lib/api.js'

export default function Checkout(){
  const [data, setData] = useState({ items: [], total: 0 })
  const [number, setNumber] = useState('')

  useEffect(()=>{
    async function load(){
      const res = await api.get('/cart')
      setData(res.data)
    }
    load()
  }, [])

  async function pay(e){
    e.preventDefault()
    try{
      const res = await api.post('/checkout', { number })
      alert(`Payment Successful! Order ID: ${res.data.orderId}`)
      window.location.href = '/'
    }catch(e){
      alert(e.response?.data?.message || 'Error')
    }
  }

  return (
    <section className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-3">Checkout</h2>
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <span>Items</span>
          <span className="badge">${data.total.toFixed(2)}</span>
        </div>
        <form onSubmit={pay}>
          <label className="block text-sm mb-1">Payment Number (digits only)</label>
          <input required value={number} onChange={e=>setNumber(e.target.value)} className="w-full bg-softgrey rounded px-3 py-2" placeholder="e.g. 017XXXXXXXX" />
          <button className="mt-3 btn w-full">Pay Now</button>
        </form>
      </div>
    </section>
  )
}
