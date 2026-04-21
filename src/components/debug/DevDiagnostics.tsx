import { useState } from 'react';
import { Shield, CheckCircle2, XCircle, Info } from 'lucide-react';

/**
 * DevDiagnostics — Environment Verification Tool
 * 
 * This component checks for the presence of required VITE_ environment 
 * variables in the production build and reports their status.
 * It uses masked values to ensure security while confirming availability.
 */

const REQUIRED_VARS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_GEMINI_API_KEY',
  'VITE_GOOGLE_MAPS_API_KEY',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID'
];

export default function DevDiagnostics() {
  const [isOpen, setIsOpen] = useState(false);

  const checkVar = (name: string) => {
    const value = import.meta.env[name];
    if (!value) return { status: 'MISSING', color: 'text-red-400' };
    
    // Masked value for display
    const masked = value.length > 8 
      ? value.substring(0, 4) + '...' + value.substring(value.length - 4)
      : '********';
      
    return { status: masked, color: 'text-green-400' };
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white/20 hover:text-white transition-all"
        title="Debug Diagnostics"
      >
        <Shield size={16} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-sm">
          <Shield size={14} className="text-blue-400" />
          Deployment Health
        </div>
        <button onClick={() => setIsOpen(false)} className="text-dim hover:text-white">
          <Info size={14} />
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        {REQUIRED_VARS.map(name => {
          const { status, color } = checkVar(name);
          return (
            <div key={name} className="flex flex-col gap-1">
              <div className="text-[10px] text-dim font-mono tracking-tight">{name}</div>
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs ${color}`}>{status}</span>
                {status === 'MISSING' ? <XCircle size={12} className="text-red-400" /> : <CheckCircle2 size={12} className="text-green-400" />}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white/[0.02] p-3 text-[10px] text-dim border-t border-white/5 italic">
        Only VITE_ prefixed variables are accessible to the client.
      </div>
    </div>
  );
}
