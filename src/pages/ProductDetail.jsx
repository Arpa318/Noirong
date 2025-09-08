import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api.js'

export default function ProductDetail(){
  const { slug } = useParams()
  const [p, setP] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(()=>{
    async function load(){
      const res = await api.get(`/products/${slug}`)
      setP(res.data)
    }
    load()
  }, [slug])

  if (!p) return <p>Loading...</p>

  async function add(){
    try{
      await api.post('/cart', { productId: p._id, quantity: 1 })
      alert('Added to cart')
    }catch(e){
      if (e.response?.status === 401) alert('Please login to add to cart')
      else alert(e.response?.data?.message || 'Error')
    }
  }

  async function submitReview(e){
    e.preventDefault()
    try{
      await api.post(`/products/${p._id}/reviews`, { rating, comment })
      const next = await api.get(`/products/${slug}`)
      setP(next.data)
      setComment('')
      alert('Review added')
    }catch(e){
      alert(e.response?.data?.message || 'Error')
    }
  }

  return (
    <section className="grid md:grid-cols-2 gap-6">
      <img src={p.image} alt={p.name} className="w-full rounded-2xl shadow-soft"/>
      <div>
        <h2 className="text-3xl font-extrabold">{p.name}</h2>
        <p className="text-gray-500">{p.category}</p>
        <p className="mt-3">{p.description}</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="badge text-sm">${p.price.toFixed(2)}</span>
          <span className="text-sm text-gray-600">{p.numReviews} reviews • {p.rating.toFixed(1)}★</span>
        </div>
        <button className="mt-4 btn" onClick={add}>Add to Cart</button>

        <div className="mt-8">
          <h3 className="font-bold mb-2">Reviews</h3>
          {p.reviews.length === 0 ? <p className="text-sm text-gray-500">No reviews yet.</p> : (
            <ul className="space-y-3">
              {p.reviews.slice().reverse().map((r) => (
                <li key={r._id} className="card">
                  <div className="text-sm text-gray-600">{new Date(r.createdAt).toLocaleString()}</div>
                  <div className="font-semibold">{r.name} • {r.rating}★</div>
                  <p>{r.comment}</p>
                </li>
              ))}
            </ul>
          )}
          <form className="card mt-4" onSubmit={submitReview}>
            <h4 className="font-semibold mb-2">Add a review</h4>
            <label className="block text-sm mb-1">Rating</label>
            <select value={rating} onChange={e=>setRating(Number(e.target.value))} className="bg-softgrey rounded px-3 py-2">
              {[5,4,3,2,1].map(v=>(<option key={v} value={v}>{v}</option>))}
            </select>
            <label className="block text-sm mt-3 mb-1">Comment</label>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} required className="w-full bg-softgrey rounded px-3 py-2" />
            <button className="mt-3 btn">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}
