import React from 'react';
import { ModeDefinition } from '../types';
import * as Icons from 'lucide-react';

interface ModeCardProps {
  mode: ModeDefinition;
  isSelected: boolean;
  onClick: () => void;
}

export const ModeCard: React.FC<ModeCardProps> = ({ mode, isSelected, onClick }) => {
  const IconComponent = (Icons as any)[mode.icon] || Icons.HelpCircle;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative w-full text-left p-5 rounded-2xl border transition-all duration-300 group
        ${isSelected 
          ? 'glass-panel border-opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.3)]' 
          : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700'
        }
      `}
      style={{
        borderColor: isSelected ? mode.color : undefined,
      }}
    >
      {isSelected && (
        <div 
            className="absolute inset-0 rounded-2xl opacity-10 blur-xl transition-all duration-500"
            style={{ backgroundColor: mode.color }}
        />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
            <div 
            className={`p-2.5 rounded-xl transition-all duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
            style={{ 
                backgroundColor: isSelected ? mode.color : 'rgba(255,255,255,0.05)', 
                color: isSelected ? '#0f172a' : mode.color 
            }}
            >
            <IconComponent size={22} strokeWidth={isSelected ? 2.5 : 2} />
            </div>
            
            <div className={`
                w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center transition-colors
                ${isSelected ? 'bg-white border-white' : ''}
            `}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
            </div>
        </div>
        
        <h3 className={`font-serif font-bold text-lg mb-1 transition-colors ${isSelected ? 'text-white' : 'text-slate-200'}`}>
            {mode.name}
        </h3>
        <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80" style={{ color: mode.color }}>
            {mode.alias}
        </p>
        <p className={`text-sm leading-relaxed transition-colors ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
            {mode.description}
        </p>
      </div>
    </button>
  );
};