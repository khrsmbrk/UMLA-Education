import { Link } from 'react-router-dom';
import { AlertTriangle, Key, HelpCircle, Mail, Clock } from 'lucide-react';

const FAQ_ITEMS = [
  {
    icon: AlertTriangle,
    title: 'Tidak bisa login',
    description: 'Pastikan email dan password Anda sudah benar. Jika Anda baru saja mendaftar, pastikan akun Anda sudah disetujui oleh Admin. Jika Anda salah memasukkan password 5 kali, akun Anda akan terkunci sementara.',
  },
  {
    icon: Key,
    title: 'Lupa NIM / password',
    description: "Gunakan fitur 'Forgot your key?' di halaman login untuk mereset password Anda. Instruksi akan dikirimkan ke email UMLA Anda.",
  },
  {
    icon: HelpCircle,
    title: 'Link Exam tidak bisa dibuka',
    description: 'Pastikan Anda terhubung ke jaringan kampus atau menggunakan VPN jika diakses dari luar. Jika masih bermasalah, hubungi IT Support.',
  },
];

export default function HelpSupport() {
  return (
    <div className="min-h-screen bg-background bg-dot-pattern font-sans text-foreground flex flex-col">
      <header className="p-4 md:p-6 flex justify-between items-center border-b-2 border-foreground">
        <Link to="/" className="text-sm font-bold hover:text-orange-500 transition-colors">← Back to Portal</Link>
        <h1 className="font-black text-xl text-primary">Help & Support</h1>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black mb-2">
              <span className="relative inline-block">
                Frequently Asked Questions
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
              </span>
            </h2>
            <div className="mt-8 space-y-6">
              {FAQ_ITEMS.map((faq, i) => (
                <div key={i} className="bg-card border-drawn shadow-brutal-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 border-drawn flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg mb-2">{faq.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-black mb-2">
              <span className="relative inline-block">
                Hubungi Kami
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />
              </span>
            </h2>
            <div className="mt-8 bg-accent p-6 border-drawn shadow-brutal-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-foreground" />
                  <span className="font-bold">IT Support Email</span>
                </div>
                <a href="mailto:it-support@umla.ac.id" className="text-blue-600 font-bold text-lg hover:underline block">
                  it-support@umla.ac.id
                </a>
                <div className="flex items-center gap-3 mt-4">
                  <Clock className="w-5 h-5 text-foreground" />
                  <span className="font-bold">Jam Layanan</span>
                </div>
                <div className="text-muted-foreground">
                  <p>Senin – Jumat</p>
                  <p>08:00 – 16:00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 flex flex-col items-center border-t border-muted">
        <p className="text-xs text-muted-foreground mb-3">© 2026 Universitas Muhammadiyah Lamongan. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Privacy Policy</Link>
          <Link to="/terms-of-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Terms of Use</Link>
        </div>
      </footer>
    </div>
  );
}
