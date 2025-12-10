import React, { useState } from 'react';
import { ModeId } from '../types';
import { MODES, EMOTIONS, CBT_HINTS } from '../constants';
import { ModeCard } from './ModeCard';
import { Save, AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface LogFormProps {
  onSave: (data: {
    situation: string;
    emotion: string;
    emotionIntensity: number;
    modes: ModeId[];
    cbtCounter?: string;
  }) => void;
  onCancel: () => void;
}

export const LogForm: React.FC<LogFormProps> = ({ onSave, onCancel }) => {
  const [selectedModes, setSelectedModes] = useState<ModeId[]>([]);
  const [situation, setSituation] = useState('');
  const [emotion, setEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [cbtCounter, setCbtCounter] = useState('');
  const [error, setError] = useState('');

  const handleModeToggle = (id: ModeId) => {
    setSelectedModes(prev => {
      if (prev.includes(id)) {
        return prev.filter(m => m !== id);
      }
      if (prev.length >= 2) {
        // Just return to block more than 2
        return prev;
      }
      return [...prev, id];
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) {
      setError('どのような状況だったか、一言メモを入力してください');
      return;
    }
    if (selectedModes.length === 0) {
      setError('少なくとも1つのモードを選択してください');
      return;
    }
    onSave({
      situation,
      emotion: emotion || '未設定',
      emotionIntensity: intensity,
      modes: selectedModes,
      cbtCounter: cbtCounter.trim() || undefined,
    });
  };

  // Dynamic color for intensity slider
  const getIntensityColor = (val: number) => {
    if (val <= 3) return '#38bdf8'; // Sky blue
    if (val <= 6) return '#fbbf24'; // Amber
    return '#f87171'; // Red
  };

  const intensityColor = getIntensityColor(intensity);

  // Get hint based on selected mode (prioritize first selection)
  const currentHint = selectedModes.length > 0 
    ? CBT_HINTS[selectedModes[0]] 
    : 'モードを選択すると、思考を切り替えるヒントが表示されます。';

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-fade-in">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">発作ログ記録</h2>
        <p className="text-slate-400 text-sm">今の「自己攻撃」にラベルを貼り、客観視しましょう。</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Situation & Emotion */}
        <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2 py-1 rounded">STEP 1</span>
            <h3 className="text-base font-bold text-slate-200">トリガーと反応</h3>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">出来事・状況 (メモ)</label>
            <textarea
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-600 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm leading-relaxed"
              rows={3}
              placeholder="例：会議で返答に詰まり、全員に呆れられたと感じた..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">主な感情</label>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS.map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmotion(e)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      emotion === e 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-900/30 transform scale-105' 
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/50">
              <div className="flex justify-between items-end mb-4">
                <label className="text-xs font-medium text-slate-400">感情の強さ</label>
                <span 
                  className="text-2xl font-bold transition-colors duration-300"
                  style={{ color: intensityColor }}
                >
                  {intensity}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none transition-all"
                style={{
                  background: `linear-gradient(to right, ${intensityColor}20 0%, ${intensityColor} ${intensity * 10}%, #334155 ${intensity * 10}%, #334155 100%)`
                }}
              />
              <style>{`
                input[type=range]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: #fff;
                  box-shadow: 0 0 10px ${intensityColor};
                  cursor: pointer;
                  margin-top: -4px; /* Adjust based on track height if needed, usually 0 for appearance-none */
                }
              `}</style>
              <div className="flex justify-between text-[10px] text-slate-500 mt-2 px-1">
                <span>平気</span>
                <span>普通</span>
                <span>限界</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Modes */}
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2 py-1 rounded">STEP 2</span>
              <h3 className="text-base font-bold text-slate-200">暴走しているモード</h3>
            </div>
            <span className="text-xs text-slate-500">1〜2つ選択</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(MODES).map((mode) => (
              <ModeCard
                key={mode.id}
                mode={mode}
                isSelected={selectedModes.includes(mode.id)}
                onClick={() => handleModeToggle(mode.id)}
              />
            ))}
          </div>
          {selectedModes.length === 2 && (
            <p className="text-xs text-amber-500 text-right animate-pulse">
              ※ 選択上限です（コンボ記録中）
            </p>
          )}
        </section>

        {/* Section 3: CBT Counter (New) */}
        <section className="bg-emerald-900/10 border border-emerald-500/20 p-5 rounded-xl space-y-4 transition-all duration-500">
          <div className="flex items-center gap-2">
             <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-1 rounded">STEP 3</span>
             <h3 className="text-base font-bold text-emerald-100">バランス調整 (任意)</h3>
          </div>

          <div className="flex gap-3 bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/50">
            <Lightbulb className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-emerald-200/90 leading-relaxed animate-fade-in">
              {currentHint}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-400">一歩引いた視点・反論</label>
              <span className={`text-xs font-mono ${cbtCounter.length > 70 ? 'text-red-400' : 'text-slate-500'}`}>
                {cbtCounter.length}/70
              </span>
            </div>
            <input
              type="text"
              maxLength={70}
              placeholder="例：まあ、60点取れてれば死ぬわけじゃないし。"
              className="w-full bg-slate-900/50 border border-emerald-500/30 rounded-lg p-3 text-white placeholder-slate-600 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              value={cbtCounter}
              onChange={(e) => setCbtCounter(e.target.value)}
            />
            <p className="text-[10px] text-slate-500 mt-2">
              ※ 無理にポジティブにする必要はありません。「ちょっとマシな見方」でOKです。
            </p>
          </div>
        </section>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-950/30 p-4 rounded-lg border border-red-900/50 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center gap-4 pt-2 sticky bottom-24 md:static">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur text-slate-400 font-medium hover:bg-slate-800 transition-colors text-sm"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30"
          >
            <Save size={18} />
            記録を完了
          </button>
        </div>
      </form>
    </div>
  );
};