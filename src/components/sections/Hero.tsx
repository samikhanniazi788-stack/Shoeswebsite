import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup the "Sticky Reveal" scale animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Scale from 1.1 down to 1
      tl.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 1 },
        { scale: 1, opacity: 0.7, ease: "none" }
      );

      // Fade text slightly as user starts scrolling out
      gsap.to(textRef.current, {
        opacity: 0,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
        },
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden flex pt-20"
    >
      <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div 
          ref={textRef} 
          className="order-2 lg:order-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-8 pb-12 lg:py-0 z-10"
        >
          <div className="space-y-6 max-w-xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-heading font-medium tracking-tight text-charcoal">
              Elevated <br /> Footwear.
            </h1>
            <p className="text-lg md:text-xl text-charcoal/70 font-light max-w-sm">
              Minimalist design. Maximum comfort. Handcrafted in Italy.
            </p>
            <div className="pt-4">
              <button className="bg-charcoal hover:bg-burnt-orange text-cream px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300">
                New Arrivals
              </button>
            </div>
          </div>
        </div>

        {/* Right Visual Image */}
        <div className="order-1 lg:order-2 relative h-[55svh] lg:h-full w-full overflow-hidden px-6 lg:px-0 lg:pr-16 pt-6 lg:pt-16 pb-0 lg:pb-16 flex items-center justify-center">
          <div className="w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden relative bg-[#EBE9E3]">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
              alt="Premium Men's Leather Shoe"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
