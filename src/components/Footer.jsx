import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="mt-10 bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Noirong</h3>
          <p className="text-sm text-gray-600">Cool, lively home style. Welcome To Noirong.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link className="link-hover" to="/">Home</Link></li>
            <li><Link className="link-hover" to="/products">Shop</Link></li>
            <li><Link className="link-hover" to="/cart">Cart</Link></li>
            <li><Link className="link-hover" to="/orders">Orders</Link></li>
            <li><Link className="link-hover" to="/checkout">Checkout</Link></li>
            <li><Link className="link-hover" to="/faq">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-600">support@noirong.example</p>
          <p className="text-xs text-gray-500 mt-2">© {new Date().getFullYear()} Noirong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
