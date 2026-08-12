import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function ZoomSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [jesusOpacity, setJesusOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      
      if (totalScrollable <= 0) return;

      // Calculate how far down the 300vh track we have scrolled
      let progress = -rect.top / totalScrollable;
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
      setScrollProgress(progress);

      // 1. Zoom calculation (from 1x to 7x zoom)
      // We focus on the center where the Host is located
      const currentZoom = 1 + progress * 6; 
      setZoom(currentZoom);

      // 2. Cross-fade calculation (Jesus Face opacity starts at 40% scroll, fully visible at 80% scroll)
      let currentJesusOpacity = 0;
      if (progress > 0.4 && progress <= 0.8) {
        currentJesusOpacity = (progress - 0.4) / 0.4;
      } else if (progress > 0.8) {
        currentJesusOpacity = 1;
      }
      setJesusOpacity(currentJesusOpacity);

      // 3. Text reveal calculation (Text starts appearing only after the morph is complete at 80% scroll)
      let currentTextOpacity = 0;
      if (progress > 0.8) {
        currentTextOpacity = Math.min(1, (progress - 0.8) / 0.15); // Fully opaque by 95%
      }
      setTextOpacity(currentTextOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTimeline = () => {
    document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tx = scrollProgress * 37.08;
  const ty = scrollProgress * -5.53;

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#0b0707]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-center">
        
        {/* Fixed-size canvas container to preserve original sizes and alignments */}
        <div className="relative w-[1920px] h-[1080px] flex-shrink-0 overflow-hidden flex items-center justify-center">
          {/* Layer 1: Monstrance & Host Image */}
          <div 
            className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out flex items-center justify-center"
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${zoom})`,
              transformOrigin: '48.07% 50.51%',
              opacity: 1 - jesusOpacity // Fades out as Jesus fades in
            }}
          >
            <img 
              src="./monstrance_eucharist.jpg" 
              alt="Monstrance with Eucharistic Host" 
              className="w-full h-full max-w-none max-h-none"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Layer 2: Jesus Face Image */}
          <div 
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              opacity: jesusOpacity
            }}
          >
            <img 
              src="./jesus_face.jpg" 
              alt="Face of Jesus Christ" 
              className="w-full h-full max-w-none max-h-none"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Layer 3: Vignette / Atmospheric Shadows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(11,7,7,0.75)_65%,#0b0707_100%)] pointer-events-none" />

          {/* Layer 4: Soft Crimson Altar Back-glow */}
          <div 
            className="absolute w-[864px] h-[864px] rounded-full bg-[radial-gradient(circle,rgba(168,28,32,0.3)_0%,rgba(11,7,7,0)_70%)] pointer-events-none transition-all duration-300"
            style={{
              left: '490.92px',
              top: '113.53px',
              transform: `translate(${tx}px, ${ty}px) scale(${1 + scrollProgress * 0.5})`,
              opacity: 0.8 - (scrollProgress * 0.3)
            }}
          />
        </div>

        {/* Layer 5: Dynamic Text Overlay (Visible only after morph at 80%+) */}
        {textOpacity > 0 && (
          <div 
            className="absolute z-20 text-center px-4 max-w-3xl flex flex-col items-center gap-6 select-none transition-all duration-500 ease-out"
            style={{ 
              opacity: textOpacity,
              transform: `translateY(${20 - textOpacity * 20}px)`
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(22,13,14,0.8)] backdrop-blur-sm mb-2 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">The Divine Transformation</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="block text-[#f5eedc]">The Real Presence</span>
              <span className="block text-gold-gradient mt-1">Unveiled</span>
            </h2>

            <div className="glass-panel p-6 md:p-8 bg-[rgba(22,13,14,0.9)] max-w-xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <p className="text-[#f5eedc] font-serif text-sm md:text-lg italic leading-relaxed mb-4">
                "This is my Body, which is given for you; do this in remembrance of me."
              </p>
              <p className="text-[#8c826e] text-xs uppercase tracking-widest font-semibold">
                — Luke 22:19
              </p>
            </div>

            <button 
              onClick={scrollToTimeline}
              className="mt-6 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-[#f5eedc] transition-all bg-transparent border-0 cursor-pointer outline-none animate-bounce"
            >
              <span>Explore Historical Timeline & Lab Reports</span>
              <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        )}

        {/* Scroll helper indicator at 0% scroll progress */}
        {scrollProgress < 0.1 && (
          <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#8c826e] pointer-events-none animate-pulse">
            <span>Scroll to Enter Sanctuary</span>
            <div className="w-5 h-8 rounded-full border-2 border-[#8c826e] flex justify-center p-1.5 mt-2">
              <div className="w-1.5 h-2.5 rounded-full bg-[#D4AF37] animate-bounce" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
