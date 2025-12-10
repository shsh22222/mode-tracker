import React from 'react';
import { LogEntry, ModeId } from '../types';
import { MODES } from '../constants';
import { Trash2, Calendar, Frown, ShieldCheck } from 'lucide-react';

interface LogListProps {
  logs: LogEntry[];
  onDelete: (id: string) => void;
}

export const LogList: React.FC<LogListProps> = ({ logs, onDelete }) => {
  if (logs.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        まだ記録がありません。
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
        <Calendar size={20} />
        記録履歴
      </h2>
      
      {logs.map((log) => (
        <div 
          key={log.id} 
          className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl p-5 transition-all group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-wrap gap-2">
              {log.modes.map((modeId) => {
                const mode = MODES[modeId];
                return (
                  <span 
                    key={modeId}
                    className="text-xs font-bold px-2 py-1 rounded shadow-sm"
                    style={{ backgroundColor: mode.color, color: '#1e293b' }}
                  >
                    {mode.name}
                  </span>
                );
              })}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              {new Date(log.timestamp).toLocaleString('ja-JP', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
            {log.situation}
          </p>

          {/* Display CBT Counter if present */}
          {log.cbtCounter && (
            <div className="mb-4 bg-emerald-900/10 border-l-2 border-emerald-500/50 p-3 rounded-r-lg">
               <div className="flex items-center gap-1.5 mb-1 text-emerald-400 text-xs font-bold">
                 <ShieldCheck size={12} />
                 <span>バランス思考</span>
               </div>
               <p className="text-emerald-100/90 text-sm leading-relaxed">
                 {log.cbtCounter}
               </p>
            </div>
          )}

          <div className="flex justify-between items-center border-t border-slate-700/50 pt-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded">
                <Frown size={12} /> {log.emotion}
              </span>
              <span className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded">
                強度: {log.emotionIntensity}/10
              </span>
            </div>
            
            <button
              onClick={() => {
                if(window.confirm('このログを削除しますか？')) onDelete(log.id);
              }}
              className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};