import { useState, useRef, useEffect } from 'react';
import { Settings as SettingsIcon, Users, CheckCircle, X, Plus, Trash2, Edit2, Bell, User, Lock, LogOut, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { Announcement } from '@/types/study';
import { getAnnouncements, saveAnnouncements, getProfile, saveProfile, getStoredData, saveStoredData } from '@/lib/mockStore';

const KATEGORI_OPTIONS: Announcement['kategori'][] = ['Akademik', 'Umum', 'Keuangan', 'Sistem'];
const STORE_KEY_PENDING_USERS = 'umla_pending_users';
const STORE_KEY_ACTIVE_USERS = 'umla_active_users';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export default function SettingsPage() {
  // === User Approval ===
  const [pendingUsers, setPendingUsers] = useState<any[]>(() => getStoredData(STORE_KEY_PENDING_USERS, []));
  const [activeUsers, setActiveUsers] = useState<any[]>(() => getStoredData(STORE_KEY_ACTIVE_USERS, [
    { id: '1', name: 'Ahmad Fauzi', nim: 'ahmadfauzi', email: 'demo@example.com', joinedAt: '30 Maret 2026' },
  ]));

  // === Account Settings ===
  const [profile, setProfile] = useState(getProfile());
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(profile.avatarUrl);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // === Announcements ===
  const [announcements, setAnnouncements] = useState<Announcement[]>(getAnnouncements());
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [announcementForm, setAnnouncementForm] = useState({ judul: '', isi: '', kategori: 'Akademik' as Announcement['kategori'], tanggal: getToday(), aktif: true });

  useEffect(() => { saveAnnouncements(announcements); }, [announcements]);
  useEffect(() => { saveStoredData(STORE_KEY_PENDING_USERS, pendingUsers); }, [pendingUsers]);
  useEffect(() => { saveStoredData(STORE_KEY_ACTIVE_USERS, activeUsers); }, [activeUsers]);

  const handleApproveUser = (id: string) => {
    const approved = pendingUsers.find(u => u.id === id);
    if (approved) setActiveUsers(prev => [{ ...approved, joinedAt: approved.joinedAt || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }, ...prev]);
    setPendingUsers(pendingUsers.filter(u => u.id !== id));
    toast.success('Pengguna disetujui!');
  };

  // Profile handlers
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setAvatarPreview(url);
      setProfile({ ...profile, avatarUrl: url });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    saveProfile(profile);
    toast.success('Profil berhasil disimpan!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) { toast.error('Password baru minimal 8 karakter!'); return; }
    if (newPassword !== confirmPassword) { toast.error('Konfirmasi password tidak cocok!'); return; }
    console.log('Password changed (simulated)', { oldPassword, newPassword });
    toast.success('Password berhasil diubah!');
    setOldPassword(''); setNewPassword(''); setConfirmPassword('');
  };

  const handleLogoutAll = () => {
    toast.success('Logout dari semua sesi...');
    setTimeout(() => { window.location.href = '/login'; }, 1000);
  };

  // Announcement handlers
  const openAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setAnnouncementForm({ judul: '', isi: '', kategori: 'Akademik', tanggal: getToday(), aktif: true });
    setShowAnnouncementForm(true);
  };

  const openEditAnnouncement = (a: Announcement) => {
    setEditingAnnouncement(a);
    setAnnouncementForm({ judul: a.judul, isi: a.isi, kategori: a.kategori, tanggal: a.tanggal, aktif: a.aktif });
    setShowAnnouncementForm(true);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? { ...a, ...announcementForm } : a));
      toast.success('Pengumuman diperbarui!');
    } else {
      setAnnouncements([...announcements, { id: Date.now().toString(), ...announcementForm }]);
      toast.success('Pengumuman ditambahkan!');
    }
    setShowAnnouncementForm(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (!confirm('Yakin hapus pengumuman ini?')) return;
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast.success('Pengumuman dihapus!');
  };

  const kategoriColor = (k: string) => {
    switch (k) { case 'Akademik': return 'bg-blue-100 text-blue-700'; case 'Keuangan': return 'bg-green-100 text-green-700'; case 'Sistem': return 'bg-orange-100 text-orange-700'; default: return 'bg-gray-100 text-gray-700'; }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><SettingsIcon className="w-8 h-8 text-blue-600" /> PENGATURAN</h1>
          <p className="page-subtitle">Atur konfigurasi sistem ⚙️</p>
        </div>
      </div>

      {/* === PERSETUJUAN PENGGUNA BARU === */}
      <div className="card-brutal p-6 md:p-8 mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-2 pb-4 border-b-2 border-dashed border-muted">
          <Users className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black italic">PERSETUJUAN PENGGUNA BARU</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Daftar pengguna yang mendaftar dan menunggu persetujuan Super Admin.</p>
        <div className="border-drawn overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b-2 border-foreground">
                <th className="p-4 font-black text-sm uppercase tracking-wider">Nama</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider hidden sm:table-cell">NIM</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground font-medium italic">Tidak ada pengguna yang menunggu persetujuan.</td></tr>
              ) : pendingUsers.map((user: any, i: number) => (
                <tr key={user.id} className={`hover:bg-muted transition-colors ${i < pendingUsers.length - 1 ? 'border-b border-muted' : ''}`}>
                  <td className="p-4 font-bold text-foreground">{user.name}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground hidden sm:table-cell">{user.nim}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground hidden md:table-cell">{user.email}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleApproveUser(user.id)} className="p-2 bg-green-100 text-green-600 hover:bg-green-200 transition-colors border-drawn active:scale-95" title="Setujui">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === PENGGUNA AKTIF === */}
      <div className="card-brutal p-6 md:p-8 mb-8 animate-fade-up" style={{ animationDelay: '50ms' }}>
        <div className="flex items-center gap-3 mb-2 pb-4 border-b-2 border-dashed border-muted">
          <Users className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-black italic">PENGGUNA AKTIF</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Daftar pengguna yang telah disetujui dan aktif dalam sistem.</p>
        <div className="border-drawn overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b-2 border-foreground">
                <th className="p-4 font-black text-sm uppercase tracking-wider">Nama</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider hidden sm:table-cell">NIM</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider hidden md:table-cell">Tanggal Bergabung</th>
              </tr>
            </thead>
            <tbody>
              {[{ id: 'current', ...profile, joinedAt: new Date(profile.joinedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }, ...activeUsers.filter(u => u.id !== 'current')].map((user, i, list) => (
                <tr key={user.id} className={`hover:bg-muted transition-colors ${i < list.length - 1 ? 'border-b border-muted' : ''}`}>
                  <td className="p-4 font-bold text-foreground">{user.name}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground hidden sm:table-cell">{user.nim}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground hidden md:table-cell">{user.email}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{user.joinedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === PENGATURAN AKUN === */}
      <div className="card-brutal p-6 md:p-8 animate-fade-up mb-8" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-muted">
          <User className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-black italic">PENGATURAN AKUN</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full border-drawn overflow-hidden bg-muted flex items-center justify-center">
              {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-muted-foreground" />}
            </div>
            <button onClick={() => avatarInputRef.current?.click()} className="absolute bottom-0 right-0 w-8 h-8 bg-accent border-drawn rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <Camera className="w-4 h-4" />
            </button>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-black text-xl">{profile.name}</p>
            <p className="text-muted-foreground font-medium">{profile.email}</p>
            <p className="text-sm text-muted-foreground">NIM: {profile.nim} • {profile.role}</p>
            <p className="text-xs text-muted-foreground">Bergabung: {new Date(profile.joinedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-muted-foreground">Edit Profil</h3>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Nama Lengkap</label>
              <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="input-brutal" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Email</label>
              <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="input-brutal" />
            </div>
            <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2"><CheckCircle className="w-4 h-4" /> SIMPAN PROFIL</button>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2"><Lock className="w-4 h-4" /> Ganti Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <input type="password" placeholder="Password Lama" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="input-brutal" required />
              <input type="password" placeholder="Password Baru (min 8 karakter)" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-brutal" required />
              <input type="password" placeholder="Konfirmasi Password Baru" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-brutal" required />
              <button type="submit" className="btn-accent flex items-center gap-2"><Lock className="w-4 h-4" /> GANTI PASSWORD</button>
            </form>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-dashed border-muted flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Login terakhir: {new Date().toLocaleDateString('id-ID')} {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} | Device: Chrome / Web</p>
          </div>
          <button onClick={handleLogoutAll} className="btn-secondary flex items-center gap-2 text-destructive"><LogOut className="w-4 h-4" /> LOGOUT SEMUA SESI</button>
        </div>
      </div>

      {/* === MANAJEMEN PENGUMUMAN === */}
      <div className="card-brutal p-6 md:p-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-muted">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-black italic">MANAJEMEN PENGUMUMAN</h2>
          </div>
          <button onClick={openAddAnnouncement} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> TAMBAH</button>
        </div>

        <div className="border-drawn overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b-2 border-foreground">
                <th className="p-3 font-black text-xs uppercase tracking-wider">Judul</th>
                <th className="p-3 font-black text-xs uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="p-3 font-black text-xs uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                <th className="p-3 font-black text-xs uppercase tracking-wider text-center">Status</th>
                <th className="p-3 font-black text-xs uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground font-medium italic">Belum ada pengumuman.</td></tr>
              ) : announcements.map((a, i) => (
                <tr key={a.id} className={`hover:bg-muted transition-colors ${i < announcements.length - 1 ? 'border-b border-muted' : ''}`}>
                  <td className="p-3 font-bold">{a.judul}</td>
                  <td className="p-3 hidden sm:table-cell"><span className={`text-xs font-bold px-2 py-1 rounded ${kategoriColor(a.kategori)}`}>{a.kategori}</span></td>
                  <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">{new Date(a.tanggal).toLocaleDateString('id-ID')}</td>
                  <td className="p-3 text-center"><span className={`text-xs font-bold px-2 py-1 rounded ${a.aktif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{a.aktif ? 'Aktif' : 'Nonaktif'}</span></td>
                  <td className="p-3 text-right flex gap-2 justify-end">
                    <button onClick={() => openEditAnnouncement(a)} className="p-1.5 hover:bg-accent transition-colors border-drawn"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteAnnouncement(a.id)} className="p-1.5 hover:bg-red-50 text-destructive transition-colors border-drawn"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcement Form Modal */}
      {showAnnouncementForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setShowAnnouncementForm(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">{editingAnnouncement ? 'EDIT PENGUMUMAN' : 'TAMBAH PENGUMUMAN'}</h2>
            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Judul Pengumuman</label>
                <input type="text" required value={announcementForm.judul} onChange={e => setAnnouncementForm({ ...announcementForm, judul: e.target.value })} className="input-brutal" />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Isi Pengumuman</label>
                <textarea required rows={3} value={announcementForm.isi} onChange={e => setAnnouncementForm({ ...announcementForm, isi: e.target.value })} className="input-brutal min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">Kategori</label>
                  <select value={announcementForm.kategori} onChange={e => setAnnouncementForm({ ...announcementForm, kategori: e.target.value as Announcement['kategori'] })} className="input-brutal">
                    {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">Tanggal</label>
                  <input type="date" value={announcementForm.tanggal} onChange={e => setAnnouncementForm({ ...announcementForm, tanggal: e.target.value })} className="input-brutal" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-muted-foreground">Status:</label>
                <button type="button" onClick={() => setAnnouncementForm({ ...announcementForm, aktif: !announcementForm.aktif })} className={`px-4 py-1 text-sm font-bold border-drawn transition-colors ${announcementForm.aktif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {announcementForm.aktif ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
              <button type="submit" className="w-full mt-4 btn-primary py-3 text-lg">{editingAnnouncement ? 'SIMPAN PERUBAHAN' : '+ TAMBAH PENGUMUMAN'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
