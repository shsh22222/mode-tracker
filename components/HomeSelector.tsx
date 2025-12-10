import React from 'react';
import { Ghost, Moon, ArrowRight, Activity } from 'lucide-react';

interface HomeSelectorProps {
  onSelectMode: (mode: 'tracker' | 'diary') => void;
}

export const HomeSelector: React.FC<HomeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 animate-fade-in">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-serif font-bold text-white mb-3">Where to focus?</h2>
        <div className="h-1 w-12 bg-slate-700 rounded-full mx-auto"></div>
      </div>

      {/* Mode Tracker Card */}
      <button
        onClick={() => onSelectMode('tracker')}
        className="group relative w-full glass-panel p-1 rounded-3xl transition-all duration-500 hover:bg-indigo-900/20 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center p-6 sm:p-8 gap-6">
          <div className="flex-shrink-0">
             <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center ring-1 ring-inset ring-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
                <Ghost size={32} />
             </div>
          </div>
          <div className="flex-grow text-left">
            <h3 className="text-2xl font-serif text-slate-100 group-hover:text-indigo-200 transition-colors mb-1">Mode Tracker</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Self-Analysis</p>
            <p className="text-sm text-slate-400 leading-relaxed opacity-80">
              Label your "modes" to detach from self-critical spirals. Visualize your thought patterns.
            </p>
          </div>
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <ArrowRight className="text-indigo-400" />
          </div>
        </div>
      </button>

      {/* Positive Diary Card */}
      <button
        onClick={() => onSelectMode('diary')}
        className="group relative w-full glass-panel p-1 rounded-3xl transition-all duration-500 hover:bg-amber-900/20 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center p-6 sm:p-8 gap-6">
          <div className="flex-shrink-0">
             <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center ring-1 ring-inset ring-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                <Moon size={32} />
             </div>
          </div>
          <div className="flex-grow text-left">
            <h3 className="text-2xl font-serif text-slate-100 group-hover:text-amber-200 transition-colors mb-1">Positive Diary</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Evening Routine</p>
            <p className="text-sm text-slate-400 leading-relaxed opacity-80">
              End the day with gratitude. Prepare for tomorrow with hope. The 4x4 method.
            </p>
          </div>
           <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <ArrowRight className="text-amber-400" />
          </div>
        </div>
      </button>
    </div>
  );
};