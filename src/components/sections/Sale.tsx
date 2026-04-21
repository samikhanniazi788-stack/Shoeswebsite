import React from "react";
import { Plus } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

const SALE_ITEMS = [
  { id: "s1", title: "Midnight Loafer", price: 180, originalPrice: 320, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000" },
  { id: "s2", title: "Suede Driver", price: 150, originalPrice: 280, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000" },
  { id: "s3", title: "Sport Runner", price: 120, originalPrice: 200, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000" },
  { id: "s4", title: "Classic Wingtip", price: 210, originalPrice: 380, image: "https://images.unsplash.com/photo-1614252339460-e1b1806cb563?q=80&w=1000" },
];

export default function Sale() {
  const { addToCart } = useCartStore();

  return (
    <section id="sale" className="w-full bg-[#EBE9E3] text-charcoal py-24 md:py-32 overflow-hidden relative">
      <div className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

      {/* Marquee Banner */}
      <div className="relative border-y-2 border-burnt-orange overflow-hidden bg-burnt-orange text-white py-4 md:py-6 transform -rotate-2 scale-105 shadow-xl mb-16 md:mb-24 z-10 flex">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center justify-start flex-shrink-0">
              {[1, 2, 3, 4].map((i) => (
                <span key={`${index}-${i}`} className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase px-4 md:px-8 flex items-center gap-4 md:gap-8 flex-shrink-0">
                  Mid-Season Sale 
                  <span className="text-white/50 text-2xl md:text-4xl">✦</span>
                  <span className="text-cream">Up to 40% Off</span>
                  <span className="text-white/50 text-2xl md:text-4xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 z-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SALE_ITEMS.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/40 mb-4 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-20 bg-charcoal text-cream text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                </div>

                <img 
                  src={item.image} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply"
                />
                
                {/* Hover Quick Add - Always visible on mobile */}
                <div className="absolute bottom-4 right-4 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 z-30">
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    className="bg-burnt-orange text-white hover:bg-charcoal p-3 rounded-full shadow-lg transition-all active:scale-95"
                    aria-label={`Add ${item.title} to cart`}
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-xl font-heading font-medium text-charcoal">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-lg font-bold text-burnt-orange">${item.price}</span>
                  <span className="text-sm font-light text-charcoal/40 line-through">${item.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
