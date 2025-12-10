export enum ModeId {
  ZERO_100 = 'zero_100',
  EXTERNAL_STANDARDS = 'external_standards',
  ALL_MY_FAULT = 'all_my_fault',
  SELF_DENIAL = 'self_denial',
  LIFE_OVER = 'life_over',
}

export interface ModeDefinition {
  id: ModeId;
  name: string;
  alias: string;
  description: string;
  color: string;
  icon: string; // Lucide icon name representation
}

export interface LogEntry {
  id: string;
  timestamp: string; // ISO String
  situation: string;
  emotion: string;
  emotionIntensity: number; // 0-10
  modes: ModeId[];
  cbtCounter?: string; // Optional: Counter-thought or reframing
}

export interface PositiveLogEntry {
  id: string;
  timestamp: string; // ISO String
  // New structured fields
  goodThings: string[];    // 今日の良かったこと (4 items)
  gratitude: string[];     // 今日の感謝 (4 items)
  lookingForward: string[]; // 明日の楽しみ (4 items)
  goals: string[];         // 明日のゴール (4 items)
  
  // Legacy field for backward compatibility support
  items?: string[]; 
}

export interface AnalysisStats {
  totalLogs: number;
  modeCounts: Record<ModeId, number>;
  combos: Array<{ modes: ModeId[]; count: number }>;
  topModes: ModeId[];
}