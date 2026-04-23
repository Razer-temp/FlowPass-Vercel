import { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { AlertOctagon, EyeOff, Activity } from 'lucide-react';
import ChaosVsCalm from './ChaosVsCalm';

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
}

const BentoCard = ({ children, className, delay = 0, glowColor = "rgba(255,255,255,0.06)" }: { children: ReactNode, className?: string, delay?: number, glowColor?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXPx = useMotionValue(0);
  const mouseYPx = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseXPx.set(e.clientX - rect.left);
    mouseYPx.set(e.clientY - rect.top);
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const background = useMotionTemplate`radial-gradient(circle 400px at ${mouseXPx}px ${mouseYPx}px, ${glowColor}, transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, type: "spring", bounce: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY }}
      className={`relative group rounded-[2rem] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 overflow-hidden ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <motion.div 
        className="relative z-10 h-full w-full flex flex-col p-8 md:p-10"
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const RippleAsset = () => (
  <div className="w-full flex-1 flex items-center justify-center relative min-h-[150px] mt-8">
    <div className="grid grid-cols-10 gap-2 opacity-60 w-full max-w-[280px]">
      {Array.from({ length: 40 }).map((_, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const delay = (9 - col) * 0.15 + (row % 2) * 0.05;
        return (
          <motion.div
            key={i}
            className="h-2 rounded-full bg-white/20"
            animate={{ 
              backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,51,102,0.8)", "rgba(255,255,255,0.2)"],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
    <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-stop/20 to-transparent blur-xl pointer-events-none" />
  </div>
);

const RadarAsset = () => (
  <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none overflow-hidden rounded-tr-[2rem]">
    <motion.div 
      className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] origin-center"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{
        background: 'conic-gradient(from 90deg, transparent 0%, transparent 70%, rgba(255,255,255,0.1) 90%, rgba(255,255,255,0.4) 100%)',
      }}
    />
    <motion.div
      className="absolute inset-0 bg-stop/10 mix-blend-overlay"
      animate={{ opacity: [0, 0.8, 0, 0.4, 0] }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.92, 0.96, 1] }}
    />
  </div>
);

const TimelineAsset = () => (
  <div className="mt-8 flex flex-col gap-4 w-full">
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex items-center gap-4">
        <div className="text-xs text-white/50 font-mono w-12 pt-1">+{i * 12}m</div>
        <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-go rounded-full shadow-[0_0_15px_rgba(0,255,102,0.6)]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: i * 0.4 + 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default function ProblemStats() {
  return (
    <section className="py-24 md:py-40 bg-background relative overflow-hidden">
      {/* Background radial gradient representing the "heat/chaos" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-stop/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-stop font-mono text-sm tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(255,51,102,0.15)]"
          >
            <AlertOctagon className="w-4 h-4" />
            The 10-Minute Bottleneck
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 tracking-tight leading-tight"
          >
            A memorable night shouldn't<br />end in a fight for the exit.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-dim max-w-3xl mx-auto leading-relaxed"
          >
            The match finishes. The concert ends. 33,000 people rush for the same 3 exits at the exact same second. Chaos isn't inevitable—<span className="text-white font-medium">it's a failure of design.</span>
          </motion.p>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 md:mb-40 relative">
          
          {/* Card 1: The Ripple Effect (Tall) */}
          <BentoCard 
            className="md:col-span-2 md:row-span-2" 
            delay={0.1}
            glowColor="rgba(255,51,102,0.15)"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <Activity className="w-8 h-8 text-stop mb-6" />
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">The Ripple Effect</h3>
                <p className="text-dim text-lg leading-relaxed max-w-md">
                  A 5-second delay at one exit compounds into a dangerous 15-minute crush at the back.
                </p>
              </div>
              <RippleAsset />
              <div className="mt-8 border-t border-white/10 pt-6 flex items-end justify-between">
                <div>
                  <div className="text-6xl font-timer text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-2">79%</div>
                  <div className="text-sm font-medium text-dim uppercase tracking-wider">of severe incidents occur post-event</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: The Blind Spot (Square) */}
          <BentoCard 
            className="md:col-span-1" 
            delay={0.2}
            glowColor="rgba(255,255,255,0.1)"
          >
            <RadarAsset />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <EyeOff className="w-8 h-8 text-dim mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-3">The Blind Spot</h3>
                <p className="text-dim/80 leading-relaxed text-sm">
                  Once the main event ends, organizers instantly lose all real-time control over crowd flow and density.
                </p>
              </div>
              <div className="mt-12">
                <div className="text-4xl font-timer text-wait mb-1 drop-shadow-[0_0_15px_rgba(255,170,0,0.5)]">Zero</div>
                <div className="text-xs font-medium text-dim uppercase tracking-wider">Visibility after final whistle</div>
              </div>
            </div>
          </BentoCard>

          {/* Card 3: The Consequence (Square) */}
          <BentoCard 
            className="md:col-span-1" 
            delay={0.3}
            glowColor="rgba(255,51,102,0.15)"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-stop/10 to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-3">The Consequence</h3>
                <p className="text-dim/80 leading-relaxed text-sm">
                  Recorded global crowd crush incidents over the last decade due to lack of synchronized planning.
                </p>
              </div>
              <div className="mt-12">
                <div className="text-5xl font-timer text-transparent bg-clip-text bg-gradient-to-br from-white to-stop/80 mb-1 tracking-tight">
                  <Counter from={0} to={3550} duration={2.5} />
                </div>
                <div className="text-xs font-medium text-dim uppercase tracking-wider">Incidents globally</div>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: The Solution (Wide) */}
          <BentoCard 
            className="md:col-span-3 bg-gradient-to-br from-go/10 via-[#0a0a0a] to-[#0a0a0a] border-go/20" 
            delay={0.4}
            glowColor="rgba(0,255,102,0.15)"
          >
            <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between h-full">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">The Solution is Timing</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Staggering exits by just <span className="text-go font-bold drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">12 minutes</span> between zones completely eliminates critical density.
                </p>
              </div>
              <div className="flex-1 w-full md:max-w-md bg-black/40 rounded-2xl p-6 border border-white/5 shadow-inner">
                <TimelineAsset />
              </div>
            </div>
          </BentoCard>

        </div>

        {/* The Reveal */}
        <div className="mt-12 md:mt-32 text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight">
              <span className="text-white/40">Poor coordination kills people.</span><br/>
              <motion.span 
                initial={{ textShadow: "0px 0px 0px rgba(0,255,102,0)" }}
                whileInView={{ textShadow: "0px 0px 40px rgba(0,255,102,0.4)" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-go mt-4 block"
              >
                FlowPass fixes coordination.
              </motion.span>
            </p>
          </motion.div>
        </div>

        <ChaosVsCalm />
      </div>
    </section>
  );
}
