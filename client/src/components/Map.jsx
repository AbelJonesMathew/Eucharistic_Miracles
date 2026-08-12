import React, { useState } from 'react';
import { MapPin, Info, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Map({ miracles = [] }) {
  const [selectedCountry, setSelectedCountry] = useState('Italy');

  // Group miracles by country for the map display
  const countries = {
    Italy: {
      name: 'Italy',
      count: 3,
      coords: { x: 512, y: 185 },
      miracles: miracles.filter(m => m.location.includes('Italy')),
      description: 'The historic cradle of Eucharistic miracles, featuring Lanciano (the oldest scientifically analyzed miracle) and Bolsena (which initiated Corpus Christi).'
    },
    Poland: {
      name: 'Poland',
      count: 2,
      coords: { x: 526, y: 155 },
      miracles: miracles.filter(m => m.location.includes('Poland')),
      description: 'Host to key modern-era miracles (Sokółka, 2008 and Legnica, 2013), exhibiting profound structural integration between bread host fibers and human heart tissue.'
    },
    Argentina: {
      name: 'Argentina',
      count: 1,
      coords: { x: 335, y: 385 },
      miracles: miracles.filter(m => m.location.includes('Argentina')),
      description: 'The location of the 1996 Buenos Aires miracle, studied blindly by top forensic pathologists who identified active white blood cells and severely traumatized myocardium.'
    }
  };

  const handleCountryClick = (countryKey) => {
    setSelectedCountry(countryKey);
  };

  return (
    <section className="relative py-24 px-4 bg-[#0b0707] border-t border-[rgba(212,175,55,0.08)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Geographical Distribution</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#c9bfab] max-w-2xl mx-auto font-light">
            Interactive Global Map. Select a glowing sanctuary location on the map to filter and inspect localized forensic investigations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left panel: Info on selected country */}
          <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
            <div className="glass-panel p-6 border-l-4 border-l-[#D4AF37]">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-2xl font-bold uppercase tracking-wider">{countries[selectedCountry].name}</h3>
              </div>
              <p className="text-sm text-[#c9bfab] font-light leading-relaxed mb-4">
                {countries[selectedCountry].description}
              </p>
              <div className="inline-block px-3 py-1 bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)] rounded text-xs font-semibold text-[#D4AF37]">
                {countries[selectedCountry].count} Documented Miracles
              </div>
            </div>

            {/* List of miracles in selected country */}
            <div className="flex flex-col gap-4">
              {countries[selectedCountry].miracles.map(m => (
                <div 
                  key={m.id} 
                  className="glass-panel p-5 hover:border-[#a81c20] transition-all duration-300 group"
                  onClick={() => {
                    document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="text-base font-bold text-[#f5eedc] group-hover:text-[#D4AF37] transition-colors">{m.title}</h4>
                    <span className="text-xs text-[#D4AF37] font-serif shrink-0">{m.date}</span>
                  </div>
                  <p className="text-xs text-[#c9bfab] font-light line-clamp-2 mb-3">{m.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#8c826e] group-hover:text-[#f5eedc] transition-colors">
                    <span>View on timeline</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: SVG Map */}
          <div className="lg:col-span-2 glass-panel p-4 flex items-center justify-center relative overflow-hidden order-1 lg:order-2 bg-[rgba(11,7,7,0.4)]">
            {/* Ambient map glow */}
            <div className="glow-crimson top-[20%] left-[30%] opacity-30" />
            
            <svg 
              viewBox="0 0 800 450" 
              className="w-full h-auto max-h-[400px] z-10 select-none"
            >
              {/* World outline - simplified visual geometries for modern look */}
              {/* North America */}
              <path d="M 80,100 L 180,80 L 220,130 L 190,200 L 120,180 L 140,240 L 100,220 Z" className="map-land" />
              {/* Central/South America */}
              <path d="M 140,240 L 180,240 L 220,290 L 210,380 L 190,410 L 180,410 L 150,330 L 140,270 Z" className="map-land" />
              {/* Greenland */}
              <path d="M 180,40 L 240,30 L 220,70 L 190,60 Z" className="map-land" />
              {/* Eurasia / Africa combined land */}
              <path d="M 330,80 L 460,60 L 600,60 L 620,120 L 590,180 L 540,220 L 510,180 L 450,210 L 410,230 L 370,180 Z" className="map-land" />
              {/* Africa detail shape */}
              <path d="M 370,180 L 410,230 L 450,210 L 460,260 L 450,310 L 400,340 L 370,290 L 340,230 L 340,200 Z" className="map-land" />
              {/* Asia / East Asia */}
              <path d="M 600,60 L 700,80 L 720,150 L 680,240 L 600,240 L 560,200 L 590,180 Z" className="map-land" />
              {/* Australia */}
              <path d="M 640,300 L 700,320 L 690,360 L 630,340 Z" className="map-land" />

              {/* Connecting glowing web lines from active hotspots to central graphic */}
              <g stroke="rgba(212,175,55,0.06)" strokeWidth="1" strokeDasharray="3 3">
                <line x1={countries.Italy.coords.x} y1={countries.Italy.coords.y} x2={countries.Poland.coords.x} y2={countries.Poland.coords.y} />
                <line x1={countries.Italy.coords.x} y1={countries.Italy.coords.y} x2={countries.Argentina.coords.x} y2={countries.Argentina.coords.y} />
              </g>

              {/* Interactive SVG Pin Markers */}
              {Object.keys(countries).map((key) => {
                const country = countries[key];
                const isActive = selectedCountry === key;
                return (
                  <g 
                    key={key} 
                    onClick={() => handleCountryClick(key)}
                    className="group/marker cursor-pointer"
                  >
                    {/* Glowing outer pulse circle */}
                    <circle 
                      cx={country.coords.x} 
                      cy={country.coords.y} 
                      r={isActive ? 16 : 8} 
                      fill="none" 
                      stroke={isActive ? 'var(--gold)' : 'var(--crimson)'} 
                      strokeWidth="1.5" 
                      className={isActive ? 'animate-ping' : 'opacity-40 group-hover/marker:opacity-100 transition-opacity'}
                      style={{ transformOrigin: `${country.coords.x}px ${country.coords.y}px`, animationDuration: '2s' }}
                    />
                    {/* Inner core marker */}
                    <circle 
                      cx={country.coords.x} 
                      cy={country.coords.y} 
                      r={isActive ? 6 : 4} 
                      className={`map-marker ${isActive ? 'active' : ''}`}
                    />
                  </g>
                );
              })}
            </svg>
            
            {/* Floating legend overlay */}
            <div className="absolute bottom-4 right-4 bg-[rgba(22,13,14,0.9)] border border-[rgba(212,175,55,0.2)] rounded px-3 py-2 text-[10px] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[#c9bfab]">Click Pins to Navigate Sanctuary Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
