import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-24 pb-8 px-6 md:px-16 rounded-t-[40px] mt-[-40px] relative z-20">
      <div className="max-w-[1920px] mx-auto">
        {/* Top: Large Callout & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 border-b border-cream/10 pb-16">
          <div className="max-w-2xl break-words">
            <h2 className="text-[clamp(3rem,7vw,6rem)] font-heading font-light leading-[0.9] tracking-tight">
              Ready for the <br className="hidden sm:block" /> <span className="italic font-medium text-burnt-orange">smoothest</span> walk?
            </h2>
          </div>
          <div className="w-full lg:w-auto flex-1 max-w-md">
            <p className="text-cream/60 mb-4 font-light text-[11px] tracking-widest uppercase">
              Join the club for early access & 10% off.
            </p>
            <form className="relative flex items-center border-b border-cream/30 focus-within:border-cream transition-colors duration-300 pb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none placeholder:text-cream/30 text-lg font-light"
                required
              />
              <button
                type="submit"
                className="p-2 hover:bg-burnt-orange/20 rounded-full transition-colors group"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5 text-cream group-hover:text-burnt-orange transition-colors" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
          <div>
            <h4 className="font-heading font-medium tracking-wide mb-6 uppercase text-sm">Shop</h4>
            <ul className="space-y-4 text-cream/70 font-light text-sm">
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Men's Collection</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Women's Collection</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">The Premium Line</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-medium tracking-wide mb-6 uppercase text-sm">About</h4>
            <ul className="space-y-4 text-cream/70 font-light text-sm">
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-medium tracking-wide mb-6 uppercase text-sm">Support</h4>
            <ul className="space-y-4 text-cream/70 font-light text-sm">
              <li><a href="#" className="hover:text-burnt-orange transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Shoe Care Guide</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-medium tracking-wide mb-6 uppercase text-sm">Social</h4>
            <ul className="space-y-4 text-cream/70 font-light text-sm">
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-burnt-orange transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cream/10 text-[10px] sm:text-xs text-cream/40 uppercase tracking-widest gap-4">
          <p>© {new Date().getFullYear()} soShoes. All rights reserved.</p>
          <p>Made with love by soShoes</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
