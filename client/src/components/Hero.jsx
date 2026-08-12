import React, { useEffect, useState } from 'react';
import { Calendar, ShieldAlert, Award, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random values for background floating particles
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80 + 10}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 10 + 10}s`,
      size: `${Math.random() * 4 + 3}px`
    }));
    setParticles(generated);
  }, []);

  const scrollToTimeline = () => {
    document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-4 overflow-hidden pt-20 pb-8">
      {/* Background glow effects */}
      <div className="glow-crimson top-[10%] left-[20%]" />
      <div className="glow-gold bottom-[15%] right-[15%]" />
      
      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="bg-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}

      {/* Hero content */}
      <div className="z-10 text-center max-w-4xl flex-grow flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(22,13,14,0.5)] mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Faith Meets Scientific Inquiry</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="block text-[#f5eedc]">Eucharistic Miracles</span>
          <span className="block text-gold-gradient mt-2">of the World</span>
        </h1>
        
        <p className="text-base md:text-xl text-[#c9bfab] max-w-2xl font-light mb-12">
          An investigation into the extraordinary historical phenomena where consecrated bread and wine physically transformed into human heart tissue and blood, confirmed by forensic science.
        </p>

        {/* Highlight Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-4">
          <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
            <span className="text-2xl md:text-3xl font-bold text-[#D4AF37] font-serif">1200+</span>
            <span className="text-xs text-[#c9bfab] uppercase tracking-wider mt-1">Years Preserved</span>
          </div>
          <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
            <span className="text-2xl md:text-3xl font-bold text-[#a81c20] font-serif">AB</span>
            <span className="text-xs text-[#c9bfab] uppercase tracking-wider mt-1">Blood Type</span>
          </div>
          <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
            <span className="text-2xl md:text-3xl font-bold text-[#D4AF37] font-serif">Myocardium</span>
            <span className="text-xs text-[#c9bfab] uppercase tracking-wider mt-1">Cardiac Muscle</span>
          </div>
          <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
            <span className="text-2xl md:text-3xl font-bold text-[#a81c20] font-serif">0</span>
            <span className="text-xs text-[#c9bfab] uppercase tracking-wider mt-1">Preservatives Found</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll CTA */}
      <button 
        onClick={scrollToTimeline}
        className="z-10 group flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#8c826e] hover:text-[#D4AF37] transition-all duration-300 bg-transparent border-0 cursor-pointer outline-none"
      >
        <span>Explore the Historical Timeline</span>
        <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-[#D4AF37]" />
      </button>
    </section>
  );
}
