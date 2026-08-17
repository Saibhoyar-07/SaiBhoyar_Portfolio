import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Mail, MapPin, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ToastState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, type: 'success', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification('error', 'Please fill in all the required form fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('success', 'Message sent successfully! Sai will contact you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        showNotification('error', data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      showNotification('error', 'Connecting error. Please verify the backend status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full py-28 overflow-hidden z-10">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#6C3BFF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Floating Custom Toast Alerts */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-md shadow-2xl ${
                toast.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-950/60 border-red-500/30 text-red-300'
              }`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span className="text-xs font-semibold font-mono tracking-wide">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header */}
        <ScrollReveal className="mb-16 flex flex-col items-start">
          <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-2 font-semibold">04 / Connect</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Get In Touch<span className="text-[#6C3BFF]">.</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] rounded-full mt-4" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Direct Info */}
          <ScrollReveal className="lg:col-span-5 flex flex-col justify-between gap-8" direction="left">
            <div className="glass-panel p-8 rounded-2xl flex-1 flex flex-col justify-center items-start text-left bg-gradient-to-br from-[#0b0b14] to-[#050508]">
              <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-[#7DF9FF] mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Let's build something awesome</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                I am interested in freelance contracts, API designs, MERN engineering roles, or simply chatting about Web3, system designs, and Docker deployments. Drop a note here!
              </p>

              {/* Direct Details */}
              <div className="flex flex-col gap-5 w-full">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#6C3BFF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Shoot an Email</span>
                    <a href="mailto:saibhoyar12345@gmail.com" className="text-sm font-semibold text-white hover:text-[#00D4FF] transition-colors">
                      saibhoyar12345@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#00D4FF]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Current Station</span>
                    <span className="text-sm font-semibold text-white">Nagpur, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Contact Form */}
          <ScrollReveal className="lg:col-span-7" direction="right" delay={0.08}>
            <form 
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col gap-6 text-left bg-gradient-to-br from-[#0c0c16] to-[#05050a]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase font-semibold">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-[#6C3BFF]/50 text-white placeholder-gray-600 outline-none text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase font-semibold">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-[#6C3BFF]/50 text-white placeholder-gray-600 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-mono text-gray-400 uppercase font-semibold">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Collaboration Opportunities"
                  required
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-[#6C3BFF]/50 text-white placeholder-gray-600 outline-none text-sm transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase font-semibold">Detailed Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hey Sai, let's schedule an interview next week..."
                  required
                  rows={5}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-[#6C3BFF]/50 text-white placeholder-gray-600 outline-none text-sm transition-all resize-none"
                />
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] hover:brightness-110 text-white font-semibold tracking-wide text-sm flex items-center justify-center gap-2 group transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(108,59,255,0.25)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Submit
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
