import Section from "../components/Section"
import { PlusCircle, MinusCircle } from "lucide-react";

export default function Cart({ cart, removeFromCart, updateQty }) {
	const subtotal = cart.reduce((sum, item) => {
		return sum + item.product.price * item.qty;
	}, 0);
	
	return (
		<>
			<Section className="py-10 xl:py-20">
				<div className="w-full flex xl:flex-row flex-col-reverse mt-10">
					<div className="w-full xl:w-1/2">This is the payment detail form</div>

					<div className="w-full xl:w-1/2 flex flex-col items-start">
						<div className="w-full flex flex-col gap-6">
							{cart.map((item, index) => {
								const product = item.product;
								return (
									<div key={index} className="flex gap-10 justify-between items-center">
										<div className="w-2/3 flex items-center gap-10">
											<img src={product.gallery[0]} className="rounded-xl w-25 h-25 object-cover object-center" />
											<div className="flex flex-col">
												<h1 className="font-semibold">{product.name}</h1>
												<div className="w-40 relative flex items-center mt-2">
													<button type="button" onClick={() => updateQty(product.id, item.qty - 1)} className="mt-1 absolute left-3"><MinusCircle /></button>
													<input type="text" value={item.qty} onChange={(e) => updateQty(product.id, e.target.value)} className="w-full border border-slate-400 py-2 rounded-full mt-1 text-center" id="qty" />
													<button type="button" onClick={() => updateQty(product.id, item.qty + 1)} className="mt-1 absolute right-3"><PlusCircle /></button>
												</div>
											</div>
										</div>

										<h2 className="w-1/3 text-right">${(product.price * item.qty).toFixed(2)}</h2>
									</div>
								)
							})}
						</div>

						<div className="w-full flex flex-col items-stretch mt-20 gap-2">
							<div className="w-full flex items-center justify-between">
								<h2>Subtotal</h2>
								<p>${subtotal.toFixed(2)}</p>
							</div>
							<div className="w-full flex items-center justify-between">
								<h2>Shipping</h2>
								<p>Enter shipping address</p>
							</div>

							<div className="w-full flex items-center justify-between mt-4">
								<h2 className="font-bold text-xl">Total</h2>
								<p className="text-yellow-500 font-bold text-xl">${subtotal.toFixed(2)}</p>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</>
	)
}