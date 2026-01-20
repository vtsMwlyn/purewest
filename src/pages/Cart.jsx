import { PlusCircle, MinusCircle, Trash2, AppWindow } from "lucide-react";
import { useState } from "react";

import Section from "../components/Section"
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";

import regionList from '../data/region-list'

export default function Cart({ cart, removeFromCart, updateQty }) {
	const [showDifferentBillingAddress, setShowDifferentBillingAddress] = useState(false);

	const subtotal = cart.reduce((sum, item) => {
		return sum + item.product.price * item.qty;
	}, 0);
	
	return (
		<>
			<Section className="py-10 xl:py-20">
				<div className="w-full flex flex-col-reverse xl:flex-row mt-10 gap-20">
					{/* Payment Details */}
					<form className="w-full xl:w-1/2 flex flex-col">
						{/* Contact */}
						<h1 className="text-xl font-semibold">Contact</h1>

						<div className="flex flex-col items-start mt-4">
							<label htmlFor="contact" className="text-sm">Email or phone number</label>
							<Input type="text" className="w-full mt-1" id="contact" />
						</div>

						{/* Delivery */}
						<h1 className="text-xl font-semibold mt-10">Delivery</h1>

						<div className="flex flex-col items-start mt-4">
							<label htmlFor="country" className="text-sm">Country</label>
							<Select className="w-full mt-1" id="country" placeholder="" options={[
								{ value: 'Philippines', label: 'Philippines' },
							]} />
						</div>

						<div className="grid grid-cols-2 mt-4 gap-4">
							<div className="flex flex-col items-start">
								<label htmlFor="first_name" className="text-sm">First Name</label>
								<Input type="text" className="w-full mt-1" id="first_name" />
							</div>

							<div className="flex flex-col items-start">
								<label htmlFor="last_name" className="text-sm">Last Name</label>
								<Input type="text" className="w-full mt-1" id="last_name" />
							</div>
						</div>

						<div className="flex flex-col items-start mt-4">
							<label htmlFor="suite" className="text-sm">Apartment, suite, etc (optional)</label>
							<Input type="text" className="w-full mt-1" id="suite" />
						</div>

						<div className="grid grid-cols-2 mt-4 gap-4">
							<div className="flex flex-col items-start">
								<label htmlFor="postal_code" className="text-sm">Postal Code</label>
								<Input type="text" className="w-full mt-1" id="postal_code" />
							</div>

							<div className="flex flex-col items-start">
								<label htmlFor="city" className="text-sm">City</label>
								<Input type="text" className="w-full mt-1" id="city" />
							</div>
						</div>

						<div className="flex flex-col items-start mt-4">
							<label htmlFor="region" className="text-sm">Region</label>
							<Select className="w-full mt-1" id="region" placeholder="" options={regionList} />
						</div>

						<div className="flex flex-col items-start mt-4">
							<label htmlFor="phone" className="text-sm">Phone</label>
							<Input type="text" className="w-full mt-1" id="phone" />
						</div>

						{/* Shipping Method */}
						<h1 className="text-xl font-semibold mt-10">Shipping Method</h1>

						<div className="flex flex-col items-start mt-4">
							<div className="w-full py-2 px-4 rounded-full border border-yellow-500 bg-yellow-500/10 flex justify-between cursor-pointer">
								<p>Standard</p>
								<p>FREE</p>
							</div>
						</div>

						{/* Payment Method */}
						<h1 className="text-xl font-semibold mt-10">Payment</h1>

						<div className="flex flex-col items-start mt-4">
							<div className="w-full py-2 px-4 rounded-t-2xl border border-yellow-500 bg-yellow-500/10 flex justify-between cursor-pointer">
								<p>PayPal</p>
								<img src="/paypal.svg" className="w-14" />
							</div>
							<div className="bg-yellow-500/10 w-full px-4 py-10 flex flex-col justify-center items-center">
								<AppWindow className="size-30 stroke-1" />
								<p className="w-full xl:w-2/3 text-center">After clicking "Pay with PayPal", you will be redirected to PayPal to complete your purchase securely.</p>

								<h2 className="self-start text-lg mt-10">Billing Address</h2>
								<div className="w-full mt-4 flex flex-col gap-4">
									<label htmlFor="billing_address_same" className="cursor-pointer rounded-full py-2 px-4 bg-white text-black flex items-center gap-2">
										<input type="radio" className="size-4" onChange={(e) => setShowDifferentBillingAddress(e.target.checked ? false : true)} defaultChecked={true} name="billing_address" id="billing_address_same" />
										<p>Same as shipping address</p>
									</label>
									<label htmlFor="billing_address_different" className="cursor-pointer rounded-full py-2 px-4 bg-white text-black flex items-center gap-2">
										<input type="radio" className="size-4" onChange={(e) => setShowDifferentBillingAddress(e.target.checked ? true : false)} name="billing_address" id="billing_address_different" />
										<p>Use a different shipping address</p>
									</label>
								</div>

								{showDifferentBillingAddress && (
									<>
										<div className="w-full flex flex-col items-start mt-4">
											<label htmlFor="country" className="text-sm">Country</label>
											<Select className="w-full mt-1" id="country" placeholder="" options={[
												{ value: 'Philippines', label: 'Philippines' },
											]} />
										</div>

										<div className="w-full grid grid-cols-2 mt-4 gap-4">
											<div className="w-full flex flex-col items-start">
												<label htmlFor="first_name" className="text-sm">First Name</label>
												<Input type="text" className="w-full mt-1" id="first_name" />
											</div>

											<div className="w-full flex flex-col items-start">
												<label htmlFor="last_name" className="text-sm">Last Name</label>
												<Input type="text" className="w-full mt-1" id="last_name" />
											</div>
										</div>

										<div className="w-full flex flex-col items-start mt-4">
											<label htmlFor="suite" className="text-sm">Apartment, suite, etc (optional)</label>
											<Input type="text" className="w-full mt-1" id="suite" />
										</div>

										<div className="w-full grid grid-cols-2 mt-4 gap-4">
											<div className="w-full flex flex-col items-start">
												<label htmlFor="postal_code" className="text-sm">Postal Code</label>
												<Input type="text" className="w-full mt-1" id="postal_code" />
											</div>

											<div className="w-full flex flex-col items-start">
												<label htmlFor="city" className="text-sm">City</label>
												<Input type="text" className="w-full mt-1" id="city" />
											</div>
										</div>

										<div className="w-full flex flex-col items-start mt-4">
											<label htmlFor="region" className="text-sm">Region</label>
											<Select className="w-full mt-1" id="region" placeholder="" options={regionList} />
										</div>

										<div className="w-full flex flex-col items-start mt-4">
											<label htmlFor="phone" className="text-sm">Phone (Optional)</label>
											<Input type="text" className="w-full mt-1" id="phone" />
										</div>
									</>
								)}

								<Button type="button" className="mt-10 w-1/2">Continue to PayPal</Button>
							</div>
						</div>
					</form>

					{/* Cart List */}
					<div className="w-full xl:w-1/2">
						<div className="w-full h-fit sticky top-30 flex flex-col items-start">
							<div className="w-full flex flex-col gap-6">
								{cart.map((item, index) => {
									const product = item.product;
									return (
										<div key={index} className="flex gap-10 justify-between items-center">
											<div className="w-2/3 flex items-center gap-10">
												<img src={product.gallery[0]} className="rounded-xl w-25 h-25 object-cover object-center" />

												<div className="flex flex-col">
													<h1 className="font-semibold">{product.name}</h1>
													<div className="flex items-center mt-2 gap-4">
														<div className="w-35 relative flex items-center">
															<button type="button" onClick={() => updateQty(product.id, item.qty - 1)} className="mt-1 absolute left-3"><MinusCircle /></button>
															<Input type="text" value={item.qty} onChange={(e) => updateQty(product.id, e.target.value)} className="w-full mt-1 text-center" id="qty" />
															<button type="button" onClick={() => updateQty(product.id, item.qty + 1)} className="mt-1 absolute right-3"><PlusCircle /></button>
														</div>
														<button type="button" onClick={() => removeFromCart(product.id)} className=""><Trash2 /></button>
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
				</div>
			</Section>
		</>
	)
}