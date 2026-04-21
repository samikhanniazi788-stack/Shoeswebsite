import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

const WOMEN_PRODUCTS = [
  { id: "w1", title: "Sculpted Heel", price: 290, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000" }, // Using elegant shoe as placeholder
  { id: "w2", title: "The Mule", price: 245, image: "https://images.unsplash.com/photo-1515347619362-e6bd2427a72d?q=80&w=1000" },
  { id: "w3", title: "Leather Ankle Boot", price: 410, image: "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?q=80&w=1000" },
];

export default function WomenCollection() {
  const { addToCart } = useCartStore();

  return (
    <section id="women" className="w-full bg-charcoal text-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header - Reversed Alignment */}
        <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-16 md:mb-24 gap-8">
          <div className="text-right">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-burnt-orange font-bold font-satoshi"
            >
              Curated for Her
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-medium tracking-tight mt-4"
            >
              Women's Line.
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="text-sm font-medium tracking-widest uppercase border-b border-cream/50 pb-1 hover:text-white hover:border-white transition-colors">
              View All Women
            </button>
          </motion.div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* Left Large Feature */}
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
             className="w-full lg:w-1/2 group relative cursor-pointer"
          >
            <div className="w-full aspect-[4/5] lg:aspect-auto lg:h-[80vh] overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 relative">
              <img 
                src={WOMEN_PRODUCTS[0].image} 
                alt={WOMEN_PRODUCTS[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              
              <div className="absolute bottom-6 right-6 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 z-20">
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(WOMEN_PRODUCTS[0]); }}
                  className="bg-cream text-charcoal hover:bg-burnt-orange hover:text-white p-3 md:p-4 rounded-full shadow-2xl transition-all active:scale-95"
                  aria-label={`Add ${WOMEN_PRODUCTS[0].title} to cart`}
                >
                  <Plus size={24} strokeWidth={2.5} />
                </button>
              </div>

              <div className="absolute left-6 md:left-8 bottom-6 md:bottom-8 z-10 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                 <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-wide text-white drop-shadow-md">
                   {WOMEN_PRODUCTS[0].title}
                 </h3>
                 <span className="text-xl font-light text-white/90 drop-shadow-md">${WOMEN_PRODUCTS[0].price}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Two Items Stack */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-10">
             {WOMEN_PRODUCTS.slice(1).map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 + (idx * 0.2), ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group relative flex flex-col gap-4 cursor-pointer sm:w-1/2 lg:w-full lg:h-1/2"
                >
                  <div className="w-full aspect-square lg:aspect-auto lg:h-full overflow-hidden rounded-2xl bg-white/5 relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                    
                    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 z-20">
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="bg-cream text-charcoal hover:bg-burnt-orange hover:text-white p-3 rounded-full shadow-2xl transition-all active:scale-95"
                        aria-label={`Add ${product.title} to cart`}
                      >
                        <Plus size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-start px-2 lg:absolute lg:top-6 lg:left-6 lg:z-10 lg:pointer-events-none drop-shadow-none lg:drop-shadow-md lg:w-[calc(100%-3rem)]">
                    <div>
                      <h3 className="text-xl md:text-2xl font-heading font-medium tracking-wide lg:text-white">{product.title}</h3>
                    </div>
                    <span className="text-lg font-light lg:text-white lg:font-medium">${product.price}</span>
                  </div>
                </motion.div>
             ))}
          </div>

        </div>

      </div>
    </section>
  );
}
