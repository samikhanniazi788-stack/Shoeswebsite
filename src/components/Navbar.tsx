import { useEffect, useState } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { openDrawer, items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 pointer-events-auto",
          // Desktop: 80px height, 4rem inline padding. Mobile: 64px height, 1.5rem inline padding.
          "h-16 px-6 md:h-20 md:px-16",
          scrolled || mobileMenuOpen
            ? "bg-cream/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent text-charcoal"
        )}
      >
        {/* Brand */}
        <div className="flex-[1] flex items-center z-50">
          <a
            href="#"
            className="text-2xl md:text-3xl font-heading font-medium tracking-wider text-charcoal hover:opacity-80 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            soShoes
          </a>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex flex-[2] items-center justify-center gap-8">
          {["Men", "Women", "Premium", "Sale"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="group relative text-[13px] tracking-widest uppercase font-medium text-charcoal/80 hover:text-charcoal transition-colors"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-charcoal transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex-[1] flex items-center justify-end gap-5 z-50">
          <button className="hidden md:block text-charcoal hover:text-burnt-orange transition-colors" aria-label="Search">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button className="hidden md:block text-charcoal hover:text-burnt-orange transition-colors" aria-label="Account">
            <User size={22} strokeWidth={1.5} />
          </button>
          <button 
            className="text-charcoal hover:text-burnt-orange transition-colors relative"
            onClick={openDrawer}
            aria-label="Cart"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="absolute -top-1.5 -right-2 bg-burnt-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          
          <button 
            className="md:hidden text-charcoal ml-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-cream z-40 flex flex-col md:hidden pt-24 px-6 pb-6"
          >
            <div className="flex flex-col gap-6 w-full">
              {["Men", "Women", "Premium", "Sale"].map((link, i) => (
                <motion.a
                  key={link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-heading font-medium tracking-wide text-charcoal border-b border-charcoal/10 pb-4"
                >
                  {link}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-auto flex flex-col gap-6"
            >
              <button className="flex items-center gap-3 text-lg font-light text-charcoal">
                <Search size={24} /> Search
              </button>
              <button className="flex items-center gap-3 text-lg font-light text-charcoal">
                <User size={24} /> Account
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
