import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom out slowly as we scroll down
      gsap.to(imageRef.current, {
        scale: 0.85,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 pt-28 md:pt-24 pb-12 overflow-hidden gap-8 md:gap-0"
    >
      {/* Left Column */}
      <div className="w-full md:w-[45%] flex flex-col justify-center items-center md:items-start text-center md:text-left z-10 space-y-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] leading-[1] md:leading-[0.9] font-heading font-medium tracking-tight text-charcoal w-full">
          Step Into <br className="hidden md:block" /> The <span className="italic font-light">Smoothness</span>.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-md font-light leading-relaxed">
          Premium Handcrafted Leather. <br className="hidden md:block" /> Free Shipping on First Order.
        </p>
        <div className="pt-2 md:pt-4">
          <button className="bg-burnt-orange hover:bg-black text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase font-semibold transition-colors duration-300">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Right Column / Image Parallax */}
      <div className="w-full md:w-[55%] h-[40svh] md:h-full relative flex items-center justify-center md:p-6 lg:p-12">
        <div className="w-full h-full relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
            alt="Premium Men's Leather Shoe"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center origin-center scale-110"
          />
        </div>
      </div>
    </section>
  );
}
