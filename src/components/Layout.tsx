import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, LogOut, Bell, Menu, Calendar, CreditCard, CheckCircle, FileText, GraduationCap, Book, Monitor, Settings, X, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getAnnouncements, getProfile, getCurrentUserId, logoutUser } from '@/lib/mockStore';
import { Announcement } from '@/types/study';

const kategoriColor = (k: string) => {
  switch (k) { case 'Akademik': return 'bg-blue-100 text-blue-700'; case 'Keuangan': return 'bg-green-100 text-green-700'; case 'Sistem': return 'bg-orange-100 text-orange-700'; default: return 'bg-gray-100 text-gray-700'; }
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showBell, setShowBell] = useState(false);
  const [profile, setProfile] = useState(getProfile());
  const bellRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Studi Progres', href: '/app/ujian', icon: BookOpen },
    { name: 'Schedules', href: '/app/schedule', icon: Calendar },
    { name: 'Tasks', href: '/app/tasks', icon: CheckCircle },
    { name: 'Notes', href: '/app/notes', icon: Book },
    { name: 'Assignments', href: '/app/assignments', icon: FileText },
    { name: 'Exams', href: '/app/exams', icon: GraduationCap },
    { name: 'Resources', href: '/app/resources', icon: Monitor },
    { name: 'Finance', href: '/app/finance', icon: CreditCard },
    { name: 'Pengaturan', href: '/app/settings', icon: Settings },
  ];

  useEffect(() => {
    const load = () => setAnnouncements(getAnnouncements().filter(a => a.aktif));
    load();
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadProfile = () => setProfile(getProfile());
    window.addEventListener('storage', loadProfile);
    window.addEventListener('umla-profile-updated', loadProfile);
    return () => {
      window.removeEventListener('storage', loadProfile);
      window.removeEventListener('umla-profile-updated', loadProfile);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setShowBell(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background bg-dot-pattern font-sans text-foreground">
      {/* Sidebar for Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-30">
        <div className="flex min-h-0 flex-1 flex-col border-r-2 border-dashed border-foreground/30 bg-background/80 backdrop-blur-sm">
          <div className="flex flex-1 flex-col overflow-y-auto pt-8 pb-4">
            <div className="flex flex-col px-6 mb-8">
              <span className="text-2xl font-black text-primary tracking-tight">PORTAL UMLA</span>
              <span className="text-sm font-cursive text-muted-foreground">Terpadu Akademik</span>
            </div>
            <nav className="mt-4 flex-1 space-y-1 px-4">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-4 py-2.5 text-sm font-bold rounded-sm transition-all ${
                      isActive
                        ? 'bg-accent text-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] transform -rotate-1'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t-2 border-dashed border-foreground/30 p-4">
            <button onClick={handleLogout} className="group block w-full flex-shrink-0 px-4 py-2 text-left">
              <span className="font-cursive text-xl text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2">
                <LogOut className="w-5 h-5" /> LOGOUT!
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex h-14 flex-shrink-0 bg-card border-b-2 border-foreground md:hidden">
        <button
          type="button"
          className="px-4 text-muted-foreground focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex flex-1 justify-between px-4 items-center">
          <span className="text-xl font-black text-primary">PORTAL UMLA</span>
          <div className="flex items-center gap-2">
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
            <div className="w-8 h-8 rounded-full border-drawn overflow-hidden bg-muted">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e6b999" alt="" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-card border-r-2 border-foreground shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b-2 border-foreground">
              <span className="text-xl font-black text-primary">PORTAL UMLA</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1"><X className="w-6 h-6" /></button>
            </div>
            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-bold rounded-sm transition-all ${
                      isActive
                        ? 'bg-accent text-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t-2 border-dashed border-foreground/30 p-4">
              <button onClick={handleLogout} className="font-cursive text-xl text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2">
                <LogOut className="w-5 h-5" /> LOGOUT!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop header bar */}
      <div className="hidden md:flex fixed top-0 left-64 right-0 h-14 bg-background/80 backdrop-blur-sm z-20 items-center px-6 gap-4 border-b border-dashed border-foreground/10">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search everywhere..." className="w-full pl-10 pr-4 py-2 border-drawn text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent bg-card" />
          </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <div ref={bellRef} className="relative">
            <button onClick={() => setShowBell(!showBell)} className="relative p-2 hover:bg-accent transition-colors rounded border-drawn bg-card">
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
          <div className="w-9 h-9 rounded-full border-drawn overflow-hidden bg-muted shadow-[2px_2px_0px_0px_hsl(var(--navy))]">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e6b999" alt="" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1 md:pt-14">
          <div className="py-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
