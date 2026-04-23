/**
 * FlowPass — RolesSwitcher Landing Component
 *
 * Three-tab interactive showcase demonstrating the product from
 * each user perspective: Organizer (laptop mockup), Attendee
 * (phone mockup with live pass), and Gate Staff (scanner mockup).
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Ticket, ShieldCheck, Smartphone, Laptop, ScanLine, Activity, Bell, Wifi, CheckCircle, AlertCircle } from 'lucide-react';

type Role = 'ORGANIZER' | 'ATTENDEE' | 'STAFF';

const ROLES = [
  {
    id: 'ORGANIZER' as Role,
    icon: Radio,
    title: '1. Organizer Control',
    desc: 'Dictate the flow of the entire venue. View live traffic metrics, unlock zones asynchronously, and blast announcements to 50,000 people instantly.',
    activeIconBg: 'bg-go/20',
    activeIconColor: 'text-go',
    glowColor: 'from-go/20 via-go/5 to-transparent'
  },
  {
    id: 'ATTENDEE' as Role,
    icon: Ticket,
    title: '2. Attendee Passes',
    desc: 'Zero app downloads. Attendees scan a QR code at their seat and instantly get a live digital pass telling them exactly when it is safe to leave.',
    activeIconBg: 'bg-blue-500/20',
    activeIconColor: 'text-blue-400',
    glowColor: 'from-blue-500/20 via-blue-500/5 to-transparent'
  },
  {
    id: 'STAFF' as Role,
    icon: ShieldCheck,
    title: '3. Gate Staff Tools',
    desc: 'Security guards open a secure link to validate passes and report gate congestion back to the Organizer in real-time.',
    activeIconBg: 'bg-purple-500/20',
    activeIconColor: 'text-purple-400',
    glowColor: 'from-purple-500/20 via-purple-500/5 to-transparent'
  }
];

export default function RolesSwitcher() {
  const [activeRole, setActiveRole] = useState<Role>('ORGANIZER');

  const activeRoleData = ROLES.find(r => r.id === activeRole)!;

  return (
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Left: Interactive Tabs */}
      <div className="space-y-4 w-full relative z-10">
        {ROLES.map((role) => {
          const isActive = activeRole === role.id;
          const Icon = role.icon;
          
          return (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`relative w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 outline-none group ${
                isActive ? '' : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Active Tab Background with layoutId for smooth gliding */}
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative z-10 flex items-start gap-4">
                <motion.div 
                  className={`p-3 rounded-xl shrink-0 transition-colors duration-300 ${
                    isActive ? role.activeIconBg + ' ' + role.activeIconColor : 'bg-white/5 text-dim group-hover:text-white/70'
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                    {role.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${isActive ? 'text-white/80' : 'text-dim group-hover:text-white/60'}`}>
                    {role.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: Cinematic POV Visualizer */}
      <div className="relative h-[350px] sm:h-[550px] w-full flex items-center justify-center perspective-1000 mt-8 lg:mt-0">
        {/* Dynamic Glowing Background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute w-[150%] h-[150%] bg-gradient-radial ${activeRoleData.glowColor} blur-[80px] opacity-40`}
            />
          </AnimatePresence>
        </div>
        
        <AnimatePresence mode="wait">
          {activeRole === 'ORGANIZER' && (
            <motion.div
              key="org"
              initial={{ opacity: 0, y: 30, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: -15 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative w-full max-w-[500px]"
            >
              {/* Floating Laptop */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full bg-slate-900 border border-slate-700/50 rounded-t-xl h-[280px] sm:h-[320px] overflow-hidden flex flex-col shadow-2xl relative z-10"
              >
                {/* Screen Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />
                
                {/* Browser Top Bar */}
                <div className="h-8 bg-slate-950 flex items-center px-4 gap-2 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-stop" />
                    <div className="w-2.5 h-2.5 rounded-full bg-wait" />
                    <div className="w-2.5 h-2.5 rounded-full bg-go" />
                  </div>
                  <div className="mx-auto w-1/3 h-4 bg-slate-800 rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-slate-600 rounded-sm" />
                  </div>
                </div>

                {/* Dashboard App */}
                <div className="flex-1 p-5 flex flex-col gap-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-go/20 text-go flex items-center justify-center">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="w-24 h-4 bg-slate-700 rounded" />
                    </div>
                    <div className="w-20 h-6 bg-go/10 border border-go/30 rounded-full flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-go animate-pulse" />
                      <span className="text-[10px] text-go font-bold tracking-wider">LIVE</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-20 bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex flex-col justify-end">
                        <div className="w-1/2 h-2 bg-slate-600 rounded-full mb-2" />
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${40 + Math.random() * 60}%` }}
                          transition={{ duration: 1, delay: 0.2 * i }}
                          className="h-1.5 bg-go rounded-full"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-xl mt-2 relative overflow-hidden flex items-end p-4">
                    {/* Fake Chart Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                    <svg className="absolute bottom-0 left-0 w-full h-full text-go/30 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        d="M0 100 C 20 80, 40 90, 60 40 S 80 60, 100 20 L 100 100 Z" 
                        fill="currentColor" 
                        opacity="0.2"
                      />
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        d="M0 100 C 20 80, 40 90, 60 40 S 80 60, 100 20" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Laptop Base */}
              <div className="relative z-20 w-[115%] -ml-[7.5%] h-5 bg-slate-800 border border-slate-700 rounded-b-2xl shadow-2xl flex justify-center items-start">
                <div className="w-24 h-1.5 bg-slate-600 rounded-b-lg" />
              </div>
              
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono font-bold flex items-center gap-2 text-white shadow-xl whitespace-nowrap z-30">
                <Laptop className="w-4 h-4 text-go" /> Omni-View Center
              </div>
            </motion.div>
          )}

          {activeRole === 'ATTENDEE' && (
            <motion.div
              key="att"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="relative w-[260px] sm:w-[300px]"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full bg-slate-950 border-[6px] sm:border-[8px] border-slate-800 rounded-[2.5rem] sm:rounded-[3rem] h-[500px] sm:h-[580px] overflow-hidden flex flex-col shadow-2xl relative z-10"
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl z-30" />
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none z-20" />

                <div className="h-24 bg-slate-900 border-b border-white/5 flex items-end px-6 pb-4 relative z-10">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-lg font-bold text-white flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-blue-400" /> Pass
                    </div>
                    <Wifi className="w-4 h-4 text-white/50" />
                  </div>
                </div>
                
                <div className="flex-1 p-5 flex flex-col gap-5 relative z-10">
                  {/* QR Code Area */}
                  <div className="w-full bg-white rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 border-[8px] border-slate-900 border-dashed rounded-xl opacity-30" />
                    {/* Scanning Laser */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_#3b82f6] opacity-70"
                    />
                  </div>
                  
                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-3 flex flex-col justify-center">
                      <div className="text-[10px] text-dim font-bold uppercase mb-1">Seat</div>
                      <div className="text-sm font-bold text-white">SEC 112, ROW G</div>
                    </div>
                    <div className="h-16 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-3 flex flex-col justify-center">
                      <div className="text-[10px] text-dim font-bold uppercase mb-1">Status</div>
                      <div className="text-sm font-bold text-wait flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-wait animate-pulse" />
                        WAITING
                      </div>
                    </div>
                  </div>
                  
                  {/* Notification popup */}
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className="mt-auto bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 flex gap-3 items-start shadow-lg"
                  >
                    <div className="p-2 bg-blue-500/20 rounded-full text-blue-400 mt-0.5 shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-1">Organizer Message</div>
                      <div className="text-[11px] text-blue-200/80 leading-snug">
                        Please remain seated. Your section will be dismissed in approx 4 minutes.
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono font-bold flex items-center gap-2 text-white shadow-xl whitespace-nowrap z-30">
                <Smartphone className="w-4 h-4 text-blue-400" /> Digital Live Pass
              </div>
            </motion.div>
          )}

          {activeRole === 'STAFF' && (
             <motion.div
             key="stf"
             initial={{ opacity: 0, x: 30, rotateY: 15 }}
             animate={{ opacity: 1, x: 0, rotateY: 0 }}
             exit={{ opacity: 0, x: -30, rotateY: -15 }}
             transition={{ duration: 0.4, type: "spring" }}
             className="relative w-[260px] sm:w-[300px] perspective-1000"
           >
             <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full bg-slate-900 border-[6px] sm:border-[8px] border-slate-700 rounded-[2.5rem] h-[500px] sm:h-[580px] overflow-hidden flex flex-col shadow-2xl relative z-10"
             >
               {/* Industrial Scanner Top */}
               <div className="h-6 bg-slate-800 w-full absolute top-0 z-20 border-b border-slate-700 flex justify-center items-center">
                 <div className="w-16 h-1 bg-slate-600 rounded-full" />
               </div>
               
               <div className="h-20 bg-slate-950 flex items-end px-6 pb-3 pt-8 border-b border-white/5 relative z-10">
                 <div className="flex items-center justify-between w-full">
                    <div className="text-sm font-mono font-bold text-purple-400 flex items-center gap-2">
                      <ScanLine className="w-4 h-4" /> GATE 03
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-go" />
                      <div className="w-1.5 h-1.5 rounded-full bg-go" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    </div>
                 </div>
               </div>
               
               {/* Scanner Viewfinder */}
               <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                 {/* Scanner lines grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                 
                 <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    {/* Scanner Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-xl" />
                    
                    {/* Moving Laser */}
                    <motion.div 
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute left-0 w-full h-0.5 bg-go shadow-[0_0_20px_#22c55e] z-20"
                    />
                    
                    {/* Ghost QR Code in background */}
                    <div className="absolute inset-4 border-4 border-white/10 border-dashed rounded-lg flex items-center justify-center">
                      <ScanLine className="w-12 h-12 text-white/5" />
                    </div>
                 </div>
               </div>
               
               {/* Bottom Controls */}
               <div className="h-44 bg-slate-950 p-4 shrink-0 flex flex-col gap-3 relative z-10 border-t border-slate-800">
                  <div className="text-xs font-mono text-dim mb-1 flex justify-between">
                    <span>ZONES</span>
                    <span>STATUS</span>
                  </div>
                  <motion.div 
                    animate={{ backgroundColor: ['rgba(34,197,94,0.1)', 'rgba(34,197,94,0.2)', 'rgba(34,197,94,0.1)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-12 border border-go/40 rounded-xl flex items-center justify-between px-4 font-bold text-go"
                  >
                    <span>ZONE A</span>
                    <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> ALLOW</span>
                  </motion.div>
                  <div className="h-12 bg-stop/10 border border-stop/30 rounded-xl flex items-center justify-between px-4 font-bold text-stop opacity-60">
                    <span>ZONE B</span>
                    <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4" /> DENY</span>
                  </div>
               </div>
             </motion.div>
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono font-bold flex items-center gap-2 text-white shadow-xl whitespace-nowrap z-30">
               <ShieldCheck className="w-4 h-4 text-purple-400" /> Security Terminal
             </div>
           </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
