import { ChevronRight, User } from 'lucide-react';
import { Candidate } from '../types/candidate';

interface SearchResultsProps {
  candidates: Candidate[];
  searchQuery: string;
  onSelectCandidate: (candidate: Candidate) => void;
  onBack: () => void;
}

export default function SearchResults({ candidates, searchQuery, onSelectCandidate, onBack }: SearchResultsProps) {
  const filteredCandidates = candidates.filter(c =>
    c.n.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0A2744] to-[#0A1D37] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
        >
          ← Kembali
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Hasil Pencarian</h2>
          <p className="text-gray-400">
            Menampilkan {filteredCandidates.length} hasil untuk "{searchQuery}"
          </p>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Tidak Ada Hasil</h3>
            <p className="text-gray-400 text-sm">
              Nama yang Anda cari tidak ditemukan dalam daftar peserta.
              Pastikan ejaan nama sudah benar.
            </p>
          </div>
        ) : (
          <div className="space-y-3 animate-slideUp">
            {filteredCandidates.map((candidate, index) => (
              <button
                key={index}
                onClick={() => onSelectCandidate(candidate)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4A017] rounded-xl p-5 flex items-center justify-between group transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4A017] to-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-[#0A1D37]" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-lg">{candidate.n}</p>
                    <p className="text-gray-400 text-sm">Peserta Fiksasi 2026/2027</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#D4A017] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animate-slideUp > * {
          animation: slideUp 0.5s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
