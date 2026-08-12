import React, { useState, useEffect } from 'react';
import ZoomSection from './components/ZoomSection';
import Timeline from './components/Timeline';
import Science from './components/Science';
import InquiryForm from './components/InquiryForm';
import { Church, HeartPulse, Sparkles, MessageCircle } from 'lucide-react';

// Hardcoded fallback data in case backend server is not running yet during initial load
const LOCAL_MIRACLES_FALLBACK = [
  {
    "id": "lanciano",
    "title": "The Miracle of Lanciano",
    "location": "Lanciano, Italy",
    "date": "700 AD",
    "year": 700,
    "coordinates": { "lat": 42.23, "lng": 14.39 },
    "description": "A Basilian monk doubted the Real Presence. During the consecration, the Host physically changed into Flesh and the Wine into Blood, which later coagulated into five globules.",
    "science": [
      "The Host is human muscular tissue of the heart (myocardium).",
      "The Blood is true human blood, type AB.",
      "The proteins in the blood are normally distributed, matching fresh blood.",
      "No chemical preservatives or embalming agents were found."
    ],
    "details": "In the 8th century, in the church of St. Legontian, a priest doubted the true presence of Christ in the Eucharist. As he spoke the words of consecration, the host transformed into a circle of living flesh and the wine into blood. The blood coagulated into five distinct parts of different sizes. In 1970, a rigorous scientific investigation led by Dr. Odoardo Linoli (professor of anatomy and pathological histology) confirmed that the flesh is striated muscle tissue of the myocardium (heart wall) and the blood is type AB. It has been preserved for over 1,200 years without any artificial substances."
  },
  {
    "id": "bolsena",
    "title": "The Miracle of Bolsena",
    "location": "Bolsena, Italy",
    "date": "1263 AD",
    "year": 1263,
    "coordinates": { "lat": 42.64, "lng": 11.98 },
    "description": "A German priest, Father Peter of Prague, was struggling with doubt. As he celebrated Mass, blood began to flow from the consecrated Host, staining the corporal linen cloth.",
    "science": [
      "Bloodstains on the corporal linen consist of human blood, type AB.",
      "The pattern and state of preservation indicate natural human blood components.",
      "Led to Pope Urban IV instituting the global Feast of Corpus Christi."
    ],
    "details": "Father Peter of Prague was on a pilgrimage to Rome to pray for relief from his doubts regarding the Eucharist. While celebrating Mass at the tomb of Saint Christina in Bolsena, the host began to bleed immediately after the consecration. Drops fell onto his hands and the linen corporal. He immediately wrapped the host and went to Orvieto, where Pope Urban IV was residing. The Pope declared it a miracle and instituted the Feast of Corpus Christi (Body of Christ) for the entire Church, commissioning the construction of the magnificent Cathedral of Orvieto to house the stained corporal."
  },
  {
    "id": "siena",
    "title": "The Incorrupt Hosts of Siena",
    "location": "Siena, Italy",
    "date": "1730 AD",
    "year": 1730,
    "coordinates": { "lat": 43.32, "lng": 11.33 },
    "description": "Thieves stole 351 consecrated hosts from the Basilica of San Francesco. When found in a donation box days later, they were cleaned and returned, remaining perfectly fresh for nearly 300 years.",
    "science": [
      "The hosts remain in a state of perfect preservation, defying natural decay.",
      "Chemical and biological analyses confirmed they have not decomposed.",
      "Flour and water mixtures naturally decompose within days; these remain fresh."
    ],
    "details": "On August 14, 1730, thieves broke into the Basilica of San Francesco in Siena and stole a golden ciborium containing 351 consecrated hosts. Three days later, the hosts were found in the offering box of the Sanctuary of Santa Maria in Provenzano, covered in dust and cobwebs. They were carefully cleaned and preserved. Over the next 290+ years, instead of decaying and molding as unleavened bread naturally does, the hosts remained completely fresh, smelling like fresh unleavened bread. Scientists, including Nobel Laureates, have inspected them and found no scientific explanation for their preservation."
  },
  {
    "id": "buenos_aires",
    "title": "The Miracle of Buenos Aires",
    "location": "Buenos Aires, Argentina",
    "date": "1996 AD",
    "year": 1996,
    "coordinates": { "lat": -34.60, "lng": -58.38 },
    "description": "A discarded host was placed in a vessel of water to dissolve. Instead of dissolving, it transformed into bloody flesh. Subsequent studies revealed living heart tissue.",
    "science": [
      "Identified as human heart tissue (left ventricle myocardium).",
      "The tissue was in an active inflammatory state with white blood cells (intact DNA).",
      "Indicates the heart was alive and under severe trauma when tissue was taken.",
      "Matched AB blood type, identical to the Lanciano miracle."
    ],
    "details": "On August 18, 1996, at the parish of Santa Maria y San Carlos Borromeo, a consecrated host was found discarded on a candle holder. Following church guidelines, the priest placed it in a container of water to dissolve. Seven days later, the host had turned into a reddish substance of muscle tissue. In 1999, Cardinal Jorge Bergoglio (later Pope Francis) commissioned a scientific study. Samples were sent blindly to prominent scientists (including cardiologist Dr. Frederic Zugibe). They concluded that the sample was living heart tissue (myocardium) showing signs of severe trauma, and that it contained active white blood cells which could only exist if the heart was clinically alive at the moment of sampling."
  },
  {
    "id": "sokolka",
    "title": "The Miracle of Sokółka",
    "location": "Sokółka, Poland",
    "date": "2008 AD",
    "year": 2008,
    "coordinates": { "lat": 53.40, "lng": 23.50 },
    "description": "During Communion, a priest dropped a host, which was put in water. A red spot appeared on it, which pathologists determined to be human heart tissue structurally woven into the bread.",
    "science": [
      "Pathologists confirmed the red spot is human heart tissue (myocardium).",
      "Fibers of the bread and the cardiac tissue are complexly intertwined/woven.",
      "This interlocking of structures cannot be artificially replicated.",
      "Matches AB blood group profile."
    ],
    "details": "At the church of St. Anthony in Sokółka, Poland, a host was accidentally dropped during Mass. It was placed in a vasculum (water container) to dissolve. A week later, the sister sacristan noticed a bright red spot on the host. Two independent pathologists from the Medical University of Białystok, Dr. Maria Sobaniec-Łotowska and Dr. Stanisław Sulkowski, examined the host. They found that the red spot was human heart tissue of a person who was dying. Furthermore, they observed that the bread fibers and the heart fibers were intertwined at a microscopic level, a phenomenon that is impossible to synthesize or fake artificially."
  },
  {
    "id": "legnica",
    "title": "The Miracle of Legnica",
    "location": "Legnica, Poland",
    "date": "2013 AD",
    "year": 2013,
    "coordinates": { "lat": 51.21, "lng": 16.16 },
    "description": "A consecrated host fell to the floor and was placed in water. It developed red stains that, under scientific analysis, were identified as dying cardiac muscle tissue.",
    "science": [
      "The tissue was identified as human cardiac muscle tissue.",
      "Shows alterations typical of a heart in agony/severe stress.",
      "Approved by the Holy See and Bishop Zbigniew Kiernikowski in 2016."
    ],
    "details": "On Christmas Day, 2013, at the Church of Saint Hyacinth in Legnica, Poland, a consecrated host fell to the ground. It was placed in a container of water to dissolve. Shortly after, a red spot appeared. In 2014, the Department of Forensic Medicine examined the tissue. The report concluded: 'In the histopathological image, the fragments of tissue were found containing fragmented parts of cross-striated muscle... The whole image is most similar to the cardiac muscle with alterations that often accompany agony.' In 2016, the miracle was officially announced and approved for public veneration."
  }
];

