import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useCartStore } from "../../store/cartStore";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { id: "p1", title: "Oxford Classic", price: 285, image: "https://images.unsplash.com/photo-1614252339460-e1b1806cb563?q=80&w=1000" },
  { id: "p2", title: "Velvet Loafer", price: 320, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000" },
  { id: "p3", title: "Urban Derby", price: 250, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000" },
  { id: "p4", title: "Chelsea Boot", price: 295, image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000" },
  { id: "p5", title: "Double Monk", price: 340, image: "https://images.unsplash.com/photo-1620809151520-5fbd841bcfa7?q=80&w=1000" },
  { id: "p6", title: "Suede Chukka", price: 270, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000" },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  
  const { addToCart } = useCartStore();

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {});
    const mm = gsap.matchMedia();

    // Desktop: Pin and animate horizontally
    mm.add("(min-width: 1024px)", () => {
      ctx.add(() => {
        const wrapper = scrollWrapperRef.current;
        const container = sectionRef.current;
        if (!wrapper || !container) return;

        const getScrollAmount = () => {
          const wrapperWidth = wrapper.scrollWidth;
          const windowWidth = window.innerWidth;
          return -(wrapperWidth - windowWidth);
        };
        
        gsap.to(wrapper, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${wrapper.scrollWidth - window.innerWidth}`, 
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      if (scrollWrapperRef.current) {
         gsap.set(scrollWrapperRef.current, { clearProps: "all" });
      }
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section 
      id="premium"
      ref={sectionRef} 
      className="relative w-full lg:h-screen bg-charcoal text-cream overflow-hidden py-16 lg:py-0 flex flex-col justify-center"
    >
      <div className="lg:absolute top-16 left-0 z-10 w-full px-6 md:px-12 lg:px-16 flex justify-between items-end mb-8 lg:mb-0">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight">
          Classics
        </h2>
        <span className="hidden lg:block text-xs uppercase tracking-widest text-cream/60 pb-2">
          Scroll to explore
        </span>
      </div>

      <div className="w-full h-full lg:h-[70vh] flex items-center mt-4 lg:mt-24">
        { /* Mobile: native horizontal scroll. Desktop: GSAP controlled wrapper */ }
        <div
          ref={scrollWrapperRef}
          className="flex gap-4 md:gap-6 lg:gap-8 px-6 md:px-12 lg:px-16 w-full lg:w-max overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar"
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative w-[80vw] sm:w-[45vw] lg:w-[28vw] xl:w-[22vw] flex-shrink-0 snap-center cursor-pointer aspect-[3/4] flex flex-col justify-end"
            >
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white/5">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out lg:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />
              </div>

              {/* Action Button */}
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ ...product });
                  }}
                  className="bg-cream/90 backdrop-blur-sm text-charcoal hover:bg-burnt-orange hover:text-white p-3 rounded-full flex items-center justify-center transition-colors shadow-sm active:scale-95"
                  aria-label={`Add ${product.title} to cart`}
                >
                  <Plus size={18} strokeWidth={2} />
                </button>
              </div>

              {/* Product Info - Minimalist */}
              <div className="relative z-10 p-5 w-full bg-gradient-to-t from-charcoal/80 to-transparent pt-12 rounded-b-2xl">
                <div className="flex justify-between items-end">
                  <h3 className="text-xl lg:text-2xl font-heading font-medium tracking-wide text-white">
                    {product.title}
                  </h3>
                  <span className="text-lg font-light text-white">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
