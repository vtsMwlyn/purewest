export default function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 bg-gold [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)] ${i < rating ? 'opacity-100' : 'opacity-30'}`}
        />
      ))}
    </div>
  );
}
