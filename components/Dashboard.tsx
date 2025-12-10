import React, { useMemo } from 'react';
import { LogEntry, ModeId } from '../types';
import { MODES } from '../constants';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TrendingUp, AlertTriangle, Activity } from 'lucide-react';

interface DashboardProps {
  logs: LogEntry[];
}

export const Dashboard: React.FC<DashboardProps> = ({ logs }) => {
  const stats = useMemo(() => {
    const modeCounts: Record<string, number> = {};
    const comboCounts: Record<string, number> = {};

    logs.forEach(log => {
      // Single Mode Counts
      log.modes.forEach(modeId => {
        modeCounts[modeId] = (modeCounts[modeId] || 0) + 1;
      });

      // Combo Counts
      if (log.modes.length > 1) {
        const sorted = [...log.modes].sort().join('+');
        comboCounts[sorted] = (comboCounts[sorted] || 0) + 1;
      }
    });

    const chartData = Object.values(MODES).map(mode => ({
      name: mode.name.replace('モード', '').replace('ストーリー', ''),
      fullMark: 100,
      count: modeCounts[mode.id] || 0,
      id: mode.id,
      color: mode.color
    }));

    let topCombo = null;
    let maxComboCount = 0;
    Object.entries(comboCounts).forEach(([key, count]) => {
      if (count > maxComboCount) {
        maxComboCount = count;
        topCombo = key.split('+');
      }
    });

    return {
      chartData,
      totalLogs: logs.length,
      topCombo: topCombo ? topCombo.map(id => MODES[id as ModeId]) : null,
      topComboCount: maxComboCount
    };
  }, [logs]);

  const profileName = useMemo(() => {
    if (stats.chartData.every(d => d.count === 0)) return 'No Data Yet';
    
    const sorted = [...stats.chartData].sort((a, b) => b.count - a.count);
    const top1 = sorted[0];
    const top2 = sorted[1];

    if (top1.count === 0) return 'No Data Yet';

    if (!top2 || top2.count === 0 || top1.count > top2.count * 2) {
      return `Dominant: ${top1.name}`;
    }

    const alias1 = MODES[top1.id as ModeId].alias.replace('内なる', '').replace('担当', '').replace('予報', '');
    const alias2 = MODES[top2.id as ModeId].alias.replace('内なる', '').replace('担当', '').replace('予報', '');
    
    return `${alias1} × ${alias2}`;
  }, [stats]);

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 glass-panel rounded-3xl text-center">
        <div className="p-4 bg-white/5 rounded-full mb-6 animate-pulse-slow ring-1 ring-white/10">
          <Activity className="text-indigo-300" size={32} />
        </div>
        <h3 className="text-xl font-serif text-slate-200 mb-2">Awaiting Insights</h3>
        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
          Log your first entry to visualize the shape of your thought patterns.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-24">
      {/* Profile Header */}
      <section className="relative overflow-hidden glass-panel p-8 rounded-3xl group">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors duration-1000"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2 opacity-80">
            <Activity size={12} />
            Current Profile
          </h2>
          <div className="text-3xl font-serif font-bold text-slate-100 mb-2 tracking-wide">
            {profileName}
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Based on last {stats.totalLogs} entries
          </p>
        </div>
      </section>

      {/* Main Radar Chart */}
      <div className="glass-panel p-4 rounded-3xl relative">
        <div className="h-80 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="52%" outerRadius="70%" data={stats.chartData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'Inter', fontWeight: 500 }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
              <Radar
                name="Frequency"
                dataKey="count"
                stroke="#818cf8"
                strokeWidth={3}
                fill="#6366f1"
                fillOpacity={0.2}
                isAnimationActive={true}
              />
              <Tooltip
                cursor={false}
                contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px', 
                    color: '#fff',
                    padding: '8px 12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
                itemStyle={{ color: '#a5b4fc', fontSize: '12px', fontWeight: 600 }}
                labelStyle={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
          {/* Custom Glow Filter for SVG */}
          <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
             {/* This is a visual trick to add more glow if needed, but Recharts stroke helps */}
          </div>
        </div>
      </div>

      {/* Combo Insight */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
           <AlertTriangle size={14} className="text-amber-500/80"/>
           Frequent Pattern
        </h3>
        
        {stats.topCombo ? (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {stats.topCombo.map((mode, idx) => (
                <React.Fragment key={mode.id}>
                  <div 
                    className="px-4 py-2 rounded-lg text-sm font-bold shadow-lg border border-white/5 backdrop-blur-md"
                    style={{ backgroundColor: `${mode.color}15`, color: mode.color, borderColor: `${mode.color}30` }}
                  >
                    {mode.name}
                  </div>
                  {idx < stats.topCombo!.length - 1 && (
                    <span className="text-slate-600 font-light">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
               Occurred <strong className="text-slate-200 font-bold">{stats.topComboCount} times</strong>. 
               This combination tends to amplify cognitive distortion.
            </p>
          </div>
        ) : (
          <div className="py-2 text-center text-slate-500 text-sm italic opacity-60">
            No complex patterns detected yet.
          </div>
        )}
      </div>
    </div>
  );
};