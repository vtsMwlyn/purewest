export default function Input({ type = 'text', className, ...rest }) {
	return (
		<input type={type} className={`py-2 px-4 rounded-full border border-slate-400 outline-0 focus:ring-1 focus:ring-yellow-500 transition-all duration-300 focus:border-transparent ${className}`} {...rest} />
	)
}