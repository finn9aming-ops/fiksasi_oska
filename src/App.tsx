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
    darkMode: false,
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
      darkMode: state.darkMode,
    });
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <div className={state.darkMode ? 'dark' : ''}>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg p-3 transition-all duration-300"
        title={state.darkMode ? 'Mode Terang' : 'Mode Gelap'}
      >
        {state.darkMode ? (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

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

      <footer className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10 py-3 z-40">
        <p className="text-center text-gray-400 text-xs">
          Fiksasi OSIS-MPK 2026/2027
        </p>
      </footer>

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
    </div>
  );
}

export default App;
