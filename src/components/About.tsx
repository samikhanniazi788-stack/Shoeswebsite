import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Image (Moves slower than scroll)
      gsap.fromTo(
        imageRef.current,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text fade in and up
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );

      // Number counter animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        onEnter: () => {
          let currentParams = { val: 0 };
          gsap.to(currentParams, {
            val: 10000,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              setCount(Math.floor(currentParams.val));
            },
          });
        },
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] flex flex-col md:flex-row bg-cream overflow-hidden">
      {/* Left: Full bleed image with parallax */}
      <div className="w-full md:w-1/2 h-[45svh] md:h-[100svh] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop"
            alt="Shoemaking craftsmanship"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-90"
          />
        </div>
      </div>

      {/* Right: Text block */}
      <div className="w-full md:w-1/2 h-full min-h-[55svh] md:min-h-[100svh] flex items-center justify-center p-8 md:p-16 lg:p-24">
        <div ref={textRef} className="max-w-md w-full space-y-6 md:space-y-8">
          <div>
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-burnt-orange font-bold">
              The Craft
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mt-2 md:mt-4 mb-4 md:mb-6 leading-[1.1]">
              Italian Leather <br /> <span className="font-medium italic">Meets Comfort</span>.
            </h2>
            <p className="text-charcoal/70 text-base md:text-lg leading-relaxed font-light">
              Every pair of soShoes is meticulously handcrafted in small batches.
              We combine traditional cobbling techniques with modern ergonomic 
              technologies—providing you with unmatched durability, out-of-the-box 
              comfort, and timeless aesthetics.
            </p>
          </div>

          <div className="pt-6 md:pt-8 border-t border-charcoal/10 flex items-end gap-3 md:gap-4">
            <div className="text-4xl md:text-6xl font-heading font-medium tracking-tighter">
              {count.toLocaleString()}<span className="text-burnt-orange font-light">+</span>
            </div>
            <div className="text-[10px] md:text-sm uppercase tracking-widest text-charcoal/60 pb-1 md:pb-2 leading-tight md:leading-normal">
              Happy Steps <br className="md:hidden" /> Taken
            </div>
          </div>
          
          <button className="group relative overflow-hidden inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-charcoal text-cream font-medium tracking-widest uppercase text-xs md:text-sm rounded-full w-full sm:w-auto mt-4 md:mt-0">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-charcoal">Read Our Story</span>
            <div className="absolute inset-0 bg-cream scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            <div className="absolute inset-0 border border-charcoal rounded-full z-20 pointer-events-none"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
