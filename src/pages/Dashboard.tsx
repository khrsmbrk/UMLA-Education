import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Clock, Play, Pause, RotateCcw, FileEdit, Monitor, Database, Mail,
  Link as LinkIcon, Plus, X, AlertTriangle, CheckCircle, Calendar as CalendarIcon, FileText
} from 'lucide-react';
import { getAnnouncements, getProfile } from '@/lib/mockStore';

export default function Dashboard() {
  const profile = getProfile();
  const announcements = getAnnouncements().filter(a => a.aktif);

  // Pomodoro
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerMode, setTimerMode] = useState('Focus');
  const [defaultLogin, setDefaultLogin] = useState(true);

  // My Links
  const [links, setLinks] = useState<{ id: string; title: string; url: string }[]>([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) setIsActive(false);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const setMode = (mode: string) => {
    setTimerMode(mode);
    setIsActive(false);
    setTimeLeft(mode === 'Focus' ? 25 * 60 : mode === 'Short' ? 5 * 60 : 15 * 60);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    setLinks([...links, { id: Date.now().toString(), ...newLink }]);
    setShowLinkModal(false);
    setNewLink({ title: '', url: '' });
  };

  const kategoriColor = (k: string) => {
    switch (k) { case 'Akademik': return 'bg-blue-100 text-blue-700'; case 'Keuangan': return 'bg-green-100 text-green-700'; case 'Sistem': return 'bg-orange-100 text-orange-700'; default: return 'bg-gray-100 text-gray-700'; }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title"><LayoutDashboard className="w-8 h-8 text-blue-600" /> DASHBOARD</h1>
          <p className="page-subtitle">Welcome back, {profile.name}! 🚀</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="font-cursive text-2xl text-foreground font-bold uppercase">{profile.name}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{profile.email}</p>
          </div>
          <div className="w-12 h-12 bg-muted border-drawn overflow-hidden shadow-[2px_2px_0px_0px_hsl(var(--navy))] transform rotate-3">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e6b999" alt="Profile" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>

      {/* Announcements */}
      {announcements.length > 0 && (
        <div className="space-y-2 mb-8">
          {announcements.map(a => (
            <div key={a.id} className="bg-accent/60 border-2 border-accent p-3 flex items-center gap-3 animate-fade-up">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${kategoriColor(a.kategori)}`}>{a.kategori}</span>
              <span className="font-bold text-sm">{a.judul}</span>
              <span className="text-sm text-muted-foreground hidden md:inline">– {a.isi}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Access */}
          <div className="bg-card p-6 border-drawn shadow-sm relative animate-fade-up">
            <div className="absolute -top-3 left-8 w-16 h-4 bg-accent/50 transform -rotate-2" />
            <h2 className="text-2xl font-black italic mb-6">QUICK ACCESS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'EXAMS', icon: FileEdit, href: 'https://exam.umla.ac.id' },
                { label: 'E-LEARNING', icon: Monitor, href: 'https://elearningmu.umla.ac.id' },
                { label: 'SIAK', icon: Database, href: 'https://siak.umla.ac.id' },
                { label: 'EMAIL', icon: Mail, href: 'https://mail.google.com/a/umla.ac.id' },
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 border-drawn hover:bg-muted transition-all hover:-translate-y-1 group">
                  <item.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black tracking-wider">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Today Overview */}
          <div className="bg-card p-6 border-drawn shadow-sm relative animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-green-100/80 transform rotate-1" />
            <h2 className="text-2xl font-black italic mb-6">TODAY OVERVIEW</h2>
            <div className="space-y-4">
              {[
                { icon: CalendarIcon, title: 'Kuliah Pemrograman Web', desc: '08:00 – 10:30 WIB | Ruang Lab Komputer 1', color: 'bg-blue-50' },
                { icon: FileText, title: 'Tugas Struktur Data', desc: 'Deadline: Hari ini, 23:59 WIB', color: 'bg-accent/30' },
                { icon: CheckCircle, title: 'Status Pembayaran SPP', desc: 'Lunas untuk Semester Ganjil 2026/2027', color: 'bg-green-50' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 ${item.color} border-2 border-dashed border-muted`}>
                  <div className="w-10 h-10 rounded-full bg-card border-drawn flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Preferences */}
          <div className="bg-foreground text-primary-foreground p-6 border-drawn shadow-brutal-yellow-lg relative overflow-hidden animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-black italic uppercase text-destructive mb-4">PREFERENCES</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Default Login Page</p>
                <p className="text-xs text-primary-foreground/60">Set dashboard as default</p>
              </div>
              <button onClick={() => setDefaultLogin(!defaultLogin)}
                className={`w-12 h-6 rounded-full transition-colors relative ${defaultLogin ? 'bg-green-500' : 'bg-gray-500'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${defaultLogin ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

          {/* Pomodoro */}
          <div className="bg-card p-6 border-drawn shadow-brutal-sm relative overflow-hidden animate-fade-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl font-black italic mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" /> Pomodoro
            </h2>
            <div className="flex justify-center gap-2 mb-6">
              {['Focus', 'Short', 'Long'].map(m => (
                <button key={m} onClick={() => setMode(m)} className={`text-xs font-bold px-3 py-1 border-drawn transition-colors ${timerMode === m ? 'bg-foreground text-primary-foreground' : 'hover:bg-muted'}`}>
                  {m}
                </button>
              ))}
            </div>
            <div className="text-center mb-6">
              <div className="text-6xl font-black tracking-tighter tabular-nums">{formatTime(timeLeft)}</div>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => setIsActive(!isActive)} className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform active:scale-95 border-drawn">
                {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <button onClick={() => { setIsActive(false); setTimeLeft(timerMode === 'Focus' ? 25 * 60 : timerMode === 'Short' ? 5 * 60 : 15 * 60); }}
                className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors active:scale-95 border-drawn">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* My Links */}
          <div className="bg-card p-6 border-drawn shadow-brutal-sm animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black italic flex items-center gap-2"><LinkIcon className="w-5 h-5" /> My Links</h2>
              <button onClick={() => setShowLinkModal(true)} className="text-xs font-bold text-blue-600 hover:underline">+ Add Link</button>
            </div>
            {links.length === 0 ? (
              <p className="font-cursive text-muted-foreground text-center py-4">No custom links added yet.</p>
            ) : (
              <div className="space-y-2">
                {links.map(l => (
                  <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="block p-2 hover:bg-muted transition-colors text-sm font-bold truncate border-b border-dashed border-muted">
                    {l.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Link Modal */}
      {showLinkModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setShowLinkModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">ADD LINK</h2>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Title</label>
                <input type="text" required value={newLink.title} onChange={e => setNewLink({ ...newLink, title: e.target.value })} className="input-brutal" placeholder="My Link" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">URL</label>
                <input type="url" required value={newLink.url} onChange={e => setNewLink({ ...newLink, url: e.target.value })} className="input-brutal" placeholder="https://..." />
              </div>
              <button type="submit" className="w-full btn-primary py-3">SAVE LINK</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
