export interface Candidate {
  n: string;
  s: number;
  k: string;
  b: number;
  p: number;
  pranked: boolean;
  o: string;
}

export interface AppState {
  view: 'landing' | 'search' | 'briefing' | 'result';
  selectedCandidate: Candidate | null;
  searchQuery: string;
  unlocked: boolean;
  darkMode: boolean;
}
