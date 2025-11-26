export interface Candidate {
  n: string;
  s: number;
  k: string;
  b: number;
  p: number;
  o: string;
}

export interface AppState {
  view: 'landing' | 'search' | 'briefing' | 'result';
  selectedCandidate: Candidate | null;
  searchQuery: string;
  unlocked: boolean;
}
