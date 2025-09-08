import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <section className="text-center">
      <h2 className="text-3xl font-extrabold mb-2">Page not found</h2>
      <Link to="/" className="btn">Back Home</Link>
    </section>
  )
}
