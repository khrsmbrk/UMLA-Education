import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, LineChart, CheckCircle, BarChart3, Monitor, DollarSign, Settings, BookOpen, FileText, GraduationCap, Calendar, Book, Trophy, Bell } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getAnnouncements } from '@/lib/mockStore';
import { Announcement } from '@/types/study';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/grades', icon: LineChart, label: 'Grades' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/tasks', icon: CheckCircle, label: 'Tasks' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/assignments', icon: FileText, label: 'Assign' },
  { to: '/exams', icon: GraduationCap, label: 'Exams' },
  { to: '/notes', icon: Book, label: 'Notes' },
  { to: '/resources', icon: Monitor, label: 'Resources' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
  { to: '/leaderboard', icon: Trophy, label: 'Board' },
  { to: '/finance', icon: DollarSign, label: 'Finance' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const kategoriColor = (k: string) => {
  switch (k) { case 'Akademik': return 'bg-blue-100 text-blue-700'; case 'Keuangan': return 'bg-green-100 text-green-700'; case 'Sistem': return 'bg-orange-100 text-orange-700'; default: return 'bg-gray-100 text-gray-700'; }
};

export default function Layout() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showBell, setShowBell] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => setAnnouncements(getAnnouncements().filter(a => a.aktif));
    load();
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setShowBell(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header with Bell */}
      <header className="sticky top-0 z-50 bg-card border-b-2 border-foreground px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center text-white font-bold border-drawn transform -rotate-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-black text-lg">UMLA</span>
        </div>
        <div ref={bellRef} className="relative">
          <button onClick={() => setShowBell(!showBell)} className="relative p-2 hover:bg-accent transition-colors rounded border-drawn">
            <Bell className="w-5 h-5" />
            {announcements.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">{announcements.length}</span>
            )}
          </button>
          {showBell && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border-drawn shadow-xl max-h-96 overflow-y-auto z-50">
              <div className="p-3 border-b-2 border-foreground bg-muted">
                <h3 className="font-black text-sm uppercase">Pengumuman</h3>
              </div>
              {announcements.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm italic">Tidak ada pengumuman.</div>
              ) : announcements.map(a => (
                <div key={a.id} className="p-3 border-b border-muted hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${kategoriColor(a.kategori)}`}>{a.kategori}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(a.tanggal).toLocaleDateString('id-ID')}</span>
                  </div>
                  <p className="font-bold text-sm">{a.judul}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.isi}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="px-4 py-8 md:px-8 pb-20">
        <Outlet />
      </div>
      
      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-foreground z-40">
        <div className="flex overflow-x-auto scrollbar-hide">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-shrink-0 flex flex-col items-center px-3 py-2 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                  isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
