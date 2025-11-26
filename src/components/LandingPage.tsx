import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export default function LandingPage({ searchQuery, onSearchChange, onSearch }: LandingPageProps) {
  const [currentLogo, setCurrentLogo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo(prev => (prev + 1) % 2);
    }, 1200);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0A2744] to-[#0A1D37] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-lg w-full relative z-10 animate-fadeIn">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="relative w-32 h-32 mx-auto">
              <div className={`absolute inset-0 transition-all duration-700 ${
                currentLogo === 0
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-90 rotate-180'
              }`}>
                <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-2xl">
                  <circle cx="60" cy="60" r="55" fill="#D4A017" opacity="0.2"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#D4A017" strokeWidth="3"/>
                  <text x="60" y="50" textAnchor="middle" fill="#D4A017" fontSize="16" fontWeight="bold">ZIEBA</text>
                  <text x="60" y="70" textAnchor="middle" fill="#FFD700" fontSize="16" fontWeight="bold">ZOKA</text>
                  <path d="M 35 85 L 85 85" stroke="#D4A017" strokeWidth="2"/>
                  <circle cx="60" cy="35" r="8" fill="#D4A017"/>
                </svg>
              </div>
              <div className={`absolute inset-0 transition-all duration-700 ${
                currentLogo === 1
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-90 -rotate-180'
              }`}>
                <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-2xl">
                  <circle cx="60" cy="60" r="55" fill="#FFD700" opacity="0.2"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#FFD700" strokeWidth="3"/>
                  <text x="60" y="50" textAnchor="middle" fill="#FFD700" fontSize="16" fontWeight="bold">SMAK</text>
                  <text x="60" y="70" textAnchor="middle" fill="#D4A017" fontSize="16" fontWeight="bold">ZIE</text>
                  <rect x="45" y="80" width="30" height="8" fill="#FFD700" rx="2"/>
                  <polygon points="60,25 65,35 55,35" fill="#FFD700"/>
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            FIKSASI ANGGOTA<br />OSIS–MPK 2026/2027
          </h1>

          <div className="space-y-2 mb-8">
            <p className="text-[#D4A017] text-lg font-semibold tracking-wide">
              Seleksi Penentuan Komisi & Sekbid
            </p>
            <p className="text-gray-300 text-sm">
              Temukan Hasil Akhir Fiksasi Anda
            </p>
            <p className="text-gray-400 text-xs">
              Akses Surat Keputusan Secara Resmi
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-gray-300 text-sm leading-relaxed">
              Selamat datang di portal pengumuman resmi Fiksasi Anggota OSIS dan MPK tahun ajaran 2026/2027.
              Masukkan nama lengkap Anda untuk melihat hasil seleksi dan penempatan komisi atau seksi bidang.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama Anda…"
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A017] focus:bg-white/15 transition-all duration-300 text-lg"
              autoFocus
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D4A017] transition-colors" />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D4A017] to-[#FFD700] text-[#0A1D37] font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-[#D4A017]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
          >
            Cari Data
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            © 2026/2027 OSIS–MPK | Sistem Fiksasi Resmi
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
