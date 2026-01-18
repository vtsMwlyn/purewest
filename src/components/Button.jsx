export default function Button({ type, className, children, theme = 'primary', ...rest }) {
	return (
		<button type={type} className={`text-black rounded-full py-2 px-4 ${theme === 'primary' ? 'bg-yellow-500 hover:bg-amber-300' : 'bg-white'} flex items-center justify-center gap-2 transition disabled:bg-slate-400 disabled:text-white ${className}`} {...rest}>
			{children}
		</button>
	)
}