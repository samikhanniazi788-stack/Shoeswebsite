import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

const MEN_PRODUCTS = [
  { id: "m1", title: "The Executive", price: 350, image: "https://images.unsplash.com/photo-1614252235316-09037df663d2?q=80&w=1000" },
  { id: "m2", title: "Nomad Boot", price: 420, image: "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?q=80&w=1000" },
  { id: "m3", title: "City Sneaker", price: 195, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000" },
];

export default function MenCollection() {
  const { addToCart } = useCartStore();

  return (
    <section id="men" className="w-full bg-cream text-charcoal py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-burnt-orange font-bold font-satoshi"
            >
              Curated for Him
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-medium tracking-tight mt-4"
            >
              The Men's Edit.
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="text-sm font-medium tracking-widest uppercase border-b border-charcoal pb-1 hover:text-burnt-orange hover:border-burnt-orange transition-colors">
              View All Men
            </button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {MEN_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative flex flex-col gap-4 cursor-pointer"
            >
              <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal/5 relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Floating Add Button - Always visible on mobile, hover on desktop */}
                <div className="absolute bottom-6 right-6 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...product });
                    }}
                    className="bg-cream text-charcoal hover:bg-burnt-orange hover:text-white p-3 md:p-4 rounded-full shadow-xl transition-all active:scale-95"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-2xl font-heading font-medium tracking-wide">{product.title}</h3>
                  <p className="text-sm font-light text-charcoal/60 mt-1">Italian Leather</p>
                </div>
                <span className="text-xl font-light">${product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
