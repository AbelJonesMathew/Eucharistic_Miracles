import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, HeartPulse, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Timeline({ miracles = [] }) {
  const [expandedId, setExpandedId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    // 1. Intersection Observer for fade/slide reveal animations on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // 2. Track scroll progress through the timeline section for the gold track
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the timeline we are
      const totalHeight = rect.height;
      const visibleStart = -rect.top + windowHeight / 2;
      
      let progress = (visibleStart / totalHeight) * 100;
      progress = Math.max(0, Math.min(100, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [miracles]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="timeline-section" ref={timelineRef} className="relative py-24 px-4 bg-gradient-to-b from-[#0b0707] via-[#160d0e] to-[#0b0707] overflow-hidden">
      {/* Background soft red glows */}
      <div className="glow-crimson top-[30%] right-[-10%]" />
      <div className="glow-gold bottom-[20%] left-[-10%]" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Historical Miracle Timeline</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#c9bfab] max-w-2xl mx-auto font-light">
            Witness the chronological distribution of Eucharistic Miracles across centuries. Scroll down to trigger details and forensic laboratory findings.
          </p>
        </div>

        {/* Vertical Timeline container - Single-column card stack */}
        <div className="relative mt-20">
          {/* Left-aligned Line Base */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[rgba(212,175,55,0.1)] -translate-x-[1px]" />
          
          {/* Left-aligned Active Fill Line */}
          <div 
            className="absolute left-6 top-0 w-[2px] bg-gradient-to-b from-[#a81c20] to-[#D4AF37] -translate-x-[1px] transition-all duration-100 ease-out" 
            style={{ height: `${scrollProgress}%` }}
          />

          {/* Timeline Items */}
          {miracles.map((miracle, idx) => {
            const isExpanded = expandedId === miracle.id;

            return (
              <div 
                key={miracle.id} 
                className="relative mb-12 flex flex-col w-full"
              >
                {/* Node Dot on the left */}
                <div 
                  className={`absolute left-6 w-6 h-6 rounded-full border-2 border-[#D4AF37] -translate-x-1/2 z-10 flex items-center justify-center transition-all duration-500 ${
                    scrollProgress > (idx / miracles.length) * 100 
                      ? 'bg-[#a81c20] shadow-[0_0_10px_#D4AF37]' 
                      : 'bg-[#0b0707]'
                  }`}
                  style={{ top: '24px' }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#f5eedc]" />
                </div>

                {/* Card Container aligned to the right of the line */}
                <div className="w-full pl-16 md:pl-20">
                  <div 
                    className="reveal glass-panel p-6 md:p-8 cursor-pointer transition-all duration-300 hover:border-[rgba(212,175,55,0.4)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]"
                    style={{ borderLeft: '4px solid #D4AF37' }}
                    onClick={() => toggleExpand(miracle.id)}
                  >
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[rgba(168,28,32,0.15)] text-[#f5eedc] text-xs font-semibold uppercase tracking-wider border border-[rgba(168,28,32,0.3)]">
                        <Calendar className="w-3.5 h-3.5 text-[#a81c20]" />
                        {miracle.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#c9bfab]">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {miracle.location}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3 hover:text-[#D4AF37] transition-colors">
                      {miracle.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-[#c9bfab] mb-4 font-light leading-relaxed">
                      {miracle.description}
                    </p>

                    {/* Scientific highlights preview */}
                    <div className="border-t border-[rgba(212,175,55,0.1)] pt-4 mt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                        <HeartPulse className="w-4 h-4 text-[#a81c20]" />
                        Forensic Laboratory Results
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#c9bfab]">
                        {miracle.science.slice(0, 2).map((sci, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-[#a81c20] mt-0.5">•</span>
                            <span>{sci}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Accordion Expand Area */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[500px] opacity-100 mt-6 pt-6 border-t border-[rgba(212,175,55,0.1)]' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <h4 className="text-[#D4AF37] text-xs uppercase tracking-wider font-semibold mb-2">Detailed Narrative</h4>
                      <p className="text-xs md:text-sm text-[#c9bfab] font-light leading-relaxed mb-4">
                        {miracle.details}
                      </p>

                      <h4 className="text-[#D4AF37] text-xs uppercase tracking-wider font-semibold mb-2">Complete Scientific Findings</h4>
                      <ul className="space-y-2 text-xs text-[#c9bfab]">
                        {miracle.science.map((sci, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 bg-[rgba(255,255,255,0.02)] p-2 rounded border border-[rgba(212,175,55,0.05)]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{sci}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expand CTA */}
                    <div className="flex justify-end items-center gap-1 text-xs text-[#8c826e] hover:text-[#D4AF37] font-semibold mt-4 uppercase tracking-wider">
                      <span>{isExpanded ? 'Show Less' : 'Read Full Narrative'}</span>
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