export default function App() {
  const [miracles, setMiracles] = useState(LOCAL_MIRACLES_FALLBACK);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHeader, setShowHeader] = useState(false);

  // Fetch miracles from backend on mount
  useEffect(() => {
    const fetchMiracles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/miracles');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setMiracles(data);
          }
        }
      } catch (err) {
        console.warn('Backend server not detected. Utilizing secure static fallback data.');
      }
    };
    fetchMiracles();

    // Track scroll height ratio for progress bar & header visibility
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollProgress(scrolled);
      }

      const timelineSec = document.getElementById('timeline-section');
      if (timelineSec) {
        const rect = timelineSec.getBoundingClientRect();
        // Show header when timeline-section is near the top of the viewport
        setShowHeader(rect.top <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-[#a81c20] selection:text-[#f5eedc]">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Sticky Header / Navigation */}
      <header 
        className="fixed top-0 left-0 w-full z-50 bg-[rgba(11,7,7,0.85)] backdrop-blur-md border-b border-[rgba(212,175,55,0.1)] px-6 py-4 flex justify-between items-center transition-all duration-300"
        style={{
          transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
          opacity: showHeader ? 1 : 0,
          pointerEvents: showHeader ? 'auto' : 'none'
        }}
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[rgba(168,28,32,0.15)] shadow-[0_0_8px_rgba(212,175,55,0.2)]">
            <span className="text-[#D4AF37] font-bold text-base font-serif">✝</span>
          </div>
          <span className="font-serif tracking-widest text-[#f5eedc] text-sm md:text-base font-semibold uppercase hover:text-[#D4AF37] transition-colors">
            Eucharistic Miracles
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold">
          <button onClick={() => scrollToSection('timeline-section')} className="bg-transparent border-0 cursor-pointer text-[#c9bfab] hover:text-[#D4AF37] flex items-center gap-1 transition-all">
            <Church className="w-3.5 h-3.5" /> Timeline
          </button>
          <button onClick={() => scrollToSection('science-section')} className="bg-transparent border-0 cursor-pointer text-[#c9bfab] hover:text-[#D4AF37] flex items-center gap-1 transition-all">
            <HeartPulse className="w-3.5 h-3.5" /> Forensic Science
          </button>
          <button onClick={() => scrollToSection('inquiry-section')} className="bg-transparent border-0 cursor-pointer text-[#c9bfab] hover:text-[#D4AF37] flex items-center gap-1 transition-all">
            <MessageCircle className="w-3.5 h-3.5" /> Inquiries
          </button>
        </nav>
      </header>

      {/* Zoom Scroll Section */}
      <ZoomSection />

      {/* Timeline Section */}
      <div id="timeline-section">
        <Timeline miracles={miracles} />
      </div>

      {/* Forensic Science Section */}
      <div id="science-section">
        <Science />
      </div>

      {/* Inquiries / Reflection Section */}
      <div id="inquiry-section">
        <InquiryForm />
      </div>

      {/* Global Footer */}
      <footer className="relative bg-[#090505] text-[#8c826e] py-16 px-6 border-t border-[rgba(212,175,55,0.08)] text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="text-[#D4AF37] font-serif text-3xl font-black animate-pulse">✝</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {/* Box 1: Spiritual Quote */}
            <div className="glass-panel p-6 text-center flex flex-col justify-center items-center border-l-2 border-l-[#D4AF37] bg-[rgba(168,28,32,0.02)]">
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-3 block">Spiritual Legacy</span>
              <p className="text-xs md:text-sm font-serif text-[#f5eedc] italic leading-relaxed">
                "We are like shadows that walk; to reach the light, we must stay close to the Eucharistic Altar."
              </p>
            </div>

            {/* Box 2: Carlo Acutis Attribution */}
            <div className="glass-panel p-6 text-center flex flex-col justify-center items-center border-r-2 border-r-[#D4AF37] bg-[rgba(212,175,55,0.02)]">
              <span className="text-[9px] uppercase tracking-widest text-[#8c826e] font-bold mb-3 block">Historical Catalog</span>
              <p className="text-[11px] text-[#c9bfab] leading-relaxed">
                Inspired by the cataloging work of <span className="text-[#D4AF37] font-semibold">Saint Carlo Acutis</span>, who dedicated his youth to documenting all Eucharistic Miracles online.
              </p>
            </div>
          </div>

          <div className="w-16 h-[1px] bg-[rgba(212,175,55,0.15)] my-2" />
          <p className="text-[10px] text-[#5c5445] tracking-widest">
            © {new Date().getFullYear()} Eucharistic Miracles Archive. Built with React & Node.js.
          </p>
        </div>
      </footer>
    </div>
  );
}
