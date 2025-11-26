import { CheckCircle, XCircle, Award, Users, AlertTriangle } from 'lucide-react';
import { Candidate } from '../types/candidate';
import { useState, useEffect } from 'react';

interface ResultPageProps {
  candidate: Candidate;
  unlocked: boolean;
  onBack: () => void;
}

export default function ResultPage({ candidate, unlocked, onBack }: ResultPageProps) {
  const [showRealResult, setShowRealResult] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const isPranked = candidate.pranked;
  const isAccepted = candidate.s === 1;

  useEffect(() => {
    if (isAccepted && !isPranked) {
      setConfettiActive(true);
      const timeout = setTimeout(() => setConfettiActive(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [isAccepted, isPranked]);

  useEffect(() => {
    if (isPranked && showRealResult && isAccepted) {
      setConfettiActive(true);
      const timeout = setTimeout(() => setConfettiActive(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [showRealResult, isPranked, isAccepted]);

  const getMPKLogo = () => (
    <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="45" fill="#D4A017" opacity="0.2"/>
      <circle cx="50" cy="50" r="40" stroke="#D4A017" strokeWidth="3"/>
      <path d="M30 50 L45 35 L45 65 Z" fill="#D4A017"/>
      <path d="M50 30 L50 70" stroke="#D4A017" strokeWidth="3"/>
      <path d="M55 35 L70 50 L55 65 Z" fill="#D4A017"/>
      <text x="50" y="85" textAnchor="middle" fill="#D4A017" fontSize="10" fontWeight="bold">MPK</text>
    </svg>
  );

  const getOSISLogo = () => (
    <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="45" fill="#D4A017" opacity="0.2"/>
      <circle cx="50" cy="50" r="40" stroke="#D4A017" strokeWidth="3"/>
      <circle cx="50" cy="35" r="8" fill="#D4A017"/>
      <path d="M35 50 Q35 42 42 42 L58 42 Q65 42 65 50 L65 65 L35 65 Z" fill="#D4A017"/>
      <text x="50" y="85" textAnchor="middle" fill="#D4A017" fontSize="10" fontWeight="bold">OSIS</text>
    </svg>
  );

  const renderAcceptedResult = () => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
      <div className="text-center mb-8">
        <div className="inline-block animate-scale-in">
          {candidate.o === 'MPK' ? getMPKLogo() : getOSISLogo()}
        </div>

        <div className="inline-flex items-center gap-3 bg-green-500/20 px-6 py-3 rounded-full mb-6 animate-slide-down" style={{ animationDelay: '0.3s' }}>
          <CheckCircle className="w-6 h-6 text-green-400" />
          <span className="text-green-400 font-semibold">SELAMAT! ANDA DITERIMA</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-down" style={{ animationDelay: '0.4s' }}>
          Surat Keputusan Fiksasi
        </h1>
      </div>

      <div className="space-y-6 animate-slide-down" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="grid gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Nama Lengkap</p>
              <p className="text-white text-xl font-bold">{candidate.n}</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-gray-400 text-sm mb-1">Status Kelulusan</p>
              <p className="text-green-400 text-lg font-semibold">DITERIMA</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-gray-400 text-sm mb-1">Organisasi</p>
              <div className="flex items-center gap-2">
                {candidate.o === 'MPK' ? (
                  <>
                    <Users className="w-5 h-5 text-[#D4A017]" />
                    <p className="text-white text-lg font-semibold">MPK (Majelis Permusyawaratan Kelas)</p>
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5 text-[#D4A017]" />
                    <p className="text-white text-lg font-semibold">OSIS (Organisasi Siswa Intra Sekolah)</p>
                  </>
                )}
              </div>
            </div>

            {candidate.k && (
              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-400 text-sm mb-1">Komisi</p>
                <p className="text-[#D4A017] text-2xl font-bold">Komisi {candidate.k}</p>
              </div>
            )}

            {candidate.b > 0 && (
              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-400 text-sm mb-1">Seksi Bidang (Sekbid)</p>
                <p className="text-[#D4A017] text-2xl font-bold">Sekbid {candidate.b}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#D4A017]/20 to-[#FFD700]/20 border border-[#D4A017]/30 rounded-2xl p-6">
          <p className="text-gray-300 text-sm text-center leading-relaxed mb-4">
            Selamat! Anda dinyatakan diterima sebagai anggota {candidate.o}.
            Anda ditempatkan pada {candidate.k ? `Komisi ${candidate.k}` : `Sekbid ${candidate.b}`}.
            Harap mengikuti instruksi lanjutan dari panitia Fiksasi.
          </p>
          <div className="border-t border-[#D4A017]/30 pt-4 mt-4">
            <p className="text-gray-400 text-xs text-center">
              Dokumen ini bersifat resmi dan telah disetujui oleh panitia seleksi.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-8">
          <div className="flex justify-between items-end">
            <div className="text-left">
              <p className="text-gray-400 text-xs mb-1">Ditetapkan pada</p>
              <p className="text-white text-sm font-semibold">20 November 2025</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs mb-3">Panitia Seleksi</p>
              <div className="h-16 border-b-2 border-white/20 w-40 mb-1"></div>
              <p className="text-white text-sm font-semibold">Pembina OSIS–MPK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRejectedResult = () => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 animate-shake">
      <div className="text-center animate-scale-in">
        <div className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-16 h-16 text-red-400" />
        </div>

        <div className="inline-flex items-center gap-3 bg-red-500/20 px-6 py-3 rounded-full mb-6">
          <XCircle className="w-6 h-6 text-red-400" />
          <span className="text-red-400 font-semibold">TIDAK DITERIMA</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Pemberitahuan Hasil Seleksi
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="grid gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Nama Lengkap</p>
              <p className="text-white text-xl font-bold">{candidate.n}</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-gray-400 text-sm mb-1">Status Kelulusan</p>
              <p className="text-red-400 text-lg font-semibold">TIDAK DITERIMA</p>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Anda tidak diterima dalam Kepengurusan OSIS-MPK 2026/2027.
          </p>
          <p className="text-gray-400 text-xs">
            Terima kasih atas partisipasi Anda. Tetap semangat dan terus berkontribusi
            untuk kemajuan sekolah melalui berbagai kegiatan lainnya.
          </p>
        </div>

        <div className="border-t border-white/10 pt-6 mt-8">
          <p className="text-gray-400 text-xs text-center">
            Panitia Seleksi OSIS–MPK 2026/2027
          </p>
        </div>
      </div>
    </div>
  );

  const renderPrankedResult = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 md:p-12 animate-shake">
        <div className="text-center animate-scale-in">
          <div className="w-32 h-32 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-16 h-16 text-yellow-400" />
          </div>

          <div className="inline-flex items-center gap-3 bg-yellow-500/20 px-6 py-3 rounded-full mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">PEMBERITAHUAN</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Status Fiksasi Anda
          </h1>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="grid gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Nama Lengkap</p>
                <p className="text-white text-xl font-bold">{candidate.n}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className="text-yellow-400 text-lg font-semibold">Anda belum diterima dalam Fiksasi OSIS-MPK 2026/2027.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Mohon maaf, berdasarkan hasil evaluasi, Anda belum memenuhi kriteria yang ditetapkan.
            </p>
            <p className="text-gray-400 text-xs">
              Keputusan ini bersifat final dan telah melalui proses yang ketat.
            </p>
          </div>

          <button
            onClick={() => setShowRealResult(true)}
            className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
          >
            Lihat Informasi Lanjutan
          </button>
        </div>
      </div>

      {showRealResult && (
        <div className="animate-reveal">
          {isAccepted ? renderAcceptedResult() : renderRejectedResult()}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0A2744] to-[#0A1D37] px-4 py-8">
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#D4A017', '#FFD700', '#10B981', '#3B82F6', '#EF4444'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
        >
          ← Kembali ke Beranda
        </button>

        <div className="animate-reveal">
          {isPranked ? renderPrankedResult() : (isAccepted ? renderAcceptedResult() : renderRejectedResult())}
        </div>
      </div>

      <style>{`
        @keyframes reveal {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-reveal {
          animation: reveal 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out backwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
