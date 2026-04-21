import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 1,
    title: "The Oxford Classic",
    price: "$285",
    image: "https://images.unsplash.com/photo-1614252339460-e1b1806cb563?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Velvet Loafer",
    price: "$320",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Urban Derby",
    price: "$250",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Chelsea Minimal",
    price: "$295",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Featured() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const scrollWrapper = scrollWrapperRef.current;

      if (!container || !scrollWrapper) return;

      const getScrollAmount = () => {
        const wrapperWidth = scrollWrapper.scrollWidth;
        const windowWidth = window.innerWidth;
        const mobilePadding = windowWidth < 768 ? 48 : 96; // Adjust padding on mobile manually px-6 vs px-12
        return -(wrapperWidth - windowWidth + mobilePadding);
      };

      const tween = gsap.to(scrollWrapper, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] bg-charcoal text-cream overflow-hidden py-16">
      {/* Header */}
      <div className="absolute top-12 md:top-16 left-6 md:left-12 z-10 w-full pr-12 flex justify-between items-end">
        <h2 className="text-4xl md:text-7xl font-heading font-light tracking-tight">
          Featured <br /> <span className="italic font-medium">Classics</span>.
        </h2>
        <span className="hidden md:block text-sm uppercase tracking-widest text-cream/60 mr-12 pb-2">
          Swipe/Scroll to explore
        </span>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center mt-16 md:mt-12">
        <div
          ref={scrollWrapperRef}
          className="flex gap-6 md:gap-8 px-6 md:px-12 w-max items-center"
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative w-[80vw] md:w-[40vw] lg:w-[35vw] flex-shrink-0 cursor-pointer h-[55svh] md:h-[65svh] flex flex-col justify-end"
            >
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-white/5">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Hover Quick Add */}
              <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                <button className="bg-cream text-charcoal hover:bg-burnt-orange hover:text-white p-3 rounded-full flex items-center justify-center transition-colors">
                  <Plus size={20} />
                </button>
              </div>

              {/* Product Info */}
              <div className="relative z-10 p-5 md:p-8 flex justify-between items-end w-full translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-cream/70 mb-1 md:mb-2">New Arrival</span>
                  <h3 className="text-xl md:text-3xl font-heading font-medium tracking-wide">
                    {product.title}
                  </h3>
                </div>
                <span className="text-lg md:text-2xl font-light">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
