import { useEffect, useState } from 'react'
import api from '../lib/api.js'

export default function FAQ(){
  const [faqs, setFaqs] = useState([])
  useEffect(()=>{
    api.get('/faqs').then(res => setFaqs(res.data))
  }, [])
  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-3">FAQs</h2>
      <div className="space-y-3">
        {faqs.map((f, i)=>(
          <details key={i} className="card">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-gray-700">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
