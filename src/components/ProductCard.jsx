import { Link } from 'react-router-dom'

export default function ProductCard({ p, onAdd }){
  return (
    <div className="card group">
      <Link to={`/product/${p.slug}`}>
        <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-xl mb-3 group-hover:scale-[1.02] transition"/>
      </Link>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-gray-500">{p.category}</p>
        </div>
        <span className="badge">${p.price.toFixed(2)}</span>
      </div>
      <button className="mt-3 btn w-full" onClick={()=>onAdd(p)}>Add to Cart</button>
    </div>
  )
}
