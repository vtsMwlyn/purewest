export default function Section({ className, children, backgroundColor }) {
	return (
		<section className={`w-full flex justify-center relative ${backgroundColor}`} >
			<div className={`w-11/12 xl:w-5/6 flex flex-col items-center ${className}`} >
				{children}
			</div>
		</section>
	)
}