export default function LinkButton({ href = "/", target = "_blank", className, children, theme = 'primary' }) {
	return (
		<a href={href} target={target} className={`text-black rounded-full py-2 px-4 ${theme === 'primary' ? 'bg-yellow-500 hover:bg-amber-300' : 'bg-white'} flex items-center justify-center gap-2  transition ${className}`}>
			{children}
		</a>
	)
}