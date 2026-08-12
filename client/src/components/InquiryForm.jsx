import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Reflection',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message || 'Thank you! Your inquiry was successfully received.' });
        setFormData({ name: '', email: '', subject: 'General Reflection', message: '' });
      } else {
        setStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: 'error', 
        message: 'Could not connect to the backend server. Please verify the Node.js server is running on http://localhost:5000.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-4 bg-[#0b0707] border-t border-[rgba(212,175,55,0.08)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Request Information & Reflection</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#c9bfab] max-w-xl mx-auto font-light text-sm">
            Have questions about the scientific journals, historical documentation, or planning a pilgrim visit to the shrines? Send us a message.
          </p>
        </div>

        <div className="glass-panel p-6 md:p-10 max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Mail className="w-40 h-40 text-[#D4AF37]" />
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Your Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Saint Jerome"
                  className="bg-[rgba(22,13,14,0.6)] border border-[rgba(212,175,55,0.15)] rounded p-3 text-sm text-[#f5eedc] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="bg-[rgba(22,13,14,0.6)] border border-[rgba(212,175,55,0.15)] rounded p-3 text-sm text-[#f5eedc] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Subject of Inquiry</label>
              <select 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                className="bg-[#160d0e] border border-[rgba(212,175,55,0.15)] rounded p-3 text-sm text-[#f5eedc] focus:outline-none focus:border-[#D4AF37] transition-all"
              >
                <option value="General Reflection">General Reflection & Questions</option>
                <option value="Scientific Inquiries">Scientific Journal Request</option>
                <option value="Veneration Tours">Veneration & Pilgrim Tours</option>
                <option value="Corrections">Content Contributions & Corrections</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Message *</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your thoughts or inquiries here..."
                className="bg-[rgba(22,13,14,0.6)] border border-[rgba(212,175,55,0.15)] rounded p-3 text-sm text-[#f5eedc] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                required
              />
            </div>

            {/* Error / Success Banner */}
            {status.type && (
              <div className={`p-4 rounded flex items-start gap-3 border text-xs leading-relaxed ${
                status.type === 'success' 
                  ? 'bg-[rgba(24,50,24,0.15)] border-green-500/30 text-green-200' 
                  : 'bg-[rgba(168,28,32,0.1)] border-[#a81c20]/30 text-red-200'
              }`}>
                {status.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" /> : <AlertCircle className="w-5 h-5 text-[#a81c20] shrink-0" />}
                <span>{status.message}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 py-3.5 px-6 bg-gradient-to-r from-[#a81c20] to-[#b3272c] hover:from-[#D4AF37] hover:to-[#aa841c] text-[#f5eedc] font-bold text-sm uppercase tracking-widest rounded border-0 cursor-pointer shadow-lg shadow-black/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
              {!loading && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
