export default function Section({ className, children, backgroundImage, backgroundColor }) {
	return (
		<section className={`w-full flex justify-center ${backgroundColor}`} style={{ background: `url(${backgroundImage}) center / cover no-repeat` }}>
			<div className={`w-11/12 xl:w-5/6 flex flex-col items-center ${className}`} >
				{children}
			</div>
		</section>
	)
}