import { Link } from "react-router-dom"

export default function Footer() {
	return (
		<>
			<footer className="flex flex-col items-center bg-gray-950 text-white py-10 xl:py-20">
				<div className="w-11/12 xl:w-5/6 flex flex-col">
					<div className="grid grid-cols-1 xl:grid-cols-4 gap-10 xl:gap-20">
						<div className="flex flex-col">
							<h1 className="font-bold text-2xl text-yellow-500 mb-4">Follow Us</h1>
							<p>Discover the Power of Wellness with Purewest Australia on Social Media.</p>
							<div className="flex items-center gap-4">
								<a href="https://web.facebook.com/profile.php?id=61563743532875" target="_blank"><i className="bi bi-facebook text-2xl"></i></a>
								<a href="https://www.instagram.com/purewestph/" target="_blank"><i className="bi bi-instagram text-2xl"></i></a>
							</div>
						</div>

						<div className="flex flex-col">
							<h1 className="font-bold text-2xl text-yellow-500 mb-4">Contact</h1>
							<a href="/" target="_blank">123 Anywhere St., Any City 12345</a>
							<a href="/" target="_blank">(123) 456 - 7890</a>
							<a href="/" target="_blank">hello@reallygreatsite.com</a>
						</div>

						<div className="flex flex-col">
							<h1 className="font-bold text-2xl text-yellow-500 mb-4">Explore Products</h1>
							<Link to="/shop">Jarrah - Active Honey</Link>
							<Link to="/shop">Karri - Active Honey</Link>
							<Link to="/shop">Marri - Active Honey</Link>
						</div>

						<div className="flex flex-col">
							<h1 className="font-bold text-2xl text-yellow-500 mb-4">Sitemap</h1>
							<Link to="/shop">Shop</Link>
							<Link to="/about-us">About Us</Link>
							<Link to="/health">Health</Link>
							<Link to="/research">Research</Link>
							<Link to="/contact-us">Contact Us</Link>
							<Link to="/cart">Cart</Link>
						</div>
					</div>

					<p>Copyright &copy; 2026 Purewest - All Rights Reserved</p>
				</div>
			</footer>
		</>
	)
}