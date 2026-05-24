export interface Snippet {
  id: string;
  code: string;
  language: string;
  length: 'short' | 'mid' | 'long';
  name: string;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  timeSec: number;
  errors: number;
  correctKeys: number;
  totalKeystrokes: number;
}

export interface HistoryItem {
  id: string;
  snippetId: string;
  snippetName: string;
  language: string;
  length: 'short' | 'mid' | 'long';
  wpm: number;
  accuracy: number;
  timeSec: number;
  timestamp: number;
}
