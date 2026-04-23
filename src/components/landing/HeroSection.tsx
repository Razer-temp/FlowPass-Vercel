import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Ticket, Activity, ShieldCheck, Map, BarChart3, MoveUpRight, Hexagon, Signal, Lock, CheckCircle2 } from 'lucide-react';

const HERO_CYCLE_INTERVAL_MS = 4000;
const VENUE_CYCLE_INTERVAL_MS = 6000;

const VENUES = [
  { 
    id: 'wankhede', 
    name: 'WANKHEDE', 
    zone: 'ZONE C', 
    event: 'Cricket World Cup Final',
    capacity: '32,500',
    loadWait: '98%',
    loadActive: '42%',
    image: '/stadium-heatmap.png', 
    colorClass: 'text-go',
    user: { name: 'RAHUL S.', gate: '2', node: '8X9A' }
  },
  { 
    id: 'o2', 
    name: 'O2 ARENA', 
    zone: 'BLOCK 112', 
    event: 'Coldplay Live Tour',
    capacity: '20,000',
    loadWait: '86%',
    loadActive: '38%',
    image: '/o2-heatmap.png', 
    colorClass: 'text-blue-400',
    user: { name: 'SARAH K.', gate: 'D', node: '4B12' }
  },
  { 
    id: 'wembley', 
    name: 'WEMBLEY', 
    zone: 'SECTOR A', 
    event: 'FA Cup Final',
    capacity: '90,000',
    loadWait: '100%',
    loadActive: '65%',
    image: '/wembley-heatmap.png', 
    colorClass: 'text-orange-500',
    user: { name: 'JAMES T.', gate: 'H', node: '9Y2C' }
  }
];

