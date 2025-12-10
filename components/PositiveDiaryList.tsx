import React from 'react';
import { PositiveLogEntry } from '../types';
import { Calendar, Trash2, Sun, Heart, Sparkles, Flag, Moon } from 'lucide-react';

interface PositiveDiaryListProps {
  logs: PositiveLogEntry[];
  onDelete: (id: string) => void;
}

export const PositiveDiaryList: React.FC<PositiveDiaryListProps> = ({ logs, onDelete }) => {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
        <div className="p-4 rounded-full bg-amber-900/10">
            <Moon className="text-amber-500/30" size={40} />
        </div>
        <p className="text-center">まだ日記がありません。<br/>1日の終わりに記録してみましょう。</p>
      </div>
    );
  }

  const renderSection = (icon: React.ReactNode, title: string, items: string[], colorClass: string) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="mb-4 last:mb-0">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 ${colorClass} opacity-80`}>
                {icon}
                <span>{title}</span>
            </div>
            <ul className="space-y-2 pl-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className={`mt-2 w-1 h-1 rounded-full ${colorClass.replace('text-', 'bg-')} shrink-0 opacity-70`} />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
  };

  return (
    <div className="space-y-8 pb-24 animate-fade-in">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-amber-100 flex items-center gap-2">
            <Moon size={20} className="text-amber-500" />
            Dairy History
        </h2>
        <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">{logs.length} Days</span>
      </header>
      
      <div className="grid gap-6">
        {logs.map((log) => (
            <div 
                key={log.id} 
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden transition-all hover:border-slate-600 group"
            >
                {/* Date Header */}
                <div className="bg-slate-800/80 px-5 py-3 flex justify-between items-center border-b border-slate-700/50">
                    <div className="flex items-center gap-2 text-slate-200">
                        <Calendar size={16} className="text-amber-500" />
                        <span className="font-bold tracking-wide">
                            {new Date(log.timestamp).toLocaleDateString('ja-JP', {
                                month: 'long', day: 'numeric', weekday: 'short'
                            })}
                        </span>
                        <span className="text-xs text-slate-500 ml-2 font-mono">
                            {new Date(log.timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            if(window.confirm('この日の記録を削除しますか？')) onDelete(log.id);
                        }}
                        className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-2 hover:bg-slate-700 rounded-lg"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 grid md:grid-cols-2 gap-6">
                    {/* Left Column: Today's Reflection */}
                    <div className="space-y-4">
                        {renderSection(
                            <Sun size={14} />, 
                            "Good Things", 
                            log.goodThings, 
                            "text-amber-400"
                        )}
                        {renderSection(
                            <Heart size={14} />, 
                            "Gratitude", 
                            log.gratitude, 
                            "text-rose-400"
                        )}
                    </div>
                    
                    {/* Right Column: Tomorrow's Setup */}
                    <div className="space-y-4 md:border-l md:border-slate-700/50 md:pl-6">
                        {renderSection(
                            <Sparkles size={14} />, 
                            "Looking Forward", 
                            log.lookingForward, 
                            "text-cyan-400"
                        )}
                        {renderSection(
                            <Flag size={14} />, 
                            "Goal Setting", 
                            log.goals, 
                            "text-emerald-400"
                        )}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};