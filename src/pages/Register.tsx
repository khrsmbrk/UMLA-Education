import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Globe, FileEdit, Monitor, Database, UserPlus } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', nim: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Registrasi berhasil! Silakan login setelah disetujui Admin.');
      setTimeout(() => navigate('/login'), 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center bg-card border-b-2 border-foreground shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center text-white font-bold border-drawn transform -rotate-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl leading-none">UMLA SSO</h1>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Universitas Muhammadiyah Lamongan</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="https://exam.umla.ac.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold hover:text-orange-500 transition-colors">
            <FileEdit className="w-4 h-4" /> Exams
          </a>
          <a href="https://elearningmu.umla.ac.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold hover:text-orange-500 transition-colors">
            <Monitor className="w-4 h-4" /> E-Learning
          </a>
          <a href="https://siak.umla.ac.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold hover:text-orange-500 transition-colors">
            <Database className="w-4 h-4" /> SIAK
          </a>
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Announcement Bar */}
      <div className="bg-accent/80 py-2 px-4 text-center text-sm font-bold flex items-center justify-center gap-2 border-b-2 border-foreground/20">
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Akademik</span>
        <span>Jadwal Ujian Akhir Semester – UAS akan dimulai minggu depan.</span>
      </div>

      <main className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md z-10">
          <div className="bg-card border-drawn shadow-2xl p-8 pt-12 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-green-200/80 transform -rotate-2 flex items-center justify-center">
              <span className="text-[8px] font-mono text-green-800 tracking-widest">UMLA • NEW</span>
            </div>

            <div className="mb-2">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground font-medium">← Back to Login</Link>
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-4xl font-black mb-1">Create Account</h2>
                <p className="font-cursive text-xl text-muted-foreground">Bergabung dengan Portal UMLA Terpadu.</p>
              </div>
              <div className="w-10 h-10 bg-green-100 border-drawn rounded-sm flex items-center justify-center transform rotate-6">
                <UserPlus className="w-5 h-5 text-green-600" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {successMsg && <div className="bg-green-100 border-2 border-green-500 text-green-700 p-3 font-bold text-sm">{successMsg}</div>}

              <div>
                <label className="inline-block bg-orange-200 px-2 py-1 text-sm font-bold border-drawn transform -rotate-1 mb-2">Full Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="Your full name..." />
              </div>
              <div>
                <label className="inline-block bg-blue-200 px-2 py-1 text-sm font-bold border-drawn transform rotate-1 mb-2">Email Address</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="your@email.com" />
              </div>
              <div>
                <label className="inline-block bg-green-200 px-2 py-1 text-sm font-bold border-drawn transform -rotate-1 mb-2">NIM</label>
                <input type="text" required value={form.nim} onChange={(e) => setForm({ ...form, nim: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="2023010001" />
              </div>
              <div>
                <label className="inline-block bg-purple-200 px-2 py-1 text-sm font-bold border-drawn transform rotate-1 mb-2">Password</label>
                <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="Min 8 karakter..." />
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full bg-orange-500 text-white font-black text-xl py-4 border-drawn shadow-brutal-sm hover:translate-y-1 transition-all disabled:opacity-70 active:scale-[0.97]">
                {isLoading ? 'Loading...' : 'Register Account'}
              </button>

              <div className="text-center mt-4">
                <Link to="/login" className="font-bold text-muted-foreground hover:text-foreground transition-colors">
                  Already have an account? Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="py-6 flex flex-col items-center z-10 relative border-t border-muted">
        <p className="text-xs text-muted-foreground mb-3">© 2026 Universitas Muhammadiyah Lamongan. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Privacy Policy</Link>
          <Link to="/terms-of-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Terms of Use</Link>
        </div>
      </footer>
    </div>
  );
}
