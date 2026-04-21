import React from "react";

export default function Craftsmanship() {
  return (
    <section className="w-full bg-cream text-charcoal py-24 md:py-32">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Big Text Context */}
        <div className="w-full md:w-1/3 flex flex-col justify-between mb-12 md:mb-0">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight mb-8">
              The Art of <span className="italic font-light">Making</span>.
            </h2>
            <p className="text-lg text-charcoal/70 font-light mb-12">
              Every pair is a testament to uncompromising material quality and generation-spanning technique.
            </p>
            <button className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-charcoal text-cream font-medium tracking-widest uppercase text-xs rounded-full">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-charcoal">Discover Process</span>
              <div className="absolute inset-0 bg-cream scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              <div className="absolute inset-0 border border-charcoal rounded-full z-20 pointer-events-none"></div>
            </button>
          </div>
        </div>

        {/* Visual Masonry / Stack */}
        <div className="w-full md:w-2/3 flex flex-col gap-8 md:gap-12 lg:gap-20">
          {/* Item 1 */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal/5">
              <img 
                 src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000" 
                 alt="Italian Leather"
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
            <div className="flex justify-between items-start pt-2">
              <h3 className="text-2xl font-heading font-medium">01. Premium Materials</h3>
              <p className="text-sm font-light text-charcoal/60 max-w-[200px] text-right">Full-grain Tuscan leather.</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col gap-4 relative md:right-[-4rem] lg:right-[-6rem]">
            <div className="w-full md:w-[90%] aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal/5">
              <img 
                 src="https://images.unsplash.com/photo-1620809151520-5fbd841bcfa7?q=80&w=1000" 
                 alt="Sole Detail" 
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
            <div className="flex justify-between items-start pt-2 w-full md:w-[90%]">
              <h3 className="text-2xl font-heading font-medium">02. Cloud-Core Sole</h3>
              <p className="text-sm font-light text-charcoal/60 max-w-[200px] text-right">High-density memory foam.</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl bg-charcoal/5">
              <img 
                 src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000" 
                 alt="Footwear construction" 
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
            <div className="flex justify-between items-start pt-2">
              <h3 className="text-2xl font-heading font-medium">03. Generations</h3>
              <p className="text-sm font-light text-charcoal/60 max-w-[200px] text-right">Built to last, indefinitely.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
