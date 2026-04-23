import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calculator, SquareSplitHorizontal, RefreshCw, Radio } from 'lucide-react';

// --- Reusable Bento Card with Mouse Tracking Glow ---
interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
}

function BentoCard({ className = '', children }: BentoCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34, 197, 94, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}

// --- Micro-Animations ---

// 1. Auto Exit Gap (Tall)
function AutoGapDemo() {
  const [gap, setGap] = useState(2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setGap(prev => {
        const next = prev + (Math.random() > 0.5 ? 0.2 : -0.2);
        return Math.max(1.5, Math.min(next, 4.5));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      <div className="relative w-full max-w-[120px] h-48 bg-black/40 rounded-full p-2 border border-white/5 overflow-hidden flex items-end shadow-inner">
        <motion.div 
          className="w-full bg-gradient-to-t from-go/20 to-go/60 rounded-full"
          animate={{ height: `${(gap / 4.5) * 100}%` }}
          transition={{ type: "spring", bounce: 0.2, duration: 1 }}
        />
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
          <div className="w-full h-px bg-white"></div>
          <div className="w-full h-px bg-white"></div>
          <div className="w-full h-px bg-white"></div>
          <div className="w-full h-px bg-white"></div>
        </div>
      </div>
      <div className="mt-6 font-mono text-center">
        <div className="text-dim text-xs mb-1 uppercase tracking-wider">Dynamic Gap</div>
        <div className="text-go text-3xl font-bold tracking-tighter">{gap.toFixed(1)}s</div>
      </div>
    </div>
  );
}

// 2. Smart Gate Reassignment (Wide)
function GateReassignDemo() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocked(b => !b);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md relative flex items-center justify-between">
        {/* Source Node */}
        <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-black flex items-center justify-center shrink-0 z-10">
          <div className="w-3 h-3 bg-white/50 rounded-full" />
        </div>

        {/* Paths */}
        <div className="flex-1 relative h-24 mx-4">
          {/* Top Path (Gate A) */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M 0 50 C 30 50, 30 10, 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
            <motion.path 
              d="M 0 50 C 30 50, 30 10, 100 10" 
              fill="none" 
              stroke="#22c55e" 
              strokeWidth="2" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={!blocked ? { pathLength: 1, opacity: 1 } : { opacity: 0, transition: { duration: 0.2 } }}
              transition={!blocked ? { duration: 1.5, repeat: Infinity, ease: "linear" } : {}}
            />
          </svg>

          {/* Bottom Path (Gate B) */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M 0 50 C 30 50, 30 90, 100 90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
            <motion.path 
              d="M 0 50 C 30 50, 30 90, 100 90" 
              fill="none" 
              stroke="#22c55e" 
              strokeWidth="2" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={blocked ? { pathLength: 1, opacity: 1 } : { opacity: 0, transition: { duration: 0.2 } }}
              transition={blocked ? { duration: 1.5, repeat: Infinity, ease: "linear" } : {}}
            />
          </svg>
        </div>

        {/* Destination Nodes */}
        <div className="flex flex-col gap-8 shrink-0 z-10">
          {/* Gate A */}
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-lg border-2 flex items-center justify-center bg-black transition-colors duration-300"
              animate={{ borderColor: blocked ? '#ef4444' : '#22c55e' }}
            >
              <div className={`text-xs font-bold ${blocked ? 'text-red-500' : 'text-go'}`}>G1</div>
            </motion.div>
            {blocked && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-xs font-bold uppercase tracking-wider absolute right-16 top-3">Blocked</motion.span>}
          </div>

          {/* Gate B */}
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-lg border-2 flex items-center justify-center bg-black transition-colors duration-300"
              animate={{ borderColor: blocked ? '#22c55e' : 'rgba(255,255,255,0.2)' }}
            >
              <div className={`text-xs font-bold ${blocked ? 'text-go' : 'text-dim'}`}>G2</div>
            </motion.div>
            {blocked && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-go text-xs font-bold uppercase tracking-wider absolute right-16 bottom-3">Rerouted</motion.span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Real-Time Pass Updates (Square)
function RealTimePassDemo() {
  const [status, setStatus] = useState<'WAIT' | 'GO'>('WAIT');

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(s => s === 'WAIT' ? 'GO' : 'WAIT');
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center py-4">
      <motion.div 
        className="w-32 h-40 rounded-xl bg-black border border-white/10 shadow-2xl flex flex-col overflow-hidden relative"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-2 w-full bg-white/5" />
        <div className="p-3 flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/20 rounded-sm" />
          </div>
          <div className="w-16 h-2 bg-white/10 rounded-full" />
          <div className="w-10 h-2 bg-white/10 rounded-full" />
        </div>
        
        {/* Status Indicator */}
        <motion.div 
          className="h-10 w-full flex items-center justify-center text-sm font-bold tracking-widest"
          animate={{ 
            backgroundColor: status === 'GO' ? '#22c55e' : '#262626',
            color: status === 'GO' ? '#000000' : '#888888'
          }}
        >
          {status}
        </motion.div>

        {/* Pulse effect when flipping to GO */}
        {status === 'GO' && (
          <motion.div 
            className="absolute inset-0 border-2 border-go rounded-xl"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </motion.div>
    </div>
  );
}

// 4. Instant Broadcast (Square)
function BroadcastDemo() {
  return (
    <div className="flex-1 flex items-center justify-center py-4 relative">
      {/* Central Hub */}
      <div className="w-12 h-12 rounded-full bg-go/20 border border-go flex items-center justify-center z-10 relative">
        <Radio className="w-5 h-5 text-go" />
        
        {/* Ripples */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-go/50"
          animate={{ scale: [1, 2.5], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full border border-go/30"
          animate={{ scale: [1, 2.5], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/20"
            style={{ 
              transform: `rotate(${deg}deg) translateY(-50px)`,
            }}
            animate={{ 
              backgroundColor: ['rgba(255,255,255,0.2)', 'rgba(34,197,94,1)', 'rgba(255,255,255,0.2)'],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: (deg / 360) * 0.5 // cascading effect based on position
            }}
          />
        ))}
      </div>
    </div>
  );
}

// --- Main Section Component ---

export default function SmartLogicBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-card border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-go/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-go animate-pulse"></span>
            <span className="text-white text-sm font-mono tracking-wide">COMMAND CENTER</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Decisions at the speed of light.
          </h2>
          <p className="text-xl text-dim max-w-2xl mx-auto leading-relaxed">
            Most crowd systems are passive dashboards. FlowPass is an active decision-making engine that reacts to reality in real-time.
          </p>
        </div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {/* Card 1: Auto Gap (Tall) */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
            <BentoCard className="h-full min-h-[400px]">
              <div className="mb-4 w-12 h-12 rounded-xl bg-go/10 flex items-center justify-center border border-go/20 text-go">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Auto Exit Gap</h3>
              <p className="text-dim leading-relaxed mb-8 flex-1">
                Calculates the safest time gap between zones based on your exact crowd size. You don't guess, the algorithm does.
              </p>
              <AutoGapDemo />
            </BentoCard>
          </motion.div>

          {/* Card 2: Smart Gate Reassignment (Wide) */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
            <BentoCard className="h-full min-h-[300px]">
              <div className="flex flex-col md:flex-row h-full gap-8 items-center">
                <div className="flex-1">
                  <div className="mb-4 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <SquareSplitHorizontal className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Smart Gate Reassignment</h3>
                  <p className="text-dim leading-relaxed">
                    If Gate 3 gets blocked mid-event, FlowPass instantly reassigns that zone to the next available gate and updates every affected pass.
                  </p>
                </div>
                <div className="w-full md:w-1/2 shrink-0">
                  <GateReassignDemo />
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 3: Real-Time Updates (Square) */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
            <BentoCard className="h-full min-h-[300px]">
              <div className="flex flex-col h-full">
                <div className="mb-4 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono text-dim px-2 py-1 rounded bg-black/50 border border-white/5">0ms LATENCY</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Live Pass Sync</h3>
                <p className="text-dim text-sm leading-relaxed mb-6">
                  Status flips from WAIT to GO the moment their zone unlocks. No pull-to-refresh.
                </p>
                <RealTimePassDemo />
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 4: Instant Broadcast (Square) */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
            <BentoCard className="h-full min-h-[300px]">
              <div className="flex flex-col h-full">
                <div className="mb-4 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1 h-3 bg-go rounded-sm"></span>
                    <span className="w-1 h-3 bg-go rounded-sm"></span>
                    <span className="w-1 h-3 bg-go rounded-sm"></span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Broadcast</h3>
                <p className="text-dim text-sm leading-relaxed mb-6">
                  One announcement reaches every attendee with an open pass in under 2 seconds.
                </p>
                <BroadcastDemo />
              </div>
            </BentoCard>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <div className="text-center w-full px-6 mt-16 md:mt-24">
          <Link to="/create" className="inline-flex w-full sm:w-auto items-center justify-center px-10 py-5 bg-white text-background font-bold rounded-lg hover:bg-white/90 transition-transform hover:scale-105 gap-3 text-lg shadow-2xl shadow-white/10">
            <Radio className="w-6 h-6" /> See It In Action — Create Event
          </Link>
        </div>

      </div>
    </section>
  );
}
