import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';
import BriefingPage from './components/BriefingPage';
import ResultPage from './components/ResultPage';
import { useUnlockSequence } from './hooks/useUnlockSequence';
import { Candidate, AppState } from './types/candidate';

function App() {
  const [state, setState] = useState<AppState>({
    view: 'landing',
    selectedCandidate: null,
    searchQuery: '',
    unlocked: false,
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    fetch('/data/8f4e2a9c1b6d3f7e.json')
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error('Failed to load candidates:', err));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('unlock') === 'OSKA2026') {
      setState((prev) => ({ ...prev, unlocked: true }));
    }
  }, []);

  useUnlockSequence(() => {
    setState((prev) => ({ ...prev, unlocked: true }));
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.textContent = '🔓 Mode Asli Diaktifkan';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  });

  const handleSearch = () => {
    if (state.searchQuery.trim()) {
      setState((prev) => ({ ...prev, view: 'search' }));
    }
  };

  const handleSelectCandidate = (candidate: Candidate) => {
    setState((prev) => ({ ...prev, selectedCandidate: candidate, view: 'briefing' }));
  };

  const handleViewResult = () => {
    setState((prev) => ({ ...prev, view: 'result' }));
  };

  const handleBack = () => {
    setState({
      view: 'landing',
      selectedCandidate: null,
      searchQuery: '',
      unlocked: state.unlocked,
    });
  };

  return (
    <>
      {state.view === 'landing' && (
        <LandingPage
          searchQuery={state.searchQuery}
          onSearchChange={(query) => setState((prev) => ({ ...prev, searchQuery: query }))}
          onSearch={handleSearch}
        />
      )}

      {state.view === 'search' && (
        <SearchResults
          candidates={candidates}
          searchQuery={state.searchQuery}
          onSelectCandidate={handleSelectCandidate}
          onBack={handleBack}
        />
      )}

      {state.view === 'briefing' && state.selectedCandidate && (
        <BriefingPage
          candidate={state.selectedCandidate}
          onViewResult={handleViewResult}
          onBack={() => setState((prev) => ({ ...prev, view: 'search' }))}
        />
      )}

      {state.view === 'result' && state.selectedCandidate && (
        <ResultPage
          candidate={state.selectedCandidate}
          unlocked={state.unlocked}
          onBack={handleBack}
        />
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default App;
