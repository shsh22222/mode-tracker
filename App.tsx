import React, { useState, useEffect } from 'react';
import { LogEntry, PositiveLogEntry } from './types';
import { getLogs, saveLog, deleteLog, getPositiveLogs, savePositiveLog, deletePositiveLog } from './services/storageService';
import { LogForm } from './components/LogForm';
import { Dashboard } from './components/Dashboard';
import { LogList } from './components/LogList';
import { HomeSelector } from './components/HomeSelector';
import { PositiveDiaryForm } from './components/PositiveDiaryForm';
import { PositiveDiaryList } from './components/PositiveDiaryList';
import { PlusCircle, BarChart2, List, Ghost, Moon, Home } from 'lucide-react';

// App Context: determines which "Sub-app" is active
type AppContext = 'home' | 'tracker' | 'diary';

// View state within a context
enum View {
  DASHBOARD = 'dashboard', // Used for Tracker Summary or Diary List
  LOG = 'log',
  HISTORY = 'history',
}

const AmbientBackground: React.FC<{ context: AppContext }> = ({ context }) => {
  // Determine colors based on context
  const colors = {
    home: ['bg-indigo-900', 'bg-slate-800', 'bg-emerald-900'],
    tracker: ['bg-indigo-900', 'bg-violet-900', 'bg-blue-900'],
    diary: ['bg-amber-900', 'bg-orange-900', 'bg-rose-900'],
  };

  const currentColors = colors[context];

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className={`absolute top-0 -left-4 w-96 h-96 ${currentColors[0]} rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob`}></div>
      <div className={`absolute top-0 -right-4 w-96 h-96 ${currentColors[1]} rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000`}></div>
      <div className={`absolute -bottom-32 left-20 w-96 h-96 ${currentColors[2]} rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000`}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [appContext, setAppContext] = useState<AppContext>('home');
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  
  // Data State
  const [trackerLogs, setTrackerLogs] = useState<LogEntry[]>([]);
  const [diaryLogs, setDiaryLogs] = useState<PositiveLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    setTrackerLogs(getLogs());
    setDiaryLogs(getPositiveLogs());
    setIsLoading(false);
  }, []);

  // --- Handlers for Mode Tracker ---
  const handleSaveTrackerLog = (data: Omit<LogEntry, 'id' | 'timestamp'>) => {
    saveLog({
      ...data,
      timestamp: new Date().toISOString(),
    });
    setTrackerLogs(getLogs());
    setCurrentView(View.DASHBOARD);
  };

  const handleDeleteTrackerLog = (id: string) => {
    deleteLog(id);
    setTrackerLogs(getLogs());
  };

  // --- Handlers for Positive Diary ---
  const handleSaveDiaryLog = (data: {
      goodThings: string[];
      gratitude: string[];
      lookingForward: string[];
      goals: string[];
  }) => {
    savePositiveLog(data);
    setDiaryLogs(getPositiveLogs());
    setCurrentView(View.DASHBOARD); // Diary "Dashboard" is the list view
  };

  const handleDeleteDiaryLog = (id: string) => {
    deletePositiveLog(id);
    setDiaryLogs(getPositiveLogs());
  };

  // --- Navigation Helpers ---
  const goHome = () => {
    setAppContext('home');
    setCurrentView(View.DASHBOARD);
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 font-serif">Loading your sanctuary...</div>;

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-white/20 relative">
      <AmbientBackground context={appContext} />
      
      {/* Top Bar - Minimal & Clean */}
      <div className="fixed top-0 left-0 right-0 z-20 pt-6 px-6 pb-2 bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-[2px]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          
          <button onClick={goHome} className="flex items-center gap-3 group opacity-90 hover:opacity-100 transition-opacity">
            {appContext === 'tracker' ? (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
                        <Ghost size={20} />
                    </div>
                    <div>
                        <h1 className="font-serif font-bold text-lg tracking-wide text-slate-100">Mode Tracker</h1>
                        <p className="text-[10px] uppercase tracking-widest text-indigo-300/70">Self-Analysis</p>
                    </div>
                </div>
            ) : appContext === 'diary' ? (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-inset ring-amber-500/20">
                        <Moon size={20} />
                    </div>
                    <div>
                        <h1 className="font-serif font-bold text-lg tracking-wide text-slate-100">Positive Diary</h1>
                        <p className="text-[10px] uppercase tracking-widest text-amber-300/70">Evening Routine</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                     <h1 className="font-serif font-bold text-xl tracking-tight text-white">Mind Balance</h1>
                </div>
            )}
          </button>

          {appContext !== 'home' && (
             <button onClick={goHome} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all ring-1 ring-white/5">
                <Home size={18} />
             </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 pt-28 min-h-screen pb-28">
        
        {/* HOME: Selector */}
        {appContext === 'home' && (
            <HomeSelector onSelectMode={(mode) => {
                setAppContext(mode);
                setCurrentView(View.DASHBOARD);
            }} />
        )}

        {/* MODE TRACKER CONTEXT */}
        {appContext === 'tracker' && (
            <>
                {currentView === View.DASHBOARD && <Dashboard logs={trackerLogs} />}
                {currentView === View.LOG && (
                    <LogForm 
                        onSave={handleSaveTrackerLog} 
                        onCancel={() => setCurrentView(View.DASHBOARD)} 
                    />
                )}
                {currentView === View.HISTORY && <LogList logs={trackerLogs} onDelete={handleDeleteTrackerLog} />}
            </>
        )}

        {/* POSITIVE DIARY CONTEXT */}
        {appContext === 'diary' && (
            <>
                {currentView === View.DASHBOARD && <PositiveDiaryList logs={diaryLogs} onDelete={handleDeleteDiaryLog} />}
                {currentView === View.LOG && (
                    <PositiveDiaryForm 
                        onSave={handleSaveDiaryLog} 
                        onCancel={() => setCurrentView(View.DASHBOARD)} 
                    />
                )}
                {/* No history view separate for diary */}
            </>
        )}

      </main>

      {/* Floating Navigation Island */}
      {appContext !== 'home' && (
        <nav className="fixed bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 px-6 py-3 pointer-events-auto flex items-center gap-8">
            
            {/* Left Tab */}
            <button
                onClick={() => setCurrentView(View.DASHBOARD)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentView === View.DASHBOARD 
                    ? (appContext === 'tracker' ? 'text-indigo-400 scale-110' : 'text-amber-400 scale-110') 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
            >
                {appContext === 'tracker' ? <BarChart2 size={22} /> : <List size={22} />}
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">
                    {appContext === 'tracker' ? 'Insight' : 'Journal'}
                </span>
            </button>

            {/* Center Action Button */}
            <div className="relative -top-1">
                <button
                    onClick={() => setCurrentView(View.LOG)}
                    className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform active:scale-95 text-white ${
                        appContext === 'tracker' 
                            ? 'bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-indigo-500/40 ring-4 ring-indigo-900/50' 
                            : 'bg-gradient-to-tr from-amber-600 to-orange-500 shadow-amber-500/40 ring-4 ring-amber-900/50'
                    }`}
                >
                    <PlusCircle size={28} />
                </button>
            </div>

            {/* Right Tab */}
            <button
                onClick={() => setCurrentView(appContext === 'tracker' ? View.HISTORY : View.DASHBOARD)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentView === View.HISTORY 
                    ? (appContext === 'tracker' ? 'text-indigo-400 scale-110' : 'text-amber-400 scale-110')
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                style={{ opacity: appContext === 'diary' ? 0 : 1, pointerEvents: appContext === 'diary' ? 'none' : 'auto', width: appContext === 'diary' ? 0 : 'auto', overflow: 'hidden' }}
            >
                 {/* Only for tracker */}
                 <List size={22} />
                 <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">History</span>
            </button>
            </div>
        </nav>
      )}
    </div>
  );
};

export default App;