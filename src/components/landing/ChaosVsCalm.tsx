import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Zap, RotateCcw, Activity, Bell, Smartphone } from 'lucide-react';

type SimState = 'NORMAL' | 'INCIDENT' | 'RESOLVED';

// Helper component for the animated SVG flow lines
const FlowPath = ({ d, color, isFlowing, isBlocked }: { d: string, color: string, isFlowing: boolean, isBlocked: boolean }) => (
  <>
    {/* Faded background track */}
    <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round" />
    {/* Flowing energy particles */}
    <motion.path
      d={d}
      fill="none"
      stroke={isBlocked ? "#ff3333" : color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="15 30"
      animate={{ 
        strokeDashoffset: isFlowing && !isBlocked ? [45, 0] : 0,
        opacity: isBlocked ? [0.3, 1, 0.3] : 1
      }}
      transition={{ 
        strokeDashoffset: { repeat: Infinity, duration: 0.6, ease: "linear" },
        opacity: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
      }}
      style={{ filter: isBlocked ? 'drop-shadow(0 0 10px rgba(255,51,51,0.8))' : `drop-shadow(0 0 6px ${color})` }}
    />
  </>
);

export default function ChaosVsCalm() {
  const [simState, setSimState] = useState<SimState>('NORMAL');

  return (
    <div className="mt-16 w-full max-w-6xl mx-auto text-left">
      
      <div className="text-center mb-10">
        <h3 className="text-3xl font-heading font-bold mb-4">The Live Incident Sandbox</h3>
        <p className="text-dim text-lg max-w-2xl mx-auto">
          Algorithms aren't just for normal operations. See what happens when the unexpected occurs. Take control of the Command Center below.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT PANEL: The Interactive Blueprint */}
        <div className="lg:col-span-3 bg-[#030303] border border-white/10 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-2xl ring-1 ring-white/5 flex flex-col">
          <div className="flex items-center justify-between mb-4 z-20 relative">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase">Live Venue Schematic</span>
            </div>
          </div>

          <div className="w-full relative aspect-[4/3] sm:aspect-video rounded-2xl bg-black/40 overflow-hidden border border-white/5 flex-1">
            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '30px 30px' }} />

            {/* SVG Flow Canvas */}
            <svg viewBox="0 0 600 400" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10">
              {/* Path A */}
              <FlowPath d="M 150 60 C 150 200, 150 200, 150 360" color="#00FF66" isFlowing={true} isBlocked={false} />
              {/* Path C */}
              <FlowPath d="M 450 60 C 450 200, 450 200, 450 360" color="#00FF66" isFlowing={true} isBlocked={false} />

              {/* Path B Logic based on state */}
              {simState === 'NORMAL' && (
                 <FlowPath d="M 300 60 C 300 200, 300 200, 300 360" color="#00FF66" isFlowing={true} isBlocked={false} />
              )}
              {simState === 'INCIDENT' && (
                 <FlowPath d="M 300 60 C 300 200, 300 200, 300 360" color="#00FF66" isFlowing={true} isBlocked={true} />
              )}
              {simState === 'RESOLVED' && (
                <>
                  {/* The dynamically re-routed paths splitting to A and C */}
                  <FlowPath d="M 300 60 C 300 250, 150 150, 150 360" color="#00AAFF" isFlowing={true} isBlocked={false} />
                  <FlowPath d="M 300 60 C 300 250, 450 150, 450 360" color="#00AAFF" isFlowing={true} isBlocked={false} />
                  {/* The faded out ghost of the blocked path */}
                  <path d="M 300 60 C 300 200, 300 200, 300 360" fill="none" stroke="rgba(255,51,51,0.2)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" />
                </>
              )}
            </svg>

            {/* UI Overlays: Zones (Top) */}
            {['A', 'B', 'C'].map((zone, idx) => (
              <div key={zone} className="absolute top-[12%] -translate-y-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-white/20 px-3 py-1.5 sm:px-6 sm:py-2 rounded-xl z-20 text-center shadow-xl backdrop-blur-md" style={{ left: `${25 * (idx + 1)}%` }}>
                <div className="text-[8px] sm:text-[10px] text-white/50 tracking-widest font-mono">ZONE</div>
                <div className="text-sm sm:text-xl font-bold font-heading text-white">{zone}</div>
              </div>
            ))}

            {/* UI Overlays: Gates (Bottom) */}
            {['A', 'B', 'C'].map((gate, idx) => {
              const isBlocked = simState !== 'NORMAL' && gate === 'B';
              return (
                <div key={gate} className={`absolute bottom-[2%] -translate-y-1/2 -translate-x-1/2 bg-[#0a0a0a] border-t-2 px-3 py-1.5 sm:px-6 sm:py-2 rounded-b-lg z-20 text-center shadow-xl backdrop-blur-md transition-colors duration-500 ${isBlocked ? 'border-stop shadow-[0_-5px_15px_rgba(255,51,51,0.3)]' : 'border-white/20'}`} style={{ left: `${25 * (idx + 1)}%` }}>
                  <div className={`text-[9px] sm:text-xs font-bold font-mono tracking-widest ${isBlocked ? 'text-stop' : 'text-dim'}`}>GATE {gate}</div>
                  {isBlocked && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] font-bold text-stop uppercase mt-1">Blocked</motion.div>
                  )}
                </div>
              );
            })}

            {/* Heatmap overlay for Incident */}
            <AnimatePresence>
              {simState === 'INCIDENT' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="absolute bottom-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-stop/40 blur-[50px] rounded-full pointer-events-none z-10"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* RIGHT PANEL: Controls & Phone */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Command Center Controls */}
          <div className="bg-card border border-white/10 rounded-3xl p-6 flex-1 flex flex-col shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-white/50" />
              <h3 className="font-mono text-sm tracking-widest text-white/50 uppercase">Command Dashboard</h3>
            </div>

            <div className="bg-[#050505] rounded-2xl p-5 border border-white/5 mb-6 flex-1 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/10 to-transparent" />
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">System Status</div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  simState === 'NORMAL' ? 'bg-go shadow-[0_0_12px_#00FF66]' :
                  simState === 'INCIDENT' ? 'bg-stop shadow-[0_0_12px_#ff3333] animate-pulse' :
                  'bg-[#00AAFF] shadow-[0_0_12px_#00AAFF]'
                }`} />
                <div className={`text-sm sm:text-base font-bold font-mono tracking-tight ${
                  simState === 'NORMAL' ? 'text-go' :
                  simState === 'INCIDENT' ? 'text-stop' :
                  'text-[#00AAFF]'
                }`}>
                  {simState === 'NORMAL' && 'ALL GATES CLEAR'}
                  {simState === 'INCIDENT' && 'CRITICAL: GATE B BLOCKED'}
                  {simState === 'RESOLVED' && 'REROUTE SUCCESSFUL'}
                </div>
              </div>
              
              <div className="mt-4 text-sm text-dim leading-relaxed">
                {simState === 'NORMAL' && 'Crowd flow is optimal. 33,000 attendees currently dispersing via their assigned primary routes.'}
                {simState === 'INCIDENT' && 'Gate B physically obstructed. 11,000 attendees stranded in Zone B. Crush density rising to dangerous levels.'}
                {simState === 'RESOLVED' && 'Zone B attendees instantly notified. Flow safely divided between Gates A and C without panic.'}
              </div>
            </div>

            <div className="mt-auto">
              <AnimatePresence mode="wait">
                {simState === 'NORMAL' && (
                  <motion.button 
                    key="btn-incident"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => setSimState('INCIDENT')}
                    className="w-full py-4 bg-stop/10 hover:bg-stop/20 border border-stop/30 rounded-xl text-stop font-bold flex justify-center items-center gap-2 transition-all shadow-lg"
                  >
                    <ShieldAlert className="w-5 h-5" /> Simulate Incident: Block Gate B
                  </motion.button>
                )}
                {simState === 'INCIDENT' && (
                  <motion.button 
                    key="btn-resolve"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setSimState('RESOLVED')}
                    className="w-full py-4 bg-go text-background rounded-xl font-bold flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:bg-white transition-all"
                  >
                    <Zap className="w-5 h-5" /> Activate FlowPass Re-Route
                  </motion.button>
                )}
                {simState === 'RESOLVED' && (
                  <motion.button 
                    key="btn-reset"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => setSimState('NORMAL')}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold flex justify-center items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" /> Reset Simulation
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Attendee Phone Box */}
          <div className="bg-card border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col items-center relative overflow-hidden">
             {/* Phone Mockup */}
             <motion.div 
              animate={simState === 'RESOLVED' ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="bg-[#0a0a0a] rounded-[2rem] border-[6px] border-white/10 p-4 relative overflow-hidden w-full max-w-[240px] aspect-[1/2] shadow-2xl flex flex-col"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/10 rounded-b-2xl z-20" /> {/* iPhone Notch */}
              
              <div className="mt-4 flex justify-between items-center px-2 z-10 relative">
                <span className="text-[9px] font-bold text-white tracking-widest flex items-center gap-1"><Smartphone className="w-3 h-3"/> FLOWPASS</span>
                <span className="text-[9px] text-white/50">9:41</span>
              </div>

              {/* Push Notification overlay */}
              <AnimatePresence>
                {simState === 'RESOLVED' && (
                  <motion.div 
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    className="absolute top-12 left-2 right-2 bg-white/15 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-2xl z-50 flex items-start gap-3"
                  >
                    <Bell className="w-5 h-5 text-go shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">Route Updated</div>
                      <div className="text-[10px] text-white/80 leading-tight">Gate B is blocked. Please proceed to Gate C safely.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-auto mb-auto bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center relative z-10 mx-2">
                <div className="text-[9px] text-dim uppercase tracking-widest mb-2 font-mono">Assigned Exit</div>
                <motion.div 
                   key={simState === 'RESOLVED' ? 'gateC' : 'gateB'}
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="text-6xl font-heading font-bold text-white mb-6"
                >
                  {simState === 'RESOLVED' ? 'C' : 'B'}
                </motion.div>
                
                <div className={`w-full py-2.5 rounded-lg text-xs font-bold font-mono tracking-wide flex items-center justify-center transition-colors duration-500 ${
                  simState === 'INCIDENT' ? 'bg-wait/20 text-wait border border-wait/30' : 
                  'bg-go/20 text-go border border-go/30'
                }`}>
                  {simState === 'INCIDENT' ? 'HOLD POSITION' : 'PROCEED TO EXIT'}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
