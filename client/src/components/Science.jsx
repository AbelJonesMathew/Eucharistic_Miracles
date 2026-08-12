import React from 'react';
import { Heart, Activity, Binary, Sparkles, RefreshCw, ShieldCheck } from 'lucide-react';


export default function Science() {
  const studies = [
    {
      title: "Human Myocardium",
      subtitle: "Heart Muscle Tissue",
      icon: <Heart className="w-8 h-8 text-[#a81c20]" />,
      summary: "In every forensic muscle biopsy (Lanciano, Buenos Aires, Sokółka, Legnica), pathology reports concluded the tissue is striated muscle fibers of the myocardium.",
      scientificDetail: "Specifically, the tissue matches the left ventricle of the heart wall, responsible for pumping blood throughout the body. The cell structures are typical of a heart that has undergone severe physical trauma or asphyxiation."
    },
    {
      title: "Type AB Blood Group",
      subtitle: "Universal Recipient",
      icon: <Activity className="w-8 h-8 text-[#D4AF37]" />,
      summary: "Where blood typing was viable (Lanciano, Bolsena, Buenos Aires), the blood group is consistently identified as AB positive.",
      scientificDetail: "AB is the rarest blood group (found in roughly 3-5% of the global population). Notably, this matches the exact blood group found on the Shroud of Turin (the traditional burial shroud of Christ) and the Sudarium of Oviedo."
    },
    {
      title: "Active White Blood Cells",
      subtitle: "Living Inflammatory State",
      icon: <Binary className="w-8 h-8 text-[#a81c20]" />,
      summary: "Biopsies from the Buenos Aires and Sokółka hosts revealed the presence of intact, active white blood cells (leukocytes) inside the muscle tissue.",
      scientificDetail: "White blood cells normally disintegrate within minutes of clinical death or separation from a living organism. Their active presence proves the tissue was sampled from a living myocardium undergoing extreme distress, and had not been preserved artificially."
    },
    {
      title: "Microscopic Syncretism",
      subtitle: "Structural Interweaving",
      icon: <Sparkles className="w-8 h-8 text-[#D4AF37]" />,
      summary: "Electron microscopy in the Sokółka study showed the bread host fibers and human heart muscle fibers are structurally woven together.",
      scientificDetail: "The transition from the gluten structure of the wheat bread to the cardiac proteins occurs smoothly without any distinct borders, boundaries, or glue. This complex, interlocking molecular mesh is impossible to replicate synthetically in a laboratory."
    }
  ];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#0b0707] to-[#160d0e] border-t border-[rgba(212,175,55,0.08)]">
      <div className="glow-gold top-[20%] right-[10%] opacity-20" />
      <div className="glow-crimson bottom-[10%] left-[5%] opacity-25" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Forensic Science Analysis</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#c9bfab] max-w-2xl mx-auto font-light">
            Scientific studies conducted by secular, blind-panel pathologists have revealed consistent, undeniable biological patterns across centuries.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {studies.map((s, idx) => (
            <div key={idx} className="glass-panel p-6 md:p-8 flex gap-5 items-start">
              <div className="p-3 bg-[rgba(22,13,14,0.8)] border border-[rgba(212,175,55,0.2)] rounded-lg shrink-0">
                {s.icon}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8c826e] font-semibold block mb-1">{s.subtitle}</span>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-[#f5eedc]">{s.title}</h3>
                <p className="text-sm text-[#c9bfab] font-light leading-relaxed mb-4">
                  {s.summary}
                </p>
                <div className="bg-[rgba(168,28,32,0.04)] border border-[rgba(168,28,32,0.1)] rounded p-4 text-xs text-[#c9bfab] font-light leading-relaxed italic">
                  <strong>Forensic Details:</strong> {s.scientificDetail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Absolute preservation card summary */}
        <div className="glass-panel p-8 text-center max-w-3xl mx-auto border-t-2 border-t-[#D4AF37]">
          <RefreshCw className="w-10 h-10 text-[#D4AF37] mx-auto mb-4 animate-spin" style={{ animationDuration: '8s' }} />
          <h3 className="text-xl md:text-2xl font-bold mb-3">Defying the Laws of Organic Decay</h3>
          <p className="text-sm md:text-base text-[#c9bfab] font-light leading-relaxed mb-4">
            Under ordinary conditions, organic matter, particularly tissue and blood, degrades within days. Consecrated hosts consist solely of wheat flour and water, which decay naturally when exposed to air and humidity. Yet, these miracle relics have remained preserved for decades, and in the case of Lanciano, for over <strong>1,200 years</strong>, in open air without any embalming agents or chemical modifications.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.15)] rounded px-3 py-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Independent Laboratory Certified
          </div>
        </div>
      </div>
    </section>
  );
}
