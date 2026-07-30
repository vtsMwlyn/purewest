import { X } from "lucide-react"

export default function Popup({ title, children, className, isOpen, onClose }) {
	return (
		<div className={`fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] z-1000 ${isOpen === true ? 'flex' : 'hidden'} justify-center items-center`}>
			<div className={`bg-white text-black rounded-2xl flex flex-col items-start p-6 ${className}`}>
				<div className="w-full flex items-center justify-between">
					<h1 className="text-2xl font-bold">{title}</h1>
					<button type="button" onClick={onClose}><X /></button>
				</div>
				<div className="w-full flex flex-col items-start max-h-[60vh] overflow-y-auto">
					{children}
				</div>
			</div>
		</div>
	)
}