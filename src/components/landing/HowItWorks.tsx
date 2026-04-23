import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Radio, Ticket, Users, CheckCircle2, QrCode } from 'lucide-react';

// Canvas 1: Organizer Setup
const OrganizerCanvas = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 p-8 flex flex-col shadow-2xl relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="ml-4 text-xs font-mono text-dim tracking-widest">VENUE_COMMAND_CENTER</div>
      </div>
      
      <div className="space-y-8 flex-1">
        <div className="space-y-3">
          <div className="text-xs text-dim uppercase tracking-wider">Event Name</div>
          <div className="h-12 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 overflow-hidden">
             <motion.span 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.5 }}
               className="text-base text-white font-medium"
             >
               Championship Finals 2026
             </motion.span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-xs text-dim uppercase tracking-wider">Zones</div>
            <div className="h-12 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 overflow-hidden relative">
               <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute inset-0 bg-go/10 border border-go/30 rounded-lg"
               />
               <motion.span 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.2 }}
                 className="text-base text-go font-bold relative z-10"
               >
                 3 Zones
               </motion.span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs text-dim uppercase tracking-wider">Total Crowd</div>
            <div className="h-12 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 overflow-hidden">
               <motion.span 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.5 }}
                 className="text-base text-white font-medium"
               >
                 33,000
               </motion.span>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-auto">
           <motion.button 
             initial={{ scale: 0.95, opacity: 0, backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
             animate={{ scale: 1, opacity: 1, backgroundColor: "#00FF66", color: "#000000", boxShadow: "0px 0px 30px rgba(0,255,102,0.3)" }}
             transition={{ duration: 0.5, delay: 2.2 }}
             className="w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 text-lg"
           >
              Generate AI Schedule <CheckCircle2 className="w-5 h-5" />
           </motion.button>
        </div>
      </div>
      {/* Background ambient glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-go/20 rounded-full blur-[100px] pointer-events-none" 
      />
    </motion.div>
  );
};

// Canvas 2: Attendee Pass
const AttendeeCanvas = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center relative perspective-1000 bg-[#050505]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Phone mock */}
      <motion.div 
        initial={{ rotateY: -15, rotateX: 10, scale: 0.9 }}
        animate={{ rotateY: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-[280px] h-[560px] bg-black rounded-[3rem] border-[8px] border-zinc-900 p-1 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-xl z-20" />
        
        {/* Screen */}
        <div className="w-full h-full bg-[#111] rounded-[2.5rem] overflow-hidden flex flex-col relative border border-white/5">
          
          <div className="p-6 pt-14 flex-1 flex flex-col items-center text-center relative z-10">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading font-bold text-2xl mb-1"
            >
              Zone B
            </motion.h4>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-dim mb-8"
            >
              Gate 4 • Sec 112
            </motion.div>
            
            {/* QR Code */}
            <motion.div 
               className="bg-white p-4 rounded-2xl mb-10 shadow-lg"
               initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
               animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
               transition={{ duration: 0.6, delay: 0.8 }}
            >
               <QrCode className="w-32 h-32 text-black" />
            </motion.div>

            {/* Status morphing */}
            <div className="w-full mt-auto relative h-[100px] flex items-center justify-center">
                {/* WAIT State */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                  transition={{ duration: 3, times: [0, 0.1, 0.8, 1], delay: 1 }}
                  className="absolute inset-0 bg-wait/10 border border-wait/30 rounded-2xl flex flex-col items-center justify-center"
                >
                  <div className="text-wait font-bold text-2xl tracking-widest">WAIT</div>
                  <div className="text-xs text-wait/80 mt-1 font-mono uppercase">Exit opens 10:12 PM</div>
                </motion.div>
                
                {/* GO State */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, boxShadow: "0px 0px 40px rgba(0,255,102,0.4)" }}
                  transition={{ duration: 0.6, delay: 4, type: "spring", bounce: 0.5 }}
                  className="absolute inset-0 bg-go text-background rounded-2xl flex flex-col items-center justify-center z-10"
                >
                  <div className="font-bold text-3xl tracking-widest">GO</div>
                  <div className="text-xs font-mono mt-1 opacity-90 uppercase">Proceed to Gate 4</div>
                </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 5, times: [0, 0.8, 1] }}
            className="absolute inset-0 bg-gradient-to-b from-transparent to-go/20 pointer-events-none" 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Canvas 3: Zones Exit
const ZonesCanvas = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 p-10 flex flex-col shadow-2xl relative overflow-hidden justify-center"
    >
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
      
      <div className="space-y-10 font-mono text-sm relative z-10 w-full max-w-md mx-auto">
        {[
          { zone: 'A', time: '10:00 PM', color: 'bg-go', shadow: 'shadow-[0_0_15px_rgba(0,255,102,0.5)]', text: 'text-go', delay: 0.5, icon: '🟢' },
          { zone: 'B', time: '10:12 PM', color: 'bg-wait', shadow: 'shadow-[0_0_15px_rgba(255,170,0,0.5)]', text: 'text-wait', delay: 1.8, icon: '🟡' },
          { zone: 'C', time: '10:24 PM', color: 'bg-stop', shadow: 'shadow-[0_0_15px_rgba(255,51,102,0.5)]', text: 'text-stop', delay: 3.1, icon: '🔴' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <div className="w-28 flex justify-between">
              <span className="text-dim">{item.time}</span>
              <span className="font-bold text-white">Zone {item.zone}</span>
            </div>
            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className={`absolute top-0 left-0 bottom-0 ${item.color} ${item.shadow} rounded-full`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: item.delay, ease: "easeOut" }}
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: item.delay + 0.8 }}
              className={`w-6 ${item.text} text-xl`}
            >
              {item.icon}
            </motion.div>
          </div>
        ))}

        <motion.div 
          className="mt-16 text-center text-dim font-medium border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5 }}
        >
          Full dispersal achieved safely by <span className="text-white">10:36 PM</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const steps = [
  {
    id: 1,
    title: "Organizer Sets Up",
    description: "Enter your event name, venue, number of zones, and crowd size. FlowPass instantly calculates the safest staggered exit schedule — no guesswork.",
    icon: Radio,
    canvas: OrganizerCanvas
  },
  {
    id: 2,
    title: "Attendees Get Pass",
    description: "Share one QR code or link. Attendees enter their seat number and instantly receive a personal digital exit pass — their zone, gate, and exact exit time.",
    icon: Ticket,
    canvas: AttendeeCanvas
  },
  {
    id: 3,
    title: "Zones Exit in Waves",
    description: "Zone A exits first. Zone B follows 12 minutes later. Zone C after that. 33,000 people disperse smoothly in waves — instead of a single dangerous surge.",
    icon: Users,
    canvas: ZonesCanvas
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.33) setActiveStep(0);
      else if (latest >= 0.33 && latest < 0.66) setActiveStep(1);
      else setActiveStep(2);
    });
  }, [scrollYProgress]);

  // Wire progress height mapped directly to scroll progress
  const wireHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="how-it-works" className="h-[300vh] bg-background relative">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Background ambient glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-go/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 md:py-20">
          
          <div className="text-center mb-12 lg:mb-20">
            <div className="text-go font-mono text-sm tracking-widest uppercase mb-6 inline-block px-4 py-1.5 border border-go/20 rounded-full shadow-[0_0_20px_rgba(0,255,102,0.1)]">How It Works</div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 tracking-tight leading-tight">From chaos to calm —<br/>in 60 seconds of setup.</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 h-[500px]">
            
            {/* Left Column: Narrative */}
            <div className="relative pl-10 md:pl-16 flex flex-col justify-center h-full gap-16 md:gap-20">
              
              {/* The Wire Track Background */}
              <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-white/5 rounded-full" />
              
              {/* The Active Wire Fill */}
              <div className="absolute left-[19px] top-6 bottom-6 w-[2px] rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-go via-go to-stop shadow-[0_0_15px_rgba(0,255,102,0.8)]"
                  style={{ height: wireHeight }}
                />
              </div>

              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = activeStep > index;
                const Icon = step.icon;
                
                // Ring color logic
                let ringClass = "border-white/10 text-white/30 bg-background";
                if (isActive) ringClass = "border-go text-go shadow-[0_0_20px_rgba(0,255,102,0.4)] bg-background";
                if (isPast) ringClass = "border-go bg-go text-background";

                return (
                  <div key={step.id} className="relative z-10 transition-all duration-500">
                    {/* Ring Indicator */}
                    <div className={`absolute -left-[40px] md:-left-[64px] top-0 w-10 h-10 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 ${ringClass}`}>
                      {isPast ? <CheckCircle2 className="w-5 h-5" /> : <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-go' : 'bg-white/20'}`} />}
                    </div>
                    
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.3, x: isActive ? 0 : -8 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 flex items-center gap-3 text-white">
                        <Icon className={`w-6 h-6 ${isActive ? 'text-go' : 'text-white/40'}`} /> 
                        {step.title}
                      </h3>
                      <p className="text-dim leading-relaxed text-lg max-w-md">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Canvas */}
            <div className="hidden lg:block h-full relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-white/20 via-white/5 to-transparent shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl rounded-[2.5rem]" />
              <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-black/60 border border-white/5">
                <AnimatePresence mode="wait">
                  {steps.map((step, index) => {
                    if (index !== activeStep) return null;
                    const Canvas = step.canvas;
                    return <Canvas key={step.id} />;
                  })}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
