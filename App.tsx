
import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from './constants';
import { Product, Category, Brand, CartItem, Order } from './types';
import { gsap } from 'gsap';

// --- Icons ---
const Icons = {
  Menu: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  ShoppingBag: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
  X: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  MessageCircle: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
  Trash2: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>,
  Plus: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Minus: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  MapPin: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Mail: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Phone: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Facebook: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
  Instagram: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  Youtube: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Award: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
  Zap: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  Shield: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  CheckCircle: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  Settings: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Search: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Edit: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Upload: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Link: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
  Image: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
};

// --- Components ---

const Navbar = ({ 
  cartCount, 
  onNavigate, 
  currentPage 
}: { 
  cartCount: number; 
  onNavigate: (page: string) => void; 
  currentPage: string 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-moto-dark/95 border-b border-moto-gray/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group flex items-center gap-4">
             {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 hover:text-moto-red transition-colors"
              >
                {isMenuOpen ? <Icons.X /> : <Icons.Menu />}
              </button>
            </div>
            <div onClick={() => handleNav('home')} className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic transition-transform group-hover:skew-x-[-10deg]">
                <span className="text-white">Moto</span>
                <span className="text-moto-red">Verse</span>
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['home', 'shop', 'about', 'contact'].map((page) => (
                <button 
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`${currentPage === page ? 'text-white border-b-2 border-moto-red' : 'text-gray-400 hover:text-white'} px-1 py-2 text-sm font-bold transition-all uppercase tracking-wide`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNav('cart')}
              className="relative p-2 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="group-hover:scale-110 transition-transform">
                <Icons.ShoppingBag />
              </div>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-moto-red rounded-full shadow-lg shadow-red-900/50">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-moto-black border-b border-gray-800 animate-in slide-in-from-top-2 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {['home', 'shop', 'about', 'contact'].map((page) => (
                <button 
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`block w-full text-left px-3 py-4 text-base font-black uppercase tracking-widest ${currentPage === page ? 'text-moto-red bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                >
                  {page}
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Reveal
      gsap.fromTo(".hero-line", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );

      // HUD Animation
      const rpmObj = { val: 0 };
      gsap.to(rpmObj, {
        val: 14500,
        duration: 2,
        ease: "power2.out",
        delay: 1,
        onUpdate: () => {
           const el = document.getElementById("rpm-counter");
           if(el) el.innerText = Math.floor(rpmObj.val).toString();
        }
      });

      gsap.fromTo(".hud-panel", 
         { x: 50, opacity: 0 },
         { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-moto-black">
        {/* Video Background */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-moto-black/90 via-moto-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-moto-black via-transparent to-transparent z-10"></div>
            <video
                className="w-full h-full object-cover scale-x-[-1] opacity-80"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="https://res.cloudinary.com/dwk9hwmci/video/upload/v1763792766/mixkit-motorcyclist-crossing-a-desert-surrounded-by-mountains-39926-hd-ready_omfn3s.mp4" type="video/mp4" />
            </video>
        </div>

        {/* Content */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-5xl">
                <div className="overflow-hidden mb-2">
                   <p className="hero-line text-moto-red font-bold tracking-[0.5em] text-sm uppercase">Authorized Dealer</p>
                </div>
                <div className="overflow-hidden -mb-4 md:-mb-8">
                   <h1 className="hero-line text-[12vw] md:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600 leading-none tracking-tighter italic uppercase">
                     PURE
                   </h1>
                </div>
                <div className="overflow-hidden mb-8">
                   <h1 className="hero-line text-[12vw] md:text-[140px] font-black text-white leading-none tracking-tighter italic uppercase mix-blend-overlay">
                     SPEED
                   </h1>
                </div>
                
                <div className="overflow-hidden max-w-xl mb-10">
                    <p className="hero-line text-gray-400 text-lg md:text-xl border-l-2 border-moto-red pl-6">
                        The world's finest gasoline machines from Honda, Yamaha, KTM, and Ducati. 
                        No batteries. Just adrenaline.
                    </p>
                </div>

                <div className="hero-line">
                    <button 
                        onClick={onShopNow}
                        className="group bg-moto-red hover:bg-white hover:text-moto-red text-white px-10 py-5 text-lg font-black uppercase tracking-widest transition-all transform -skew-x-12 hover:skew-x-0"
                    >
                        <div className="flex items-center gap-3 skew-x-12 group-hover:skew-x-0 transition-transform">
                            View Showroom <Icons.ArrowRight />
                        </div>
                    </button>
                </div>
            </div>

            {/* HUD Elements */}
            <div className="hud-panel absolute right-4 bottom-32 md:bottom-1/2 md:translate-y-1/2 hidden md:flex flex-col gap-4 items-end">
                 <div className="bg-black/40 backdrop-blur-lg border border-white/10 p-6 rounded-xl w-72 skew-x-[-10deg] hover:skew-x-0 transition-transform duration-500">
                    <div className="flex justify-between items-baseline border-b border-white/10 pb-2 mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Engine Load</span>
                        <span className="text-moto-red font-black text-lg animate-pulse">98%</span>
                    </div>
                    <div className="flex justify-between items-end">
                         <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">RPM</span>
                         <span id="rpm-counter" className="text-5xl font-mono font-black text-white tracking-tighter">0</span>
                    </div>
                 </div>
                 
                 <div className="bg-moto-red p-6 w-64 skew-x-[-10deg] shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                     <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">New Arrival</p>
                     <p className="text-white text-2xl font-black italic uppercase">H2 Carbon</p>
                 </div>
            </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gray-500">
             <Icons.ArrowRight className="rotate-90 w-6 h-6" />
        </div>
    </div>
  );
};

const BrandStrip = () => {
  const brands = [
    "HONDA", "YAMAHA", "KTM", "DUCATI", "BMW", "KAWASAKI", "DAYTONA", "BOXER"
  ];

  return (
    <div className="w-full bg-moto-gray border-y border-gray-800 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">Authorized Dealer For</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, i) => (
            <h3 key={i} className="text-xl md:text-3xl font-black text-white tracking-tighter hover:text-moto-red transition-colors cursor-default">
              {brand}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

const LegendaryRide = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 768) return; // Disable on mobile
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="py-24 bg-moto-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-moto-red/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <h4 className="text-moto-red font-bold tracking-[0.3em] uppercase mb-4 animate-pulse-slow">Bike of the Month</h4>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic leading-none mb-6">
              Legendary <br/>Status
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
              Experience the pinnacle of supercharged engineering. The Kawasaki Ninja H2 Carbon isn't just a bike; it's a statement of raw power and aerodynamic perfection.
            </p>
            
            <div className="grid grid-cols-3 gap-6 border-t border-gray-800 pt-8">
              <div>
                <p className="text-3xl md:text-4xl font-black text-white">228<span className="text-sm align-top text-moto-red ml-1">HP</span></p>
                <p className="text-xs text-gray-500 uppercase font-bold mt-1">Horsepower</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-white">330<span className="text-sm align-top text-moto-red ml-1">KM/H</span></p>
                <p className="text-xs text-gray-500 uppercase font-bold mt-1">Top Speed</p>
              </div>
               <div>
                <p className="text-3xl md:text-4xl font-black text-white">H2<span className="text-sm align-top text-moto-red ml-1">R</span></p>
                <p className="text-xs text-gray-500 uppercase font-bold mt-1">Engine</p>
              </div>
            </div>
          </div>

          {/* 3D Tilt Card */}
          <div className="flex-1 perspective-1000 w-full flex justify-center">
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md h-[400px] md:h-[500px] transition-transform duration-100 ease-out preserve-3d cursor-pointer"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-gray-700 shadow-2xl overflow-hidden preserve-3d group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                
                <div className="h-3/4 overflow-hidden preserve-3d">
                   <img 
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-full object-cover transform translate-z-10 group-hover:scale-110 transition-transform duration-700"
                    style={{ transform: 'translateZ(20px)' }}
                    alt="Ninja H2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="absolute bottom-8 left-8 preserve-3d" style={{ transform: 'translateZ(60px)' }}>
                  <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase">Ninja H2 Carbon</h3>
                  <div className="h-1 w-12 bg-moto-red mt-2"></div>
                </div>

                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"
                  style={{
                    transform: `translateX(${rotation.y * 2}px) translateY(${rotation.x * 2}px)`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  const features = [
    {
      icon: <Icons.Award />,
      title: "Certified Excellence",
      desc: "Every bike is inspected by master technicians."
    },
    {
      icon: <Icons.Zap />,
      title: "Expert Support",
      desc: "Professional guidance to find your perfect machine."
    },
    {
      icon: <Icons.Shield />,
      title: "Global Warranty",
      desc: "Comprehensive coverage on all new models."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-moto-black to-moto-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="bg-moto-gray/20 p-8 rounded-2xl border border-gray-800 hover:border-moto-red/50 transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-moto-dark w-16 h-16 rounded-full flex items-center justify-center text-moto-red mb-6 group-hover:scale-110 transition-transform border border-gray-700 group-hover:border-moto-red">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryShowcase = ({ onSelectCategory }: { onSelectCategory: (c: string) => void }) => {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
       <h2 className="text-4xl md:text-5xl font-black mb-12 uppercase italic">
        Shop By <span className="text-moto-red">Category</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[500px]">
        {/* Bikes */}
        <div 
          onClick={() => onSelectCategory(Category.BIKES)}
          className="relative h-64 md:h-auto md:col-span-2 rounded-2xl overflow-hidden cursor-pointer group border border-gray-800"
        >
          <img 
            src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
            alt="Motorcycles"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-3xl font-black uppercase italic">Motorcycles</h3>
            <p className="text-gray-300 mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              Browse Inventory <Icons.ArrowRight />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Parts */}
          <div 
            onClick={() => onSelectCategory(Category.PARTS)}
            className="relative h-48 md:h-auto flex-1 rounded-2xl overflow-hidden cursor-pointer group border border-gray-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1563824643776-0834d6088248?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
              alt="Parts"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-2xl font-black uppercase italic">Performance Parts</h3>
            </div>
          </div>

          {/* Gear */}
          <div 
            onClick={() => onSelectCategory(Category.ACCESSORIES)}
            className="relative h-48 md:h-auto flex-1 rounded-2xl overflow-hidden cursor-pointer group border border-gray-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1545544198-893249207d55?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
              alt="Accessories"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-2xl font-black uppercase italic">Riding Gear</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <div className="bg-moto-black py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute w-96 h-96 bg-moto-red rounded-full blur-[150px] -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-blue-900 rounded-full blur-[150px] bottom-0 right-0"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
             <h4 className="text-moto-red font-bold tracking-[0.3em] uppercase mb-4">Who We Are</h4>
            <h2 className="text-5xl font-black text-white uppercase italic leading-none mb-8">
              Born in the <br/><span className="text-gray-600">Dust & Speed</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                MotoVerse started with a simple obsession: the perfect ride. Founded in the heart of Casablanca, we realized that the thrill of two wheels wasn't just about transportation—it was about freedom, mechanics, and the community that rides together.
              </p>
              <p>
                We aren't just a dealership. We are a sanctuary for petrol-heads. Whether you are looking for a reliable Boxer 150X for the daily commute or a track-ready Ducati Panigale V4, our mission is to connect man and machine.
              </p>
              <p>
                Our team consists of dedicated enthusiasts and master mechanics who live and breathe motorcycles, ensuring that you get not just a bike, but an experience backed by real expertise.
              </p>
            </div>
            
            <div className="mt-10 flex gap-8">
               <div>
                 <p className="text-4xl font-black text-white">15+</p>
                 <p className="text-sm text-gray-500 uppercase font-bold">Years Experience</p>
               </div>
               <div>
                 <p className="text-4xl font-black text-white">5k+</p>
                 <p className="text-sm text-gray-500 uppercase font-bold">Bikes Sold</p>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
             <div className="absolute -inset-4 border-2 border-moto-red/30 rounded-xl transform translate-x-4 translate-y-4 z-0"></div>
             <img 
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop" 
              className="w-full rounded-xl grayscale hover:grayscale-0 transition-all duration-700 relative z-10 shadow-2xl"
              alt="MotoVerse Showroom" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Newsletter = () => (
  <div className="py-24 bg-moto-red relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic">Join the <br/> Paddock</h2>
          <p className="text-red-100 mb-8 text-lg leading-relaxed max-w-md">
            Get exclusive access to new arrivals, track days, and expert maintenance tips. Join 15,000+ riders in Morocco.
          </p>
          
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 text-white font-bold">
                <div className="bg-white/20 p-3 rounded-full"><Icons.Phone className="w-5 h-5" /></div>
                <span>+212 600 123 456</span>
             </div>
             <div className="flex items-center gap-4 text-white font-bold">
                <div className="bg-white/20 p-3 rounded-full"><Icons.Mail className="w-5 h-5" /></div>
                <span>contact@motoverse.ma</span>
             </div>
          </div>

          <div className="flex gap-4 mt-8">
            {[Icons.Facebook, Icons.Instagram, Icons.Youtube].map((Icon, i) => (
              <button key={i} className="bg-white text-moto-red p-4 rounded-full hover:bg-moto-black hover:text-white transition-all duration-300 hover:scale-110">
                <Icon className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-moto-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Quick Subscribe</h3>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
            />
            <button className="px-8 py-4 bg-white text-moto-red font-black rounded-xl hover:bg-gray-100 transition-colors uppercase tracking-wide">
              Sign Up
            </button>
            <p className="text-xs text-white/40 text-center mt-2">No spam. Just speed.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Shop = ({ 
  products,
  onAddToCart, 
  initialCategory 
}: { 
  products: Product[];
  onAddToCart: (p: Product) => void; 
  initialCategory?: string;
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Derive unique brands from the actual inventory for the filter list
  const availableBrands = ['All', ...Array.from(new Set(products.map(p => p.brand))).sort()];

  useEffect(() => {
    if(initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setShowFilters(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowFilters(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowFilters(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [selectedBrand, selectedCategory, searchQuery]);

  const filteredProducts = products.filter(product => {
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    const catMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && catMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h2 className="text-4xl font-black mb-8 uppercase italic text-white">
        Current <span className="text-moto-red">Inventory</span>
      </h2>
      
      <div className={`
        mb-12 bg-moto-gray/20 backdrop-blur-md border border-white/5 rounded-2xl p-6 
        sticky top-24 z-40 shadow-2xl
        transform transition-all duration-500 ease-in-out
        ${showFilters ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0 pointer-events-none'}
      `}>
        <div className="relative mb-8 group">
            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-moto-red transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH INVENTORY (e.g., Yamaha R1, Exhaust...)" 
              className="w-full bg-moto-black/50 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-moto-red focus:ring-1 focus:ring-moto-red outline-none transition-all font-mono uppercase tracking-wider"
            />
        </div>

        <div className="space-y-6">
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">Category</p>
                <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className={`px-6 py-2 rounded-lg font-black uppercase text-sm tracking-wider transition-all clip-path-slant ${selectedCategory === 'All' ? 'bg-white text-moto-black scale-105' : 'bg-moto-black text-gray-400 hover:bg-gray-800'}`}
                    >
                        All
                    </button>
                    {Object.values(Category).map(c => (
                        <button 
                            key={c}
                            onClick={() => setSelectedCategory(c)}
                            className={`px-6 py-2 rounded-lg font-black uppercase text-sm tracking-wider transition-all ${selectedCategory === c ? 'bg-moto-red text-white scale-105 shadow-lg shadow-red-900/50' : 'bg-moto-black text-gray-400 hover:bg-gray-800'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">Manufacturer</p>
                <div className="flex flex-wrap gap-2">
                    {availableBrands.map(b => (
                        <button 
                            key={b}
                            onClick={() => setSelectedBrand(b)}
                            className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide border transition-all ${selectedBrand === b ? 'border-moto-red text-moto-red bg-moto-red/10' : 'border-transparent text-gray-600 hover:text-gray-300'}`}
                        >
                            {b}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-moto-gray rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-300 group border border-gray-800 flex flex-col h-full relative">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-moto-black/80 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase text-moto-red border border-moto-red/30">
                {product.brand}
              </div>
              
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-full h-[2px] bg-moto-red shadow-[0_0_15px_#DC2626] animate-scan opacity-80"></div>
                <div className="absolute inset-0 bg-moto-red/10 mix-blend-overlay"></div>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 relative z-10 bg-moto-gray">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
              </div>
              <span className="text-2xl font-black text-moto-red mb-4 block">{product.price.toLocaleString()} MAD</span>
              
              <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1">{product.description}</p>
              
              {product.specs && (
                <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-gray-500 border-t border-gray-700 pt-4">
                  <div>
                    <span className="block text-gray-300 font-bold">Engine</span>
                    {product.specs.engine}
                  </div>
                  <div>
                    <span className="block text-gray-300 font-bold">Power</span>
                    {product.specs.power}
                  </div>
                  <div>
                    <span className="block text-gray-300 font-bold">Weight</span>
                    {product.specs.weight}
                  </div>
                </div>
              )}

              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-white hover:bg-gray-200 text-moto-black font-bold py-4 rounded-lg transition-all uppercase text-sm tracking-wider flex items-center justify-center gap-2 group-hover:bg-moto-red group-hover:text-white active:scale-95"
              >
                <Icons.Plus /> Add to Garage
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
         <div className="text-center py-20 text-gray-500">
           <h3 className="text-2xl font-bold mb-2">No matches found</h3>
           <p>Try adjusting your filters or search query.</p>
         </div>
      )}
    </div>
  );
};

const CartView = ({ 
  items, 
  onUpdateQty, 
  onRemove,
  onCheckout
}: { 
  items: CartItem[]; 
  onUpdateQty: (id: string, delta: number) => void; 
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <div className="bg-moto-gray p-8 rounded-full mb-6">
          <Icons.ShoppingBag />
        </div>
        <h2 className="text-3xl font-black uppercase italic text-white">Garage is empty</h2>
        <p className="mt-2 text-lg">Go add some machines.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-black mb-12 flex items-center gap-3 uppercase italic">
        <span className="text-moto-red">Your</span> Garage
      </h2>
      <div className="bg-moto-gray rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        {items.map(item => (
          <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl" />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">{item.name}</h3>
              <p className="text-moto-red font-mono font-bold text-lg mt-1">{item.price.toLocaleString()} MAD</p>
            </div>
            <div className="flex items-center bg-moto-dark rounded-full border border-gray-700 p-1">
              <button 
                onClick={() => onUpdateQty(item.id, -1)}
                className="p-3 hover:text-moto-red transition-colors rounded-full hover:bg-white/10"
              >
                <Icons.Minus />
              </button>
              <span className="w-12 text-center font-mono font-bold text-lg">{item.quantity}</span>
              <button 
                onClick={() => onUpdateQty(item.id, 1)}
                className="p-3 hover:text-moto-red transition-colors rounded-full hover:bg-white/10"
              >
                <Icons.Plus />
              </button>
            </div>
            <button 
              onClick={() => onRemove(item.id)}
              className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
            >
              <Icons.Trash2 />
            </button>
          </div>
        ))}
        <div className="p-8 bg-moto-dark border-t border-gray-800">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl text-gray-400 font-medium">Total Estimate</span>
            <span className="text-4xl font-black text-white tracking-tight">{total.toLocaleString()} MAD</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-moto-red hover:bg-red-600 text-white py-5 text-xl font-black uppercase tracking-widest rounded-xl transition-all transform hover:scale-[1.01]"
          >
            Direct Checkout (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutView = ({ 
  items, 
  onConfirm 
}: { 
  items: CartItem[]; 
  onConfirm: (name: string, phone: string, address: string) => void 
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && address) {
      onConfirm(name, phone, address);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-black mb-8 uppercase italic">Final <span className="text-moto-red">Pit Stop</span></h2>
      
      <div className="bg-moto-gray p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div className="mb-8 pb-8 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2 text-gray-400 text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>{(item.price * item.quantity).toLocaleString()} MAD</span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700 text-lg font-bold text-white">
            <span>Total</span>
            <span>{total.toLocaleString()} MAD</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-wider">Full Name</label>
            <input 
              required 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-moto-dark border border-gray-700 p-4 text-white rounded-lg focus:border-moto-red outline-none transition-colors" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-wider">Phone Number</label>
            <input 
              required 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-moto-dark border border-gray-700 p-4 text-white rounded-lg focus:border-moto-red outline-none transition-colors" 
              placeholder="+1 234 567 8900" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-wider">Delivery Address</label>
            <textarea 
              required 
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-moto-dark border border-gray-700 p-4 text-white rounded-lg focus:border-moto-red outline-none transition-colors" 
              placeholder="Street, City, Zip Code" 
            />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-lg font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
            <Icons.MessageCircle /> Confirm & Send to WhatsApp
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">
            Clicking this will open WhatsApp with your order details pre-filled.
          </p>
        </form>
      </div>
    </div>
  );
}

const Contact = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div>
        <h2 className="text-5xl font-black mb-6 uppercase italic leading-none">Get in <br/><span className="text-moto-red">Touch</span></h2>
        
        {/* Social Media Section */}
        <div className="mb-10">
           <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Follow the Action</p>
           <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/80 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <Icons.Facebook className="w-5 h-5" /> Facebook
              </button>
              <button className="flex items-center gap-2 bg-[#E4405F] hover:bg-[#E4405F]/80 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <Icons.Instagram className="w-5 h-5" /> Instagram
              </button>
              <button className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#FF0000]/80 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <Icons.Youtube className="w-5 h-5" /> YouTube
              </button>
           </div>
        </div>

        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
          Ready to ride? Have questions about our stock or need parts for your project? 
          Our team of experts is standing by in Casablanca.
        </p>
        
        <div className="space-y-8 mb-12">
          <div className="flex items-start gap-4 group">
            <div className="bg-moto-gray p-4 rounded-xl text-moto-red group-hover:bg-moto-red group-hover:text-white transition-colors">
              <Icons.MapPin />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Showroom</h3>
              <p className="text-gray-400">Casablanca, Morocco<br/>The Motorcycle District</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 group">
            <div className="bg-moto-gray p-4 rounded-xl text-moto-red group-hover:bg-moto-red group-hover:text-white transition-colors">
              <Icons.Phone />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Phone</h3>
              <p className="text-gray-400">+212 600 123 456</p>
            </div>
          </div>

          <div className="flex items-start gap-4 group">
            <div className="bg-moto-gray p-4 rounded-xl text-moto-red group-hover:bg-moto-red group-hover:text-white transition-colors">
              <Icons.Mail />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Email</h3>
              <p className="text-gray-400">sales@motoverse.ma</p>
            </div>
          </div>
        </div>

        <div className="bg-moto-gray p-8 rounded-2xl border border-gray-800 shadow-xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-wider">Name</label>
              <input type="text" className="w-full bg-moto-dark border border-gray-700 p-4 text-white rounded-lg focus:border-moto-red outline-none transition-colors" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-wider">Email</label>
              <input type="email" className="w-full bg-moto-dark border border-gray-700 p-4 text-white rounded-lg focus:border-moto-red outline-none transition-colors" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-wider">Message</label>
              <textarea rows={4} className="w-full bg-moto-dark border border-gray-700 p-4 text-white rounded-lg focus:border-moto-red outline-none transition-colors" placeholder="I'm interested in the Yamaha R1..."></textarea>
            </div>
            <button className="w-full bg-white text-moto-black font-black py-4 rounded-lg uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="h-full min-h-[500px] bg-moto-gray rounded-2xl overflow-hidden border border-gray-800 relative shadow-2xl">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72943926233!2d-7.669206532154644!3d33.57224998546496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb12219c7f470275e!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1715632145632!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Casablanca Location"
          className="absolute inset-0 w-full h-full"
        ></iframe>
        <div className="absolute bottom-6 left-6 bg-moto-red text-white px-6 py-2 font-bold uppercase tracking-widest shadow-xl skew-x-[-10deg]">
          <span className="block skew-x-[10deg]">Visit Our HQ</span>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = ({ 
  orders, 
  products, 
  onAddProduct, 
  onUpdateProduct,
  onDeleteProduct,
  onLogout
}: { 
  orders: Order[], 
  products: Product[], 
  onAddProduct: (p: Product) => void, 
  onUpdateProduct: (p: Product) => void,
  onDeleteProduct: (id: string) => void,
  onLogout: () => void
}) => {
  const [tab, setTab] = useState<'orders' | 'inventory'>('orders');
  const [inventoryView, setInventoryView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [brandInput, setBrandInput] = useState('');
  const [imageInputType, setImageInputType] = useState<'url' | 'file'>('url');
  
  const [formState, setFormState] = useState<Partial<Product>>({
    category: Category.BIKES,
    brand: Brand.HONDA
  });

  const availableBrands = Array.from(new Set([
    ...Object.values(Brand),
    ...products.map(p => p.brand)
  ])).sort();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setFormState(product);
    setBrandInput(product.brand);
    setImageInputType('url'); // Default to URL edit, or could check if it's data:image
    setInventoryView('edit');
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormState({ category: Category.BIKES, brand: Brand.HONDA, name: '', price: 0, image: '', description: '' });
    setBrandInput('');
    setImageInputType('url');
    setInventoryView('add');
  };

  const handleCancel = () => {
    setInventoryView('list');
    setEditingId(null);
    setFormState({ category: Category.BIKES, brand: Brand.HONDA, name: '', price: 0, image: '', description: '' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.price && formState.image) {
      const productData: Product = {
        id: editingId || 'prod-' + Date.now(),
        name: formState.name!,
        brand: brandInput || Brand.GENERIC, 
        category: formState.category || Category.ACCESSORIES,
        price: Number(formState.price),
        image: formState.image!,
        description: formState.description || '',
        specs: formState.specs || { engine: 'N/A', power: 'N/A', weight: 'N/A' }
      };

      if (editingId) {
        onUpdateProduct(productData);
      } else {
        onAddProduct(productData);
      }
      setInventoryView('list');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <h2 className="text-4xl font-black uppercase text-white tracking-tighter italic">
          Command <span className="text-moto-red">Center</span>
        </h2>
        <button onClick={onLogout} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white border border-gray-700 px-6 py-3 rounded hover:border-moto-red transition-all">
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-moto-red/10 rounded-bl-full group-hover:bg-moto-red/20 transition-colors"></div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Live Orders</h3>
          <p className="text-5xl font-black text-white">{orders.length}</p>
        </div>
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full group-hover:bg-green-500/20 transition-colors"></div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Revenue</h3>
          <p className="text-5xl font-black text-moto-red">{totalRevenue.toLocaleString()} <span className="text-sm text-gray-500">MAD</span></p>
        </div>
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full group-hover:bg-blue-500/20 transition-colors"></div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Fleet Size</h3>
          <p className="text-5xl font-black text-white">{products.length}</p>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex gap-4 border-b border-gray-800 mb-8">
        <button 
          onClick={() => setTab('orders')}
          className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${tab === 'orders' ? 'border-moto-red text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
        >
          Orders
        </button>
        <button 
          onClick={() => setTab('inventory')}
          className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${tab === 'inventory' ? 'border-moto-red text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
        >
          Inventory Management
        </button>
      </div>

      {tab === 'orders' && (
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden shadow-2xl animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-black/40 text-xs uppercase font-bold text-white tracking-wider">
                <tr>
                  <th className="px-6 py-5">ID</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Items</th>
                  <th className="px-6 py-5">Total</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-moto-red">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{order.customerName}</div>
                      <div className="text-xs opacity-70">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {order.items.map(i => (
                        <div key={i.id} className="flex items-center gap-2">
                            <span className="text-white font-bold">{i.quantity}x</span> {i.name}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 font-bold text-white font-mono">{order.total.toLocaleString()} MAD</td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase border border-yellow-500/20">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <p className="p-12 text-center text-gray-500 uppercase tracking-widest">No active orders.</p>}
          </div>
        </div>
      )}

      {tab === 'inventory' && (
        <>
          {inventoryView === 'list' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <div className="flex justify-between items-center mb-6">
                 <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">{products.length} Items in Stock</p>
                 <button 
                   onClick={handleAddClick}
                   className="bg-moto-red hover:bg-red-600 text-white px-6 py-3 rounded-lg font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105"
                 >
                   <Icons.Plus /> Add New Machine
                 </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden group hover:border-moto-red/50 transition-all flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                           <span className="text-xs font-bold uppercase bg-moto-red text-white px-2 py-1 rounded">{p.brand}</span>
                           <span className="text-white font-bold font-mono">{p.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-bold text-white mb-1 line-clamp-1">{p.name}</h4>
                        <p className="text-gray-500 text-xs mb-4 line-clamp-2 flex-1">{p.description}</p>
                        <div className="flex gap-2 mt-auto">
                          <button 
                            onClick={() => handleEditClick(p)}
                            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wide transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => onDeleteProduct(p.id)}
                            className="px-3 bg-gray-800 hover:bg-red-900/30 text-gray-400 hover:text-red-500 rounded transition-colors"
                          >
                            <Icons.Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {(inventoryView === 'add' || inventoryView === 'edit') && (
             <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={handleCancel} className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                    <Icons.ArrowLeft />
                  </button>
                  <h3 className="text-2xl font-black text-white uppercase italic">
                    {inventoryView === 'edit' ? 'Edit Machine Config' : 'Initialize New Machine'}
                  </h3>
                </div>
                
                <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 shadow-2xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Section */}
                    <div>
                       <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">Machine Visuals</label>
                       <div className="flex gap-4 mb-4">
                         <button 
                           type="button"
                           onClick={() => setImageInputType('url')}
                           className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded flex items-center justify-center gap-2 border ${imageInputType === 'url' ? 'bg-moto-red/20 text-moto-red border-moto-red' : 'bg-transparent text-gray-500 border-gray-700'}`}
                         >
                           <Icons.Link className="w-4 h-4" /> Image URL
                         </button>
                         <button 
                           type="button"
                           onClick={() => setImageInputType('file')}
                           className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded flex items-center justify-center gap-2 border ${imageInputType === 'file' ? 'bg-moto-red/20 text-moto-red border-moto-red' : 'bg-transparent text-gray-500 border-gray-700'}`}
                         >
                           <Icons.Upload className="w-4 h-4" /> Upload File
                         </button>
                       </div>

                       {imageInputType === 'url' ? (
                          <input 
                            className="w-full bg-black/50 border border-gray-700 p-4 rounded-lg text-white text-sm focus:border-moto-red outline-none transition-all font-mono" 
                            placeholder="https://..." 
                            value={formState.image || ''}
                            onChange={e => setFormState({...formState, image: e.target.value})}
                          />
                       ) : (
                          <div className="relative group w-full h-32 bg-black/50 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center hover:border-moto-red transition-colors">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="text-center">
                              <Icons.Image className="mx-auto text-gray-500 mb-2" />
                              <span className="text-xs text-gray-400 uppercase font-bold">Click to Upload Local File</span>
                            </div>
                          </div>
                       )}
                       
                       {/* Preview */}
                       {formState.image && (
                         <div className="mt-4 w-full h-64 rounded-xl overflow-hidden border border-gray-800 bg-black relative">
                           <img src={formState.image} alt="Preview" className="w-full h-full object-contain" />
                           <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white uppercase font-bold">Live Preview</div>
                         </div>
                       )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Model Name</label>
                            <input 
                              className="w-full bg-black/50 border border-gray-700 p-4 rounded-lg text-white text-sm focus:border-moto-red outline-none" 
                              placeholder="e.g. Ducati Panigale V4" 
                              value={formState.name || ''}
                              onChange={e => setFormState({...formState, name: e.target.value})}
                              required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Price (MAD)</label>
                            <input 
                              type="number"
                              className="w-full bg-black/50 border border-gray-700 p-4 rounded-lg text-white text-sm focus:border-moto-red outline-none" 
                              placeholder="0.00" 
                              value={formState.price || ''}
                              onChange={e => setFormState({...formState, price: Number(e.target.value)})}
                              required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Manufacturer</label>
                            <input 
                                type="text"
                                className="w-full bg-black/50 border border-gray-700 p-4 rounded-lg text-white text-sm focus:border-moto-red outline-none"
                                placeholder="Type Brand..."
                                value={brandInput}
                                onChange={e => setBrandInput(e.target.value)}
                                required
                            />
                            {/* Chips */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {availableBrands.map(b => (
                                    <button
                                        key={b}
                                        type="button"
                                        onClick={() => setBrandInput(b)}
                                        className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${brandInput === b ? 'bg-moto-red text-white border-moto-red' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}`}
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Category</label>
                            <select 
                              className="w-full bg-black/50 border border-gray-700 p-4 rounded-lg text-white text-sm focus:border-moto-red outline-none appearance-none"
                              value={formState.category}
                              onChange={e => setFormState({...formState, category: e.target.value as Category})}
                            >
                              {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Description</label>
                        <textarea 
                          className="w-full bg-black/50 border border-gray-700 p-4 rounded-lg text-white text-sm focus:border-moto-red outline-none" 
                          rows={4}
                          placeholder="Technical details and features..." 
                          value={formState.description || ''}
                          onChange={e => setFormState({...formState, description: e.target.value})}
                        />
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button 
                        type="button" 
                        onClick={handleCancel}
                        className="flex-1 py-4 rounded-lg font-black uppercase tracking-widest bg-gray-800 hover:bg-gray-700 text-white transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-[2] py-4 rounded-lg font-black uppercase tracking-widest bg-moto-red hover:bg-red-600 text-white transition-all"
                      >
                        {inventoryView === 'edit' ? 'Update Configuration' : 'Launch to Showroom'}
                      </button>
                    </div>
                  </form>
                </div>
             </div>
          )}
        </>
      )}
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  // Persistent Products State
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('motoverse_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Persistent Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('motoverse_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistent Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('motoverse_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Effects for Persistence ---
  useEffect(() => {
    localStorage.setItem('motoverse_products', JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem('motoverse_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('motoverse_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Handlers ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleNavigate = (page: string) => {
    setView(page);
    if (page !== 'shop') setSelectedCategory(undefined);
    window.scrollTo(0, 0);
  }

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setView('shop');
    window.scrollTo(0, 0);
  }

  const processCheckout = (name: string, phone: string, address: string) => {
    const newOrder: Order = {
      id: '#' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: Date.now(),
      status: 'pending'
    };

    // 1. Save Order internally
    setOrders(prev => [newOrder, ...prev]);

    // 2. Create WhatsApp Link
    const itemSummary = cart.map(i => `- ${i.quantity}x ${i.name}`).join('%0a');
    const waMessage = `*New Order from MotoVerse!* 🏍️%0a%0a*Customer:* ${name}%0a*Phone:* ${phone}%0a*Address:* ${address}%0a%0a*Order Details:*%0a${itemSummary}%0a%0a*Total:* ${newOrder.total.toLocaleString()} MAD`;
    const waLink = `https://wa.me/1234567890?text=${waMessage}`; // Replace with your number

    // 3. Clear Cart & Redirect
    setCart([]);
    setView('home');
    window.open(waLink, '_blank');
    alert("Order placed! Redirecting to WhatsApp...");
  };

  const addProduct = (p: Product) => {
    setAllProducts(prev => [...prev, p]);
  };

  const updateProduct = (updated: Product) => {
    setAllProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setAllProducts(prev => prev.filter(p => p.id !== id));
  };

  // --- Render Logic ---
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-moto-black flex items-center justify-center">
        <div className="bg-moto-gray p-8 rounded-2xl border border-gray-800 w-full max-w-md text-center">
          <h2 className="text-2xl font-black text-white mb-6">Dealer Access</h2>
          <input 
            type="password" 
            placeholder="Enter PIN (1234)"
            className="w-full bg-moto-dark p-4 rounded text-white mb-4 border border-gray-700 text-center tracking-widest"
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                if((e.target as HTMLInputElement).value === '1234') setView('dashboard');
                else alert('Access Denied');
              }
            }}
          />
          <button onClick={() => setView('home')} className="text-gray-500 text-xs underline">Back to Store</button>
        </div>
      </div>
    );
  }

  if (view === 'dashboard') {
    return <Dashboard 
      orders={orders} 
      products={allProducts} 
      onAddProduct={addProduct} 
      onUpdateProduct={updateProduct}
      onDeleteProduct={deleteProduct}
      onLogout={() => setView('home')}
    />;
  }

  return (
    <div className="min-h-screen bg-moto-black text-white font-sans selection:bg-moto-red selection:text-white">
      <Navbar cartCount={cartCount} onNavigate={handleNavigate} currentPage={view} />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onShopNow={() => handleNavigate('shop')} />
            <BrandStrip />
            <LegendaryRide />
            <Features />
            <CategoryShowcase onSelectCategory={handleCategorySelect} />
            <About />
            <Newsletter />
          </>
        )}

        {view === 'shop' && <Shop products={allProducts} onAddToCart={addToCart} initialCategory={selectedCategory} />}
        {view === 'cart' && <CartView items={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={() => setView('checkout')} />}
        {view === 'checkout' && <CheckoutView items={cart} onConfirm={processCheckout} />}
        {view === 'contact' && <Contact />}
        {view === 'about' && <About />}
      </main>

      <footer className="bg-moto-dark border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-gray-700 mb-6">
              Moto<span className="text-gray-600">Verse</span>
          </h1>
          <p className="text-gray-600 text-sm mb-8">&copy; 2024 MotoVerse. All rights reserved. <br/> Designed for speed.</p>
          <button onClick={() => setView('login')} className="text-xs text-gray-800 hover:text-moto-red transition-colors uppercase font-bold tracking-widest">
            Dealer Portal
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
