type Props = {
  kicker: string;
  title: React.ReactNode;
  desc?: string;
  className?: string;
};

export function SectionTitle({ kicker, title, desc, className = "" }: Props) {
  return (
    <div className={`mb-10 ${className}`}>
      <span className="mb-3 block text-xs tracking-[0.28em] text-mb-gold font-bold uppercase">
        {kicker}
      </span>
      <h2 className="font-display text-4xl font-bold leading-[0.9] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter">
        {title}
      </h2>
      {desc ? <p className="mt-6 max-w-2xl text-lg text-white/40 font-light leading-relaxed">{desc}</p> : null}
    </div>
  );
}
