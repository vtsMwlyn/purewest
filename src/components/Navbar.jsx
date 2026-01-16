import { Box } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
	return (
		<>
			<nav className="w-full bg-black text-white flex justify-center fixed top-0 z-999">
				<div className="w-11/12 xl:w-5/6 grid grid-cols-8">
					<Link to="/shop" className="w-full h-full hover:bg-yellow-400 uppercase flex justify-center items-center transition">Shop</Link>
					<Link to="/about-us" className="w-full h-full hover:bg-yellow-400 uppercase flex justify-center items-center transition">About</Link>
					<Link to="/health" className="w-full h-full hover:bg-yellow-400 uppercase flex justify-center items-center transition">Health</Link>
					<Link to="/" className="hover:bg-yellow-400 gap-2 col-span-2 flex justify-center items-center transition">
						<img src="/logo.webp" className="w-30"/>
					</Link>
					<Link to="/research" className="w-full h-full hover:bg-yellow-400 uppercase flex justify-center items-center transition">Research</Link>
					<Link to="/contact-us" className="w-full h-full hover:bg-yellow-400 uppercase flex justify-center items-center transition">Contact Us</Link>
					<Link to="/cart" className="w-full h-full hover:bg-yellow-400 uppercase flex justify-center items-center transition">Cart</Link>
				</div>
			</nav>
		</>
	)
}