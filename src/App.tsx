import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Preloader from "./components/Preloader";
import { Hero, MenCollection, WomenCollection, HorizontalScroll, Sale, Craftsmanship, Testimonials } from "./components/sections";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      lerp: 0.1,
      // @ts-ignore
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Provide anchor scroll handling with offset
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href") || "";
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Add a proper offset calculation (-80px) so navbar does not hide the heading
            lenis.scrollTo(targetElement, { offset: -80 });
          }
        }
      });
    });

    // Handle GSAP resize refresh
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // Add lenis class to html
    document.documentElement.classList.add("lenis");

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="w-full relative bg-cream selection:bg-burnt-orange selection:text-white">
      {/* Universal Premium Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025] mix-blend-multiply bg-noise" />

      <Preloader />
      <Navbar />
      <CartDrawer />
      <Hero />
      <MenCollection />
      <WomenCollection />
      <HorizontalScroll />
      <Testimonials />
      <Sale />
      <Craftsmanship />
      <Footer />
    </main>
  );
}
