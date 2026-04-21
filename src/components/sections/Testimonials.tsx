import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    quote: "The most comfortable leather footwear I've ever owned. They instantly mold to your feet without any painful break-in period.",
    author: "James T.",
    role: "Creative Director"
  },
  {
    id: 2,
    quote: "Exceptional craftsmanship. You can instantly feel the quality of the Tuscan leather and the memory foam sole is a game-changer.",
    author: "Elena R.",
    role: "Architect"
  },
  {
    id: 3,
    quote: "I've replaced my entire office rotation with soShoes. The perfect balance between professional elegance and all-day comfort.",
    author: "Michael B.",
    role: "Financial Analyst"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    // Add wrap-around logic
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = REVIEWS.length - 1;
      if (nextIndex >= REVIEWS.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="w-full bg-cream text-charcoal py-24 md:py-32 overflow-hidden border-t border-charcoal/5">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        
        <Quote size={48} className="text-burnt-orange mb-12 opacity-80" />

        <div className="relative w-full max-w-4xl min-h-[250px] md:min-h-[200px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full flex flex-col items-center text-center"
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-light leading-snug tracking-tight mb-8">
                "{REVIEWS[currentIndex].quote}"
              </h3>
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold tracking-widest uppercase text-sm">
                  {REVIEWS[currentIndex].author}
                </span>
                <span className="text-charcoal/50 text-xs tracking-widest uppercase">
                  {REVIEWS[currentIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-16 z-10">
          <button 
            onClick={() => paginate(-1)}
            className="p-4 border border-charcoal/20 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-300 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => paginate(1)}
            className="p-4 border border-charcoal/20 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-300 active:scale-95"
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
