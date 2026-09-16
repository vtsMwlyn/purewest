export default function RangePhoto() {
  return (
    <section id="range-photo" className="p-0 overflow-hidden bg-dark">
      <div className="relative min-h-[420px] overflow-hidden bg-dark3">
        <img
          src="/images/rangeimg.webp"
          alt="PureWest Australia Honey Range"
          className="w-full object-cover max-h-[700px] object-[center_40%] [filter:brightness(0.88)_contrast(1.05)_saturate(0.95)]"
        />
        <div
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(8,6,4,0.35)_0%,transparent_30%,transparent_60%,rgba(8,6,4,0.7)_100%)]"
        />
        <div className="absolute left-1/2 -translate-x-1/2 text-center z-2 bg-linear-to-t from-[rgba(14,10,5,1)] to-[rgba(26,18,10,0)] w-full h-full bottom-0 flex flex-col justify-end pb-10">
          <p className="text-[0.52rem] tracking-[5px] uppercase mb-2 text-gold">
            The Collection
          </p>
          <p className="font-garamond text-2xl font-light text-white">
            Jarrah · Marri · Karri
          </p>
          <p className="text-[0.62rem] tracking-[2px] mt-2 text-text-muted">
            Harvested &amp; Bottled in Western Australia
          </p>
        </div>
      </div>
    </section>
  );
}
