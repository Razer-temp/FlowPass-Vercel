import { Ticket, Github, Twitter, Linkedin, MessageSquare, ArrowUp, Cpu, ShieldCheck, Globe, Zap, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/[0.03] tracking-tighter whitespace-nowrap">
          FLOWPASS
        </div>
      </div>

      {/* Pre-Footer CTA */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-12 text-center"
        >
          {/* Animated Background Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors duration-700" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-colors duration-700" />

          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 relative">
            Ready to secure your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">next event?</span>
          </h2>
          <p className="text-dim max-w-xl mx-auto mb-10 text-lg">
            Join the elite event organizers using FlowPass to orchestrate safe, 
            intelligent, and seamless venue experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-black font-bold rounded-xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all"
            >
              Get Started Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/10 rounded-xl font-medium transition-all"
            >
              Book a Demo
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Links */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 font-heading font-bold text-2xl mb-6">
              <img src="/logo.png" alt="FlowPass Logo" className="w-8 h-8" />
              <span className="tracking-[0.2em] mt-1">FLOWPASS</span>
            </div>
            <p className="text-dim leading-relaxed mb-8 max-w-xs">
              Next-generation event logic and attendee safety orchestration. 
              Built for the world's most demanding venues.
            </p>
            
            {/* Live Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Systems Operational
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-bold text-white mb-6 font-heading tracking-wide uppercase text-xs">Solutions</h4>
            <ul className="space-y-4 text-dim text-sm">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#roles" className="hover:text-primary transition-colors">For Organizers</a></li>
              <li><a href="#roles" className="hover:text-primary transition-colors">For Attendees</a></li>
              <li><a href="#roles" className="hover:text-primary transition-colors">Safety Logic</a></li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-bold text-white mb-6 font-heading tracking-wide uppercase text-xs">Platform</h4>
            <ul className="space-y-4 text-dim text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">API Reference <ExternalLink className="w-3 h-3 opacity-50"/></a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Status Page</a></li>
              <li><a href="https://github.com/rehmanmusharaf/FlowPass" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Source Code</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white mb-6 font-heading tracking-wide uppercase text-xs">Company</h4>
            <ul className="space-y-4 text-dim text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Built With & Trust Signals */}
        <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xs uppercase tracking-widest text-dim font-bold">Built With</span>
            <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-yellow-400"/> React</div>
            <div className="flex items-center gap-2 text-sm"><Cpu className="w-4 h-4 text-purple-400"/> Supabase</div>
            <div className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4 text-blue-400"/> Vercel</div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-dim bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-green-400"/>
              Zero Personal Data Stored
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-dim tracking-wide uppercase">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <p>© 2026 FlowPass Inc.</p>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <p>Made with ❤️ for event safety</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4"/></a>
              <a href="https://github.com/rehmanmusharaf/FlowPass" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub"><Github className="w-4 h-4"/></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4"/></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Discord"><MessageSquare className="w-4 h-4"/></a>
            </div>
            
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors group"
                  aria-label="Back to top"
                >
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"/>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
}
