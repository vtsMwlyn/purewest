import { Box, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Section from "../components/Section"

export default function Home() {
	return (
		<>
			<section className="w-full h-[90vh]">
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
						{ image: '/banner-1.jpg', tagline: 'Savour Pure Nature’s Goodnes' },
						{ image: '/banner-2.jpeg', tagline: 'Golden, Raw, and Uncompromised' },
						{ image: '/banner-3.jpeg', tagline: 'Harvested by Hand, Perfected by Nature' },
						{ image: '/banner-4.jpeg', tagline: 'Native eucalyptus blossoms from untouched Western Australian forests.' },
						{ image: '/banner-5.jpeg', tagline: 'Marri, Jarrah & Karri honey — harvested in Western Australia’s most pristine bushland.' },
					].map(homeBanner => (
						<SwiperSlide>
							<div className="w-full h-full cursor-pointer relative">
								<img src={homeBanner.image} className="object-center object-cover h-full w-full brightness-75" />

								<Section className="absolute top-0 h-full">
									<div className="w-full h-full flex flex-col justify-end items-start">
										<h1 className="text-white uppercase font-bold text-8xl mb-10">{homeBanner.tagline}</h1>
									</div>
								</Section>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</section>

			<Section backgroundColor="bg-slate-700 py-20">
				<div className="w-full grid grid-cols-2 gap-20 items-center">
					<div className="rounded-4xl overflow-hidden">
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
									<div className="h-112 w-full cursor-pointer">
										<img src={img} className="object-center object-cover h-full w-full" />
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					<div className="flex flex-col items-start">
						<h1 className="font-bold text-4xl text-yellow-500">Our Beekeepers</h1>
						<p className="mt-4">In the remote forests of Western Australia, surrounded by ancient eucalyptus trees, our honey begins its journey.</p>
						<p className="mt-4">Our Marri, Jarrah, and Karri honey is harvested by master beekeepers in pristine bushland, far from urban and agricultural influence. Each harvest is seasonal and limited, guided by natural bloom cycles to capture nectar at its peak — resulting in honey of exceptional purity, depth, and character, never rushed or industrially processed.</p>
						<button type="button" className="rounded-full bg-white text-black py-2 px-4 flex gap-3 mt-8">Learn More <ArrowRight /></button>
					</div>
				</div>
			</Section>

			{/* <Section className="py-10" backgroundImage="/home-opening-tagline.jpg">
				<h1 className="w-1/2 font-bold text-center text-5xl text-yellow-500">Raw and naturally powerful. Anytime. Anywhere.</h1>

				<div className="grid grid-cols-4 mt-16">
					<img src="/karri.png" className="w-80" />

					<div className="flex flex-col items-center col-span-2 gap-10">
						<img src="/logo.webp" className="w-90"/>
						<h1 className="text-center text-2xl">From the wild to your world—crafted in small batches, uniting tradition and modern convenience for a refined lifestyle, at home or on the go.</h1>
					</div>

					<img src="/marri.png" className="w-80" />
				</div>
			</Section> */}

			<Section>
				<h1 className="w-1/2 font-bold text-center text-4xl uppercase">Your Daily Dose Of</h1>
				<h1 className="text-8xl font-bold text-yellow-500">PUREWEST</h1>

				<div className="w-full grid grid-cols-3 gap-12 mt-8">
					<div className="flex flex-col rounded-4xl bg-slate-900 p-10">
						<img src="/shop-jarrah.png" className="w-full h-75 rounded-xl object-cover object-center mb-4" />
						<h1 className="font-semibold text-2xl">Jarrah - Active Honey</h1>
						<h2 className="font-semibold text-2xl text-yellow-500">$0.00</h2>
						<div className="w-full grid grid-cols-2 gap-2 mt-4">
							<button type="button" className="rounded-full bg-white text-black py-2 px-4">View Product</button>
							<button type="button" className="rounded-full bg-yellow-500 text-black py-2 px-4">Add to Cart</button>
						</div>
					</div>

					<div className="flex flex-col rounded-4xl bg-slate-900 p-10">
						<img src="/shop-karri.png" className="w-full h-75 rounded-xl object-cover object-center mb-4" />
						<h1 className="font-semibold text-2xl">Karri - Active Honey</h1>
						<h2 className="font-semibold text-2xl text-yellow-500">$0.00</h2>
						<div className="w-full grid grid-cols-2 gap-2 mt-4">
							<button type="button" className="rounded-full bg-white text-black py-2 px-4">View Product</button>
							<button type="button" className="rounded-full bg-yellow-500 text-black py-2 px-4">Add to Cart</button>
						</div>
					</div>

					<div className="flex flex-col rounded-4xl bg-slate-900 p-10">
						<img src="/shop-marri.png" className="w-full h-75 rounded-xl object-cover object-center mb-4" />
						<h1 className="font-semibold text-2xl">Marri - Active Honey</h1>
						<h2 className="font-semibold text-2xl text-yellow-500">$0.00</h2>
						<div className="w-full grid grid-cols-2 gap-2 mt-4">
							<button type="button" className="rounded-full bg-white text-black py-2 px-4">View Product</button>
							<button type="button" className="rounded-full bg-yellow-500 text-black py-2 px-4">Add to Cart</button>
						</div>
					</div>
				</div>
			</Section>
		</>
	)
}