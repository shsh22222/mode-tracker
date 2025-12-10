import React, { useState } from 'react';
import { Save, Sun, Heart, Sparkles, Flag, Moon } from 'lucide-react';

interface PositiveDiaryFormProps {
  onSave: (data: {
    goodThings: string[];
    gratitude: string[];
    lookingForward: string[];
    goals: string[];
  }) => void;
  onCancel: () => void;
}

export const PositiveDiaryForm: React.FC<PositiveDiaryFormProps> = ({ onSave, onCancel }) => {
  const [goodThings, setGoodThings] = useState<string[]>(['', '', '', '']);
  const [gratitude, setGratitude] = useState<string[]>(['', '', '', '']);
  const [lookingForward, setLookingForward] = useState<string[]>(['', '', '', '']);
  const [goals, setGoals] = useState<string[]>(['', '', '', '']);
  
  const [error, setError] = useState('');

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    currentValues: string[],
    index: number,
    value: string
  ) => {
    const newValues = [...currentValues];
    newValues[index] = value;
    setter(newValues);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allInputs = [...goodThings, ...gratitude, ...lookingForward, ...goals];
    if (allInputs.every(i => i.trim() === '')) {
      setError('Even a single word is enough.');
      return;
    }
    onSave({ goodThings, gratitude, lookingForward, goals });
  };

  const renderSection = (
    title: string,
    description: string,
    icon: React.ReactNode,
    values: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    accentColor: string
  ) => (
    <div className="group animate-fade-in">
        <div className="flex items-center gap-3 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className={`text-${accentColor}`}>{icon}</div>
            <div>
                <h3 className={`font-serif font-bold text-lg text-slate-200`}>{title}</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{description}</p>
            </div>
        </div>
      <div className="space-y-3">
        {values.map((val, idx) => (
          <input
            key={idx}
            type="text"
            placeholder="..."
            value={val}
            onChange={(e) => handleInputChange(setter, values, idx, e.target.value)}
            className="w-full glass-input rounded-lg py-3 px-4 text-slate-200 placeholder-slate-700 focus:ring-1 focus:ring-white/20 focus:bg-slate-900/80 outline-none transition-all duration-300 text-sm"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto pb-32">
      <header className="mb-10 text-center pt-8">
        <div className="inline-block p-4 rounded-full bg-amber-500/10 ring-1 ring-amber-500/20 mb-4 shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]">
            <Moon className="text-amber-300" size={32} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-100 mb-2">Evening Reflection</h2>
        <p className="text-slate-500 text-sm tracking-wide">Close the day with gratitude. Open tomorrow with purpose.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* Today */}
        <div className="relative glass-panel p-6 sm:p-8 rounded-3xl space-y-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 px-4 py-1 bg-slate-900/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-white/5">
                The Past Day
            </div>
            
            {renderSection(
                "Good Things",
                "Small wins & joys",
                <Sun size={18} />,
                goodThings,
                setGoodThings,
                "amber-400"
            )}

            {renderSection(
                "Gratitude",
                "Connections & kindness",
                <Heart size={18} />,
                gratitude,
                setGratitude,
                "rose-400"
            )}
        </div>

        {/* Tomorrow */}
        <div className="relative glass-panel p-6 sm:p-8 rounded-3xl space-y-8">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 px-4 py-1 bg-slate-900/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-white/5">
                 The Next Day
            </div>

            {renderSection(
                "Anticipation",
                "Excitement & rewards",
                <Sparkles size={18} />,
                lookingForward,
                setLookingForward,
                "cyan-400"
            )}

            {renderSection(
                "Vision & Goals",
                "Who you want to be",
                <Flag size={18} />,
                goals,
                setGoals,
                "emerald-400"
            )}
        </div>

        {error && (
            <div className="text-center animate-fade-in">
                <p className="inline-block text-rose-300 text-xs tracking-wide bg-rose-950/40 px-6 py-2 rounded-full border border-rose-500/20">
                    {error}
                </p>
            </div>
        )}

        <div className="flex items-center gap-4 pt-4 sticky bottom-24 md:static bg-slate-950/80 backdrop-blur-md md:bg-transparent p-6 -mx-6 md:p-0 md:mx-0 border-t border-white/5 md:border-0 z-10">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 rounded-xl text-slate-500 font-medium hover:text-slate-300 transition-colors text-sm hover:bg-white/5"
          >
            Discard
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-amber-700 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-900/40 ring-1 ring-white/10"
          >
            <Save size={18} />
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};