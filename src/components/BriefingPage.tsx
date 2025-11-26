import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Candidate } from '../types/candidate';

interface BriefingPageProps {
  candidate: Candidate;
  onViewResult: () => void;
  onBack: () => void;
}

export default function BriefingPage({ candidate, onViewResult, onBack }: BriefingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#0A2744] to-[#0A1D37] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
        >
          ← Kembali
        </button>

        <div className="animate-fadeIn">
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D4A017] to-[#FFD700] rounded-full flex items-center justify-center shadow-2xl shadow-[#D4A017]/30 animate-pulse-slow">
                <FileText className="w-10 h-10 text-[#0A1D37]" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Pengarahan Peserta
            </h1>
            <p className="text-[#D4A017] text-xl font-semibold mb-2">{candidate.n}</p>
            <p className="text-gray-400 text-sm">Calon Anggota OSIS–MPK 2026/2027</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Instruksi Penting</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Silakan buka surat fiksasi Anda untuk melihat hasil lengkap.
                    Pastikan informasi ini bersifat rahasia dan hanya untuk Anda.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Surat Keputusan</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Surat keputusan resmi akan ditampilkan setelah Anda menekan tombol di bawah.
                    Hasil yang ditampilkan telah melalui proses seleksi yang ketat.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Hasil Bersifat Final</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Pastikan Anda memahami bahwa hasil yang ditampilkan bersifat final setelah pengumuman resmi.
                    Keputusan ini telah disetujui oleh panitia seleksi dan pembina OSIS–MPK.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#D4A017]/20 to-[#FFD700]/20 border border-[#D4A017]/30 rounded-2xl p-6 mb-8">
<p className="text-center text-gray-300 text-sm leading-relaxed">
              Setelah Anda membaca dan memahami seluruh instruksi di atas,
              silakan tekan tombol di bawah untuk membuka surat fiksasi Anda.
            </p>
          </div>

          <button
            onClick={onViewResult}
            className="w-full bg-gradient-to-r from-[#D4A017] to-[#FFD700] text-[#0A1D37] font-bold py-5 rounded-xl hover:shadow-2xl hover:shadow-[#D4A017]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg flex items-center justify-center gap-3 animate-pulse-glow"
          >
<FileText className="w-6 h-6" />
            Buka Surat Saya
          </button>

          <p className="text-center text-gray-500 text-xs mt-6">
            Dengan membuka surat, Anda menyatakan telah membaca dan memahami seluruh instruksi.
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

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(212, 160, 23, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(212, 160, 23, 0.6);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
