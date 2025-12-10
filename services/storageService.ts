import { LogEntry, PositiveLogEntry } from '../types';

const LOGS_KEY = 'mode_tracker_logs';
const POSITIVE_KEY = 'positive_diary_logs';

// --- Mode Tracker Logs ---

export const getLogs = (): LogEntry[] => {
  try {
    const stored = localStorage.getItem(LOGS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.sort((a: LogEntry, b: LogEntry) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (e) {
    console.error("Failed to load logs", e);
    return [];
  }
};

export const saveLog = (log: Omit<LogEntry, 'id'>): LogEntry => {
  const logs = getLogs();
  const newLog: LogEntry = {
    ...log,
    id: crypto.randomUUID(),
  };
  const updatedLogs = [newLog, ...logs];
  localStorage.setItem(LOGS_KEY, JSON.stringify(updatedLogs));
  return newLog;
};

export const deleteLog = (id: string): void => {
  const logs = getLogs();
  const updatedLogs = logs.filter(log => log.id !== id);
  localStorage.setItem(LOGS_KEY, JSON.stringify(updatedLogs));
};

// --- Positive Diary Logs ---

export const getPositiveLogs = (): PositiveLogEntry[] => {
  try {
    const stored = localStorage.getItem(POSITIVE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    
    // Migration logic: Ensure new fields exist even if loading old data
    const migratedLogs = parsed.map((log: any): PositiveLogEntry => ({
      id: log.id,
      timestamp: log.timestamp,
      goodThings: log.goodThings || log.items || [], // Map old 'items' to 'goodThings'
      gratitude: log.gratitude || [],
      lookingForward: log.lookingForward || [],
      goals: log.goals || [],
      items: undefined // Clean up old field if preferred, or keep for safety
    }));

    return migratedLogs.sort((a: PositiveLogEntry, b: PositiveLogEntry) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (e) {
    console.error("Failed to load positive logs", e);
    return [];
  }
};

export const savePositiveLog = (data: Omit<PositiveLogEntry, 'id' | 'timestamp' | 'items'>): PositiveLogEntry => {
  const logs = getPositiveLogs();
  
  // Basic cleanup: remove empty strings
  const cleanData = {
    goodThings: data.goodThings.filter(s => s.trim() !== ''),
    gratitude: data.gratitude.filter(s => s.trim() !== ''),
    lookingForward: data.lookingForward.filter(s => s.trim() !== ''),
    goals: data.goals.filter(s => s.trim() !== ''),
  };

  const newLog: PositiveLogEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...cleanData
  };
  
  const updatedLogs = [newLog, ...logs];
  localStorage.setItem(POSITIVE_KEY, JSON.stringify(updatedLogs));
  return newLog;
};

export const deletePositiveLog = (id: string): void => {
  const logs = getPositiveLogs();
  const updatedLogs = logs.filter(log => log.id !== id);
  localStorage.setItem(POSITIVE_KEY, JSON.stringify(updatedLogs));
};

export const clearAllData = (): void => {
  localStorage.removeItem(LOGS_KEY);
  localStorage.removeItem(POSITIVE_KEY);
};