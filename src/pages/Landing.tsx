import { Link } from 'react-router-dom';
import { Key, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-accent">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
      </div>

      {/* Header */}
      <header className="p-6 flex justify-end">
        <Link to="/login" className="inline-flex items-center bg-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-brutal-sm hover:translate-y-1 transition-all border-drawn active:scale-[0.97]">
          <Key className="w-4 h-4 mr-2" /> Login ke SSO
        </Link>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 pt-10 pb-20 flex flex-col items-center text-center relative">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-2 z-10">PORTAL AKADEMIK</h1>
        <div className="relative inline-block z-10">
          <span className="absolute inset-0 bg-accent transform -skew-x-12 -z-10 top-2 bottom-1 -left-2 -right-2" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">TERPADU UMLA</h1>
        </div>
        <div className="mt-4 relative w-full max-w-2xl flex justify-end">
          <p className="font-cursive text-3xl md:text-4xl text-destructive transform -rotate-3">Masa Depan Lebih Cerdas!</p>
        </div>

        <nav className="mt-16 flex space-x-8 text-sm font-bold tracking-widest uppercase">
          <a href="#" className="hover:text-orange-500 transition-colors">Visi & Misi</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Kurikulum</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Kontak</a>
        </nav>

        {/* Feature Cards */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 max-w-5xl w-full relative">
          <div className="bg-card p-8 shadow-xl border-2 border-dashed border-muted relative transform -rotate-1 hover:rotate-0 transition-transform animate-fade-up">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-200/80 transform rotate-2" />
            <h2 className="text-3xl font-black mb-4">Sistem <span className="text-destructive">CBT</span></h2>
            <p className="text-muted-foreground mb-8 font-medium leading-relaxed text-left">
              Ujian berbasis komputer yang transparan, efisien, dan anti-ribet. Pantau hasil secara real-time.
            </p>
            <div className="text-left">
              <Link to="/login" className="inline-flex items-center border-drawn px-6 py-2 font-bold hover:bg-foreground hover:text-primary-foreground transition-colors">
                Eksplor Modul <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-card p-8 shadow-xl border-2 border-dashed border-muted relative transform rotate-1 hover:rotate-0 transition-transform animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-accent/80 transform -rotate-2" />
            <h2 className="text-3xl font-black mb-4">Digital <span className="text-amber-500">E-Learning</span></h2>
            <p className="text-muted-foreground mb-8 font-medium leading-relaxed text-left">
              Materi kuliah, diskusi interaktif, dan penugasan dalam satu genggaman.
            </p>
            <div className="text-left">
              <Link to="/login" className="btn-primary inline-flex items-center">Mulai Belajar Now!</Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 relative animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-accent p-10 max-w-md mx-auto shadow-2xl transform rotate-1 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-destructive rounded-full shadow-md border-2 border-red-800" />
            <h3 className="text-3xl font-black mb-4">Siap Bergabung?</h3>
            <p className="font-medium mb-8 text-left">Jangan lewatkan kesempatan untuk menjadi bagian dari generasi cerdas UMLA.</p>
            <button className="w-full btn-primary py-4 text-lg">DAFTAR SEKARANG</button>
            <p className="font-cursive text-xl mt-4 text-right">Limited slots available!</p>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-dashed border-foreground mt-20 py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-6">© 2026 UNIVERSITAS MUHAMMADIYAH LAMONGAN</p>
          <div className="flex space-x-4">
            <div className="w-6 h-6 rounded-full bg-teal-200 border-drawn" />
            <div className="w-6 h-6 rounded-full bg-accent border-drawn" />
            <div className="w-6 h-6 rounded-full bg-pink-400 border-drawn" />
          </div>
        </div>
      </footer>
    </div>
  );
}