export default function HeroSection() {
  const [passState, setPassState] = useState<'WAIT' | 'ACTIVE'>('WAIT');
  const [venueIndex, setVenueIndex] = useState(0);

  // Auto-cycle the pass state
  useEffect(() => {
    const interval = setInterval(() => {
      setPassState(s => s === 'WAIT' ? 'ACTIVE' : 'WAIT');
    }, HERO_CYCLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle the venue maps
  useEffect(() => {
    const interval = setInterval(() => {
      setVenueIndex(prev => (prev + 1) % VENUES.length);
    }, VENUE_CYCLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const currentVenue = VENUES[venueIndex];

  return (
    <section className="relative pt-12 md:pt-28 pb-16 md:pb-32 overflow-hidden flex flex-col items-center border-b border-white/5 bg-[#030303]">
      
      {/* Immersive Data Stream Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-emerald-900/10 rounded-full blur-[150px] mix-blend-screen transition-colors duration-1000" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen" />
        
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, 
            backgroundSize: '60px 60px' 
          }}
        >
           <motion.div 
             animate={{ opacity: [0.2, 0.8, 0.2] }}
             transition={{ repeat: Infinity, duration: 4 }}
             className="absolute top-[120px] left-[240px] w-2 h-2 bg-go rounded-full shadow-[0_0_10px_rgba(0,255,102,1)]"
           />
           <motion.div 
             animate={{ opacity: [0.2, 0.8, 0.2] }}
             transition={{ repeat: Infinity, duration: 5, delay: 1 }}
             className="absolute top-[360px] left-[600px] w-2 h-2 bg-go rounded-full shadow-[0_0_10px_rgba(0,255,102,1)]"
           />
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left relative z-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-dim mb-8 shadow-lg backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-go opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-go"></span>
            </span>
            <span className="tracking-widest text-white/80">ENTERPRISE CROWD INFRASTRUCTURE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            End the<br />
            Post-Event<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-go via-emerald-400 to-teal-500 drop-shadow-sm">Stampede.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-xl text-dim mb-10 max-w-lg leading-relaxed font-light"
          >
            FlowPass is the intelligent crowd management infrastructure that eliminates dangerous post-event surges. We turn chaotic exits into coordinated, data-driven departures.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
          >
            <Link 
              to="/create" 
              className="group relative px-8 py-4 bg-white text-background font-bold rounded-lg transition-all duration-300 overflow-hidden flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                <Activity className="w-5 h-5 text-background" />
              </motion.div>
              <span>Deploy FlowPass</span>
            </Link>
            
            <Link 
              to="/events" 
              className="group px-8 py-4 bg-background/50 backdrop-blur-md border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3 hover:border-white/20"
            >
              <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
                <Ticket className="w-5 h-5 text-dim group-hover:text-white transition-colors" />
              </motion.div>
              <span>Get My Pass</span>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col gap-3 w-full"
          >
            <div className="text-xs font-mono text-dim/60 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Trusted by leading venues
            </div>
            <div className="flex items-center gap-6 text-dim/40 filter grayscale opacity-60">
              <span className="font-heading font-bold text-lg tracking-wider">WANKHEDE</span>
              <span className="font-heading font-bold text-lg tracking-wider">O2 ARENA</span>
              <span className="font-heading font-bold text-lg tracking-wider">WEMBLEY</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content: The Command Center Cluster */}
        <div className="relative w-full h-[500px] md:h-[600px] mx-auto lg:ml-auto lg:mr-0 perspective-1200 mt-12 lg:mt-0 select-none">
          
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 z-10 w-full h-full"
          >
            {/* Ambient Cluster Glow */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] blur-[100px] transition-colors duration-1000 pointer-events-none rounded-full ${passState === 'WAIT' ? 'bg-orange-500/15' : 'bg-go/20'}`} 
              style={{ transform: "translateZ(-100px)" }}
            />

            {/* WIDGET 1: Global Venue Vector Map (Carousel) */}
            <motion.div 
              className="absolute top-0 right-0 w-[85%] h-[60%] rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F] backdrop-blur-md shadow-2xl"
              style={{ transform: "translateZ(-20px)" }}
            >
              {/* Carousel Backgrounds */}
              <AnimatePresence>
                <motion.div 
                  key={venueIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cover bg-center mix-blend-screen"
                  style={{ backgroundImage: `url(${currentVenue.image})`, filter: passState === 'WAIT' ? 'saturate(0.3) opacity(0.5)' : 'saturate(1.2)' }}
                />
              </AnimatePresence>

              {/* Overlay styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Map className="w-4 h-4 text-dim" />
                <span className="text-xs font-mono text-dim tracking-widest uppercase">Live Vector Map</span>
              </div>
              
              {/* NEW: Live Telemetry Panel (Top Right) */}
              <div className="absolute top-4 right-4 text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentVenue.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-end gap-1 bg-black/40 backdrop-blur-md border border-white/5 p-2 px-3 rounded-lg"
                  >
                    <div className="text-[10px] font-mono text-dim tracking-widest uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE EVENT
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{currentVenue.event}</div>
                    
                    <div className="flex gap-4">
                      <div className="text-right">
                        <div className="text-[9px] font-mono text-dim/60 tracking-widest uppercase">ATTENDANCE</div>
                        <div className="text-xs font-mono text-white/80">{currentVenue.capacity}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-mono text-dim/60 tracking-widest uppercase">LOAD</div>
                        <div className={`text-xs font-mono font-bold transition-colors duration-500 ${passState === 'WAIT' ? 'text-orange-400' : currentVenue.colorClass}`}>
                          {passState === 'WAIT' ? currentVenue.loadWait : currentVenue.loadActive}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="absolute bottom-4 left-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentVenue.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-dim text-[10px] font-mono uppercase tracking-wider mb-0.5">{currentVenue.name}</div>
                    <div className="text-3xl font-heading font-bold text-white drop-shadow-md">{currentVenue.zone}</div>
                  </motion.div>
                </AnimatePresence>
                
                <div className={`mt-1 text-xs font-mono tracking-widest flex items-center gap-2 transition-colors duration-500 ${passState === 'WAIT' ? 'text-orange-400' : currentVenue.colorClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${passState === 'WAIT' ? 'bg-orange-400' : 'bg-current'}`} />
                  {passState === 'WAIT' ? 'HOLDING CROWD' : 'FLOW OPTIMIZED'}
                </div>
              </div>
            </motion.div>

            {/* WIDGET 2: Live Density Graph */}
            <motion.div 
              className="absolute bottom-12 left-0 w-[60%] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl p-5"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-dim mb-1">
                    <BarChart3 className="w-3.5 h-3.5" /> DENSITY
                  </div>
                  
                  {/* Syncing load display with smooth animation */}
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentVenue.id + passState}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl font-bold font-mono text-white flex items-center"
                    >
                      {passState === 'WAIT' ? currentVenue.loadWait : currentVenue.loadActive}
                      <span className={`text-xs ml-2 flex items-center inline-flex ${passState === 'WAIT' ? 'text-orange-400' : 'text-go'}`}>
                        <MoveUpRight className={`w-3 h-3 ${passState === 'WAIT' ? '' : 'rotate-90'}`} />
                      </span>
                    </motion.div>
                  </AnimatePresence>

                </div>
                <div className={`px-2 py-1 text-[10px] font-mono rounded ${passState === 'WAIT' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-go/20 text-go border border-go/30'}`}>
                  {passState === 'WAIT' ? 'CRITICAL' : 'CLEARING'}
                </div>
              </div>

              {/* Animated Graph lines synchronized to the venue hash/id implicitly */}
              <div className="h-16 w-full flex items-end gap-[2px]">
                 {[...Array(24)].map((_, i) => (
                   <motion.div 
                     key={`${venueIndex}-${i}`}
                     className={`w-full rounded-t-sm ${passState === 'ACTIVE' ? 'bg-go/40' : 'bg-orange-500/40'}`}
                     initial={{ height: '20%' }}
                     animate={{ 
                       height: passState === 'ACTIVE' 
                         ? `${Math.max(10, 80 - i * 3 + Math.random() * 20)}%` 
                         : `${Math.min(100, 40 + Math.random() * 60)}%` 
                     }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                   />
                 ))}
              </div>
            </motion.div>

            {/* WIDGET 3: User Node / Pass Mini */}
            <motion.div 
              className={`absolute -bottom-4 right-4 w-[55%] rounded-2xl border transition-colors duration-500 bg-black/60 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden ${passState === 'WAIT' ? 'border-orange-500/30' : 'border-go/40'}`}
              style={{ transform: "translateZ(80px)" }}
            >
               {/* Shimmer */}
               <motion.div 
                 className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                 animate={{ left: ['-100%', '200%'] }}
                 transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
               />

               <div className="relative z-10 p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                 <div className="flex items-center gap-2">
                   <Hexagon className="w-4 h-4 text-dim" />
                   {/* Dynamic Node ID */}
                   <AnimatePresence mode="wait">
                     <motion.span 
                       key={currentVenue.user.node}
                       initial={{ opacity: 0, y: 5 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -5 }}
                       transition={{ duration: 0.3 }}
                       className="text-[10px] font-mono text-dim tracking-widest uppercase"
                     >
                       Node {currentVenue.user.node}
                     </motion.span>
                   </AnimatePresence>
                 </div>
                 <Signal className={`w-3.5 h-3.5 ${passState === 'WAIT' ? 'text-orange-400 animate-pulse' : 'text-go'}`} />
               </div>

               <div className="relative z-10 p-5">
                  <div className="flex justify-between items-end mb-4">
                     <div>
                       <div className="text-dim text-[10px] font-mono tracking-widest mb-1">USER</div>
                       {/* Dynamic User Name */}
                       <AnimatePresence mode="wait">
                         <motion.div 
                           key={currentVenue.user.name}
                           initial={{ opacity: 0, y: 5 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -5 }}
                           transition={{ duration: 0.3 }}
                           className="font-heading font-bold text-lg text-white"
                         >
                           {currentVenue.user.name}
                         </motion.div>
                       </AnimatePresence>
                     </div>
                     <div className="text-right">
                       <div className="text-dim text-[10px] font-mono tracking-widest mb-1">GATE</div>
                       {/* Dynamic Gate */}
                       <AnimatePresence mode="wait">
                         <motion.div 
                           key={currentVenue.user.gate}
                           initial={{ opacity: 0, y: 5 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -5 }}
                           transition={{ duration: 0.3 }}
                           className={`font-heading font-bold text-2xl transition-colors ${passState === 'ACTIVE' ? 'text-go drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]' : 'text-white'}`}
                         >
                           {currentVenue.user.gate}
                         </motion.div>
                       </AnimatePresence>
                     </div>
                  </div>

                  <div className={`w-full p-3 rounded-lg border flex items-center justify-between transition-colors duration-500 ${passState === 'WAIT' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-go/10 border-go/40 text-go'}`}>
                    <div className="flex items-center gap-2">
                      {passState === 'WAIT' ? <Lock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      <span className="text-xs font-bold tracking-widest">{passState === 'WAIT' ? 'HOLD' : 'PROCEED'}</span>
                    </div>
                    {passState === 'WAIT' && <span className="font-timer text-sm">18:32</span>}
                  </div>
               </div>
            </motion.div>

            {/* Connecting SVG Data Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: "translateZ(10px)" }}>
              <line 
                x1="60%" y1="50%" x2="60%" y2="70%" 
                stroke={passState === 'WAIT' ? 'rgba(255,255,255,0.1)' : 'rgba(0,255,102,0.3)'} 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
              <line 
                x1="60%" y1="70%" x2="30%" y2="70%" 
                stroke={passState === 'WAIT' ? 'rgba(255,255,255,0.1)' : 'rgba(0,255,102,0.3)'} 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
              
              <motion.circle 
                cx="30%" cy="70%" r="3" 
                fill={passState === 'WAIT' ? '#666' : '#00ff66'}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              <line 
                x1="80%" y1="50%" x2="80%" y2="85%" 
                stroke={passState === 'WAIT' ? 'rgba(255,255,255,0.1)' : 'rgba(0,255,102,0.3)'} 
                strokeWidth="1.5" 
              />
              {passState === 'ACTIVE' && (
                <motion.circle 
                  cx="80%" cy="50%" r="2" 
                  fill="#00ff66"
                  animate={{ cy: ['50%', '85%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
              )}
            </svg>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
