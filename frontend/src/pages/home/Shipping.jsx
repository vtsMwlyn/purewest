export default function Shipping() {
  const items = [
    { src: "/images/product-benefit-1.webp", title: "Free Shipping",    body: "Complimentary shipping on all orders over $50. Express options available." },
    { src: "/images/product-benefit-2.webp", title: "Raw & Pure",        body: "Cold-extracted and never heat treated. Exactly as nature intended." },
    { src: "/images/product-benefit-3.webp", title: "Certified Quality", body: "Every batch independently tested and certified for Total Activity rating." },
    { src: "/images/product-benefit-4.webp", title: "Easy Returns",      body: "Not completely satisfied? We offer a 30-day money-back guarantee." },
  ];

  return (
    <section id="shipping" className="w-full relative flex justify-end">
      <div className="w-full relative z-5 bg-linear-to-l from-dark2 to-transparent flex justify-end">
        <div className="w-full lg:w-1/2 py-12 md:py-[90px] px-6 md:px-18 grid grid-cols-1 sm:grid-cols-2 relative">
          <div className="absolute top-22.25 left-17.75 w-5 h-5 border-t border-l opacity-50 border-gold" />
          <div className="absolute bottom-22.25 right-17.75 w-5 h-5 border-b border-r opacity-50 border-gold" />

          {items.map((item, i) => (
            <div key={i} className="py-11 px-[30px] text-center border border-rule bg-dark/60">
              <img src={item.src} className="size-20 mb-4.5 block mx-auto"/>
              <h4 className="font-garamond text-base font-normal mb-2.5 text-gold-pale">
                {item.title}
              </h4>
              <p className="text-[0.68rem] leading-[1.7] text-text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
      <img src="/images/traktor.webp" className="absolute z-0 inset-0 w-full h-full object-cover object-center -scale-x-100"/>
    </section>
  );
}
