import Section from "../components/Section"
import Popup from "../components/Popup"
import { useState } from "react"
import { Utensils, Flower, MinusCircle, PlusCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Button from "../components/Button";

import "swiper/css";
import "swiper/css/navigation";

import products from "../data/products";

export default function Shop({ cart, addToCart }) {
	const [product, setProduct] = useState(null);
	const [qty, setQty] = useState(1);

	const currentlyInCart = cart.find(item => item.product.id === product?.id);

	return (
		<>
			{/* Page Hero - Banner */}
			<section className="w-full h-[95vh]">
				<div className="w-full h-full cursor-pointer relative">
					<img src="/banner-shop.jpg" className="object-center object-cover h-full w-full brightness-75" />

					<Section className="absolute top-0 h-full">
						<div className="w-full h-full flex flex-col justify-end items-start">
							<h1 className="text-white font-bold text-6xl xl:text-8xl mb-10">Naturally Sweet, Honestly Pure.</h1>
						</div>
					</Section>
				</div>
			</section>

			<Section className="py-10 xl:py-20">
				<img src="/flower-bg-3.png" className="hidden xl:block absolute top-15 -left-35 z-10 w-70 h-70" />
				<img src="/flower-bg-1.png" className="hidden xl:block absolute top-15 -right-35 z-10 w-70 h-70" />

				<h1 className="w-full xl:w-1/2 font-bold text-center text-2xl xl:text-4xl">Your Daily Dose Of</h1>
				<h1 className="text-6xl xl:text-8xl font-bold text-yellow-500">Purewest</h1>

				<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-8 xl:mt-16">
					{products.map((p, index) => {
						const itemOnCart = cart.find(item => item.product.id === p.id)

						return (
						<div key={index} className="flex flex-col rounded-4xl bg-slate-900 p-10">
								<img src={p.gallery[0]} className="w-full h-75 rounded-xl object-cover object-center mb-4" />
								<h1 className="font-semibold text-2xl">{p.name}</h1>
								<h2 className="font-semibold text-2xl text-yellow-500">${p.price}</h2>
								<div className="w-full grid grid-cols-2 gap-2 mt-4">
									<Button onClick={() => setProduct(p)} className="py-2 px-4" theme="secondary">View Product</Button>
									<Button onClick={() => addToCart({ product: p, qty: 1 })} className="py-2 px-4" disabled={itemOnCart}>{itemOnCart ? 'Added to Cart' : 'Add to Cart'}</Button>
								</div>
							</div>
						)
					})}
				</div>
			</Section>

			<Popup isOpen={!!product} onClose={() => setProduct(null)} className="w-11/12 xl:w-2/3">
				<div className="w-full flex flex-col xl:flex-row gap-5 xl:gap-10">
					<div className="w-full xl:w-2/5">
						<div className="w-full h-80 xl:h-120 rounded-4xl overflow-hidden">
							<Swiper
								modules={[Autoplay, Navigation]}
								slidesPerView={1}
								spaceBetween={0}
								navigation
								loop={true}
								autoplay={{
									delay: 3000,
									disableOnInteraction: false,
									pauseOnMouseEnter: true,
								}}
								className="w-full h-full"
							>
								{product?.gallery.map((img, index) => (
									<SwiperSlide key={index}>
										<div className="w-full h-full cursor-pointer">
											<img src={img} className="object-center object-cover h-full w-full" />
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>

					<div className="w-full xl:w-3/5 flex flex-col items-start">
						<h1 className="font-bold text-2xl xl:text-4xl">{product?.name}</h1>
						<h2 className="text-yellow-500 font-bold mt-2 text-lg xl:text-xl">${product?.price}</h2>
						<div className="mt-4 text-slate-600" dangerouslySetInnerHTML={{ __html: product?.desc }}></div>
						
						<div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
							<div className="p-4 rounded-2xl flex flex-col border border-yellow-500">
								<div className="flex gap-2">
									<Utensils className="stroke-yellow-500" />
									<h2 className="font-semibold text-yellow-500">Tasting Note</h2>
								</div>
								<div className="text-slate-600 mt-3 text-sm" dangerouslySetInnerHTML={{ __html: product?.tastingNote }}></div>
							</div>

							<div className="p-4 rounded-2xl flex flex-col border border-yellow-500">
								<div className="flex gap-2">
									<Flower className="stroke-yellow-500" />
									<h2 className="font-semibold text-yellow-500">Floral Origin</h2>
								</div>
								<div className="text-slate-600 mt-3 text-sm" dangerouslySetInnerHTML={{ __html: product?.floralOrigin }}></div>
							</div>
						</div>

						<div className="flex flex-col items-start mt-4">
							<label htmlFor="qty" className="text-sm">Quantity</label>
							<div className="w-full relative flex items-center">
								<button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} className="mt-1 absolute left-3"><MinusCircle /></button>
								<input type="text" value={qty} onChange={(e) => setQty(e.target.value)} className="w-full border border-slate-400 py-2 rounded-full mt-1 text-center" id="qty" />
								<button type="button" onClick={() => setQty(q => q + 1)} className="mt-1 absolute right-3"><PlusCircle /></button>
							</div>
						</div>

						<Button type="button" onClick={() => addToCart({ product, qty })} className="mt-8 w-40" disabled={currentlyInCart}>{currentlyInCart ? 'Added to Cart' : 'Add to Cart'}</Button>
					</div>
				</div>
			</Popup>
		</>
	)
}