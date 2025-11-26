import { Search } from 'lucide-react';

interface LandingPageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export default function LandingPage({ searchQuery, onSearchChange, onSearch }: LandingPageProps) {
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
            <div className="w-20 h-20 bg-gradient-to-br from-[#D4A017] to-[#FFD700] rounded-full flex items-center justify-center shadow-2xl shadow-[#D4A017]/30 animate-float">
              <svg className="w-10 h-10 text-[#0A1D37]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
