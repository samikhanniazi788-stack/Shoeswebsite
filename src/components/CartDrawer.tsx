import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Plus, Minus, Truck } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const FREE_SHIPPING_THRESHOLD = 300;

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountLeft = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[450px] h-[100svh] bg-cream shadow-2xl z-[101] flex flex-col pt-4 md:pt-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10 h-20 shrink-0">
              <h2 className="font-heading font-medium text-2xl">Your Cart ({items.reduce((a,b)=>a+b.quantity, 0)})</h2>
              <button 
                onClick={closeDrawer}
                className="p-2 hover:bg-charcoal/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-burnt-orange"
              >
                <X size={24} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-4 border-b border-charcoal/10 bg-white/50 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={16} className={amountLeft === 0 ? "text-burnt-orange" : "text-charcoal/60"} />
                <span className="text-xs font-medium uppercase tracking-widest">
                  {amountLeft > 0 
                    ? `Spend $${amountLeft.toLocaleString()} more for free shipping` 
                    : "You unlocked free shipping!"}
                </span>
              </div>
              <div className="w-full h-1 bg-charcoal/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-burnt-orange transition-all duration-700 ease-out" 
                  style={{ width: `${shippingProgress}%` }} 
                />
              </div>
            </div>

            {/* Items Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-charcoal/50">
                  <p className="text-lg font-light">Your cart is empty.</p>
                  <button 
                    onClick={closeDrawer}
                    className="mt-6 text-sm uppercase tracking-widest font-medium border-b border-charcoal/50 pb-1 hover:text-charcoal transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-24 h-28 md:w-28 md:h-32 rounded-xl overflow-hidden bg-charcoal/5 flex-shrink-0 relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-charcoal font-heading leading-tight md:text-lg">{item.title}</h3>
                          <p className="text-sm font-light text-charcoal/60 mt-1">${item.price}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-charcoal/30 hover:text-red-500 transition-colors p-1 -mt-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-charcoal/20 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-charcoal hover:bg-charcoal/5 rounded-l-full transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-charcoal hover:bg-charcoal/5 rounded-r-full transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="ml-auto font-medium text-charcoal">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-charcoal/10 bg-white shrink-0">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-light text-charcoal/70">Subtotal</span>
                  <div className="text-right">
                    <span className="text-2xl font-medium font-heading block">${subtotal.toLocaleString()}</span>
                    <span className="text-xs text-charcoal/50">Taxes & shipping calculated at checkout</span>
                  </div>
                </div>
                <button className="w-full bg-charcoal hover:bg-burnt-orange text-cream py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
