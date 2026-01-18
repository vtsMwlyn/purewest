import { Menu } from "lucide-react"
import { useState } from "react";
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"

function NavbarLink({ to = '/', className, children }) {
	return (
		<NavLink to={to} className={({ isActive }) => `${isActive ? 'decoration-yellow-500' : 'decoration-transparent'} underline decoration-4 underline-offset-8 w-full h-full hover:bg-yellow-400 uppercase hidden xl:flex justify-center items-center transition ${className}`}>{children}</NavLink>
	)
}

export default function Navbar({ cart }) {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<>
			<nav className="w-full bg-black text-white flex justify-center fixed top-0 z-999">
				<div className="w-11/12 xl:w-5/6 flex justify-between items-center xl:grid xl:grid-cols-8">
					<NavbarLink to="/">Home</NavbarLink>
					<NavbarLink to="/shop">Shop</NavbarLink>
					<NavbarLink to="/about-us">About</NavbarLink>
					<div className="col-span-2 flex justify-center items-center"><img src="/logo.webp" className="w-20 xl:w-30" /></div>
					<NavbarLink to="/blog">Blog</NavbarLink>
					<NavbarLink to="/contact-us">Contact</NavbarLink>
					<NavbarLink to="/cart" className="relative">
						<p>Cart</p>
						{cart.length > 0 && (
							<div className="rounded-full w-6 h-6 flex items-center justify-center bg-red-500 absolute top-2 right-10 text-white text-xs">{cart.length}</div>
						)}
					</NavbarLink>
					
					<div className="block xl:hidden">
						<button type="button" onClick={() => setShowDropdown(!showDropdown)}><Menu /></button>
						<div className={`w-full bg-black p-4 absolute top-12 left-0 gap-4 ${showDropdown ? 'grid' : 'hidden'}`}>
							<Link onClick={() => setShowDropdown(false)} to="/">Home</Link>
							<div className="h-px bg-white w-full"></div>
							<Link onClick={() => setShowDropdown(false)} to="/shop">Shop</Link>
							<div className="h-px bg-white w-full"></div>
							<Link onClick={() => setShowDropdown(false)} to="/about-us">About Us</Link>
							<div className="h-px bg-white w-full"></div>
							<Link onClick={() => setShowDropdown(false)} to="/blog">Blog</Link>
							<div className="h-px bg-white w-full"></div>
							<Link onClick={() => setShowDropdown(false)} to="/contact-us">Contact Us</Link>
							<div className="h-px bg-white w-full"></div>
							<Link onClick={() => setShowDropdown(false)} to="/cart" className="flex items-center gap-2">Cart {cart.length > 0 && (
							<div className="rounded-full w-6 h-6 flex items-center justify-center bg-red-500 right-10 text-white text-xs">{cart.length}</div>
						)}</Link>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}