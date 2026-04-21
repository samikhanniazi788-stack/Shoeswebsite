import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while preloading
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      // Simulate uneven loading speeds for better feel
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        // Add a tiny delay at 100% before sliding up
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 600);
      }
      setProgress(current);
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%", opacity: 0.9 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-charcoal text-cream flex flex-col justify-end p-8 md:p-16 pointer-events-none"
        >
          <div className="w-full flex justify-between items-end">
             <div className="overflow-hidden pb-2">
                <motion.h1 
                  initial={{ y: "110%" }} 
                  animate={{ y: 0 }} 
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }} 
                  className="font-heading font-medium tracking-tight text-5xl md:text-8xl lg:text-[10vw] leading-[0.85]"
                >
                  soShoes<span className="text-burnt-orange">.</span>
                </motion.h1>
             </div>
             
             <div className="overflow-hidden pb-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="font-mono text-4xl md:text-6xl lg:text-[8vw] font-light leading-none"
               >
                 {progress}%
               </motion.div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
