import { MapPin, Phone, Mail } from "lucide-react"

import Section from "../components/Section"
import Button from "../components/Button"

export default function ContactUs() {
	return (
		<Section className="py-10 xl:py-20">
			<div className="w-full flex flex-col xl:flex-row mt-8">
				<div className="w-full xl:w-1/2">
					<h1 className="font-bold text-4xl text-yellow-500">Need Help?</h1>
					<p className="mt-4">Get in touch and we’ll get back to you soon.</p>

					<div className="w-full flex items-center mt-6">
						<div className="w-12">
							<MapPin className="size-8" />
						</div>
						<div className="flex flex-col">
							<h2 className="font-bold">Location</h2>
							<a href="/" target="_blank">123 Anywhere St., Any City 12345</a>
						</div>
					</div>

					<div className="w-full flex items-center mt-6">
						<div className="w-12">
							<Phone className="size-8" />
						</div>
						<div className="flex flex-col">
							<h2 className="font-bold">Call Us</h2>
							<a href="/" target="_blank">(123) 456 - 7890</a>
						</div>
					</div>

					<div className="w-full flex items-center mt-6">
						<div className="w-12">
							<Mail className="size-8" />
						</div>
						<div className="flex flex-col">
							<h2 className="font-bold">Email Us</h2>
							<a href="/" target="_blank">hello@reallygreatsite.com</a>
						</div>
					</div>

					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.276017348238!2d106.73701757573008!3d-6.093473159776028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d494bee1537%3A0x789922c38210dae8!2sBatavia%20PIK!5e0!3m2!1sen!2sid!4v1768755813165!5m2!1sen!2sid" className="w-full xl:w-160 h-100 mt-10 rounded-2xl" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>

				<div className="w-full xl:w-1/2">
					<div className="w-full gap-4 grid grid-cols-2 mt-14">
						<div className="flex flex-col">
							<label htmlFor="first_name">First Name</label>
							<input type="text" className="w-full border border-slate-400 py-2 px-4 rounded-full mt-1" id="first_name" />
						</div>

						<div className="flex flex-col">
							<label htmlFor="last_name">Last Name</label>
							<input type="text" className="w-full border border-slate-400 py-2 px-4 rounded-full mt-1" id="last_name" />
						</div>
					</div>

					<div className="flex flex-col mt-4">
						<label htmlFor="email">Email</label>
						<input type="email" className="w-full border border-slate-400 py-2 px-4 rounded-full mt-1" id="email" />
					</div>

					<div className="flex flex-col mt-4">
						<label htmlFor="message">Message</label>
						<textarea rows={4} className="w-full resize-none border border-slate-400 py-2 px-4 rounded-3xl mt-1" id="message"></textarea>
					</div>

					<div className="w-full flex justify-end mt-8">
						<Button type="button" className="px-8">Send Message</Button>
					</div>
				</div>
			</div>
		</Section>
	)
}