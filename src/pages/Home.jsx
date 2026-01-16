import { Star, ArrowRight, ChevronRight, Menu } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useState } from "react";

import FAQs from "../data/faq";

import "swiper/css";
import "swiper/css/navigation";

import Section from "../components/Section"

export default function Home() {
	const [accordion, setAccordion] = useState([false, false]);

	const toggleAccordion = (index) => {
		const newAccordionState = [...accordion];
		newAccordionState[index] = !accordion[index];
		setAccordion(newAccordionState);
	}

	return (
		<>
			{/* Page Hero - Banner */}
			<section className="w-full h-[95vh]">
				<Swiper
					modules={[Autoplay]}
					slidesPerView={1}
					spaceBetween={0}
					loop={true}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					className="w-full h-full"
				>
					{[
						{ image: '/banner-1.jpg', tagline: 'Savour Pure Nature’s Goodnes.' },
						{ image: '/banner-2.jpeg', tagline: 'Golden, Raw, and Uncompromised.' },
						{ image: '/banner-3.jpeg', tagline: 'Harvested by Hand, Perfected by Nature.' },
						{ image: '/banner-4.jpeg', tagline: 'Native eucalyptus blossoms from untouched Western Australian forests.' },
						{ image: '/banner-5.jpeg', tagline: 'Marri, Jarrah & Karri honey — harvested in Western Australia’s most pristine bushland.' },
					].map(homeBanner => (
						<SwiperSlide>
							<div className="w-full h-full cursor-pointer relative">
								<img src={homeBanner.image} className="object-center object-cover h-full w-full brightness-75" />

								<Section className="absolute top-0 h-full">
									<div className="w-full h-full flex flex-col justify-end items-start">
										<h1 className="text-white font-bold text-6xl xl:text-8xl mb-10">{homeBanner.tagline}</h1>
									</div>
								</Section>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</section>

			{/* Beekeepers and Product */}
			<section className="py-10 xl:py-20 overflow-x-hidden scrollbar-hide">
				<div className="flex gap-20 flex-col xl:flex-row xl:flex-nowrap xl:min-w-max">
					<div className="flex flex-col lg:flex-row items-center gap-20">
						<div className="w-full lg:w-1/2 xl:w-100 lg:rounded-r-4xl aspect-3/4 overflow-hidden">
							<Swiper
								modules={[Autoplay]}
								slidesPerView={1}
								spaceBetween={0}
								loop={true}
								autoplay={{
									delay: 3000,
									disableOnInteraction: false,
									pauseOnMouseEnter: true,
								}}
								className="w-full h-full"
							>
								{['/home-beekeeper-1.jpg', '/home-beekeeper-2.jpg', '/home-beekeeper-3.jpg', '/home-beekeeper-4.jpg', '/home-beekeeper-5.jpg'].map((img, index) => (
									<SwiperSlide key={index}>
										<div className="w-full h-full cursor-pointer">
											<img src={img} className="object-center object-cover h-full w-full" />
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>

						<div className="w-full lg:w-1/2 xl:w-100 flex flex-col items-start px-8 xl:px-0">
							<h1 className="font-bold text-4xl text-yellow-500">Our Beekeepers</h1>
							<p className="mt-4">In the remote forests of Western Australia, surrounded by ancient eucalyptus trees, our honey begins its journey.</p>
							<p className="mt-4">Our Marri, Jarrah, and Karri honey is harvested by master beekeepers in pristine bushland, far from urban and agricultural influence. Each harvest is seasonal and limited, guided by natural bloom cycles to capture nectar at its peak — resulting in honey of exceptional purity, depth, and character, never rushed or industrially processed.</p>
							<button type="button" className="rounded-full bg-white text-black py-2 px-4 flex gap-3 mt-8">Learn More <ArrowRight /></button>
						</div>
					</div>

					<div className="pl-6 xl:pl-0 w-300">
						<Swiper
							modules={[Navigation]}
							slidesPerView={3}
							spaceBetween={40}
							loop={true}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							className="w-full h-full cursor-grab"
						>
							{[
								{ name: 'Jarrah - Active Honey', img: '/shop-jarrah.png', price: 5.69 },
								{ name: 'Karri - Active Honey', img: '/shop-karri.png', price: 10.19 },
								{ name: 'Marri - Active Honey', img: '/shop-marri.png', price: 7.89 },
								{ name: 'Jarrah - Active Honey', img: '/shop-jarrah.png', price: 5.69 },
								{ name: 'Karri - Active Honey', img: '/shop-karri.png', price: 10.19 },
								{ name: 'Marri - Active Honey', img: '/shop-marri.png', price: 7.89 },
							].map((product, index) => (
								<SwiperSlide key={index}>
									<div className="flex flex-col rounded-4xl bg-slate-900 p-10">
										<img src={product.img} className="w-full h-75 rounded-xl object-cover object-center mb-4" />
										<h1 className="font-semibold text-2xl">{product.name}</h1>
										<h2 className="font-semibold text-2xl text-yellow-500">${product.price}</h2>
										<div className="w-full grid grid-cols-2 gap-2 mt-4">
											<button type="button" className="rounded-full bg-white text-black py-2 px-4">View Product</button>
											<button type="button" className="rounded-full bg-yellow-500 text-black py-2 px-4">Add to Cart</button>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</section>

			{/* Product Benefits */}
			<section className="w-full relative h-fit">
				<img src="/home-product-benefit.webp" className="absolute top-0 z-0 w-full h-full object-cover object-center brightness-60" />
				<Section className="relative z-1">
					<div className="flex justify-center w-full py-15">
						<h1 className="w-full xl:w-2/3 text-white font-bold text-5xl">Discover the remarkable taste and benefits of Western Australian honey, crafted by the healthiest bees in one of the planet’s most untouched environments.</h1>
					</div>
				</Section>
			</section>

			<Section className="py-10 xl:py-20">
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-20">
					{[
						{ img: '/product-benefit-1.avif', title: 'Premium and Rare', desc: 'Jarrah honey’s rarity stems from the Jarrah tree, found exclusively in Western Australia, which blooms only once every two years under ideal conditions, making each harvest exceptionally rare and valuable.' },
						{ img: '/product-benefit-2.avif', title: 'Low Glycemic Index', desc: 'Low glycemic index (GI) honey offers a slow, steady release of sugars, helping to maintain balanced blood sugar levels and prolonged energy. Its gentle sweetness makes it an ideal choice for supporting healthy metabolism and overall wellness.' },
						{ img: '/product-benefit-3.avif', title: 'Strong Antimicrobial', desc: 'Jarrah honey is distinguished by its remarkable antibacterial properties, largely attributed to its high levels of hydrogen peroxide and methylglyoxal (MGO), which inhibit harmful bacterial growth and facilitate wound healing. Its potent anti-inflammatory effects further aid in reducing tissue inflammation, making it an esteemed natural remedy for various health concerns.' },
						{ img: '/product-benefit-4.avif', title: 'Tastes Good', desc: 'Jarrah honey presents a distinctive flavor profile with rich, full-bodied sweetness and subtle notes of caramel and toffee. Its smooth, velvety texture and gentle earthiness create a luxurious taste experience that lingers on the palate.' },
					].map((benefit, index) => (
						<div key={index} className="flex flex-col items-center gap-4">
							<img src={benefit.img} />
							<h1 className="font-bold text-2xl">{benefit.title}</h1>
							<p className="text-center">{benefit.desc}</p>
						</div>
					))}
					
				</div>
			</Section>

			{/* Testimonial */}
			<Section className="py-10 xl:py-20">
				<h1 className="font-bold text-center text-4xl">Trusted by People for Their <span className="font-bold text-yellow-500">Body Health</span></h1>
				<div className="rounded-full bg-white flex items-center gap-3 py-2 px-4 mt-4">
					<div className="flex gap-2">
						{[1, 2, 3, 4, 5].map((n, index) => (
							<Star key={index} className="fill-yellow-500 stroke-yellow-500" />
						))}
					</div>
					<p className="text-black font-semibold">1000+ Customers Satisfied</p>
				</div>

				<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 mt-16">
					{[
						{ name: 'Charlie Munger', portrait: '/testimoni-person-1.jpeg', product: 'Jarrah - Active Honey', img: '/shop-jarrah.png', words: 'Amazing product. I use it daily for gut health and immune support.' },
						{ name: 'Warren Buffet', portrait: '/testimoni-person-2.jpeg', product: 'Marri - Active Honey', img: '/shop-marri.png', words: 'Healthiest honey on Earth. I use to infuse my own medicinal honey and it was a lot of headache.' },
						{ name: 'Lo Kheng Hong', portrait: '/testimoni-person-3.jpeg', product: 'Karri - Active Honey', img: '/shop-karri.png', words: 'Tasty, pure, raw and naturally active, with loads of health benefits! Great for smoothies or over oats! 🍯' },
					].map((testimoni, index) => (
						<div key={index} className="flex items-start">
							<div className="flex flex-col w-3/5">
								<h2 className="font-bold text-2xl">{testimoni.name}</h2>
								<div className="flex gap-2 mt-2">
									{[1, 2, 3, 4, 5].map((n, index) => (
										<Star key={index} className="fill-yellow-500 stroke-yellow-500" />
									))}
								</div>
								<p className="mt-4">{testimoni.words}</p>
								<div className="flex items-center gap-2 mt-4">
									<img src={testimoni.img} className="object-cover object-center h-10 w-10" />
									<p className="font-semibold">{testimoni.product}</p>
								</div>
							</div>
							<div className="w-2/5">
								<img src={testimoni.portrait} className="object-cover object-center rounded-xl w-full h-50" />
							</div>
						</div>
					))}
				</div>
			</Section>

			{/* FAQ */}
			<Section className="py-10 xl:py-20">
				<h1 className="font-bold text-center text-4xl mb-6">What People Usually Ask About <span className="font-bold text-yellow-500">Purewest Products</span></h1>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{FAQs.map((faq, index) => (
						<div key={index} className={`transition-all duration-300 ease-in-out w-full rounded-4xl bg-white grid mt-4 overflow-y-hidden ${accordion[index] === true ? 'min-h-15' : 'max-h-15'}`}>
							<button type="button" onClick={() => toggleAccordion(index)} className="w-full flex justify-between items-center h-15 px-8">
								<h2 className="font-semibold text-xl text-black">{faq.question}</h2>
								<ChevronRight className={`stroke-black transform transition-all duration-300 ease-in-out ${accordion[index] === true ? 'rotate-90' : 'rotate-0'}`} />
							</button>
							<div className="transition space-y-2 text-slate-700 pb-8 px-8 pt-4" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
						</div>
					))}
				</div>
			</Section>

			{/* Email Subscription */}
			<Section className="py-10 xl:py-20">
				<h1 className="font-bold text-center text-4xl mb-4 self-start"><span className="font-bold text-yellow-500">Subscribe</span> to Our Email</h1>
				<p className="self-start">Be the first to know about new collections and exclusive offers.</p>
				<div className="w-full flex gap-4 mt-6">
					<input type="email" className="w-2/3 lg:w-7/8 py-2 px-4 rounded-full border" placeholder="Enter your email" />
					<button type="button" className="w-1/3 lg:w-1/8 rounded-full bg-yellow-500 text-black py-2 px-4 font-semibold">Sign Up</button>
				</div>
			</Section>
		</>
	)
}