import { useState } from 'react';
import { Settings as SettingsIcon, Plus, Trash2, Mail, ShieldAlert, Users, CheckCircle, X } from 'lucide-react';

const MOCK_EMAILS = [
  { id: '1', email: 'admin@universitas.ac.id' },
  { id: '2', email: 'mahasiswa@student.ac.id' },
];

const MOCK_PENDING = [
  { id: '1', name: 'Ahmad Fauzi', username: 'ahmadf', email: 'ahmad@student.ac.id' },
  { id: '2', name: 'Siti Rahma', username: 'sitirahma', email: 'siti@student.ac.id' },
];

export default function SettingsPage() {
  const [emails, setEmails] = useState(MOCK_EMAILS);
  const [pendingUsers, setPendingUsers] = useState(MOCK_PENDING);
  const [newEmail, setNewEmail] = useState('');

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setEmails([...emails, { id: Date.now().toString(), email: newEmail.trim() }]);
    setNewEmail('');
  };

  const handleDeleteEmail = (id: string) => setEmails(emails.filter(e => e.id !== id));
  const handleApproveUser = (id: string) => setPendingUsers(pendingUsers.filter(u => u.id !== id));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><SettingsIcon className="w-8 h-8 text-blue-600" /> PENGATURAN</h1>
          <p className="page-subtitle">Atur konfigurasi sistem ⚙️</p>
        </div>
      </div>

      <div className="card-brutal p-6 md:p-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-muted">
          <ShieldAlert className="w-6 h-6 text-destructive" />
          <h2 className="text-2xl font-black italic">AKSES SSO EMAIL</h2>
        </div>
        <p className="text-muted-foreground mb-6 font-medium">
          Daftar email yang diizinkan login menggunakan SSO.
        </p>
        <form onSubmit={handleAddEmail} className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="email" required value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Masukkan alamat email..." className="input-brutal pl-10" />
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-5 h-5" /><span className="hidden sm:inline">TAMBAH</span>
          </button>
        </form>
        <div className="space-y-3">
          {emails.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground font-medium italic border-2 border-dashed border-muted bg-muted/50">Belum ada email.</div>
          ) : emails.map((email) => (
            <div key={email.id} className="flex items-center justify-between p-4 border-drawn bg-card group hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-drawn">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-bold text-lg">{email.email}</span>
              </div>
              <button onClick={() => handleDeleteEmail(email.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-full transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card-brutal p-6 md:p-8 mt-8 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-muted">
          <Users className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black italic">PERSETUJUAN PENGGUNA</h2>
        </div>
        <div className="border-drawn overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b-2 border-foreground">
                <th className="p-4 font-black text-sm uppercase tracking-wider">Nama</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider hidden sm:table-cell">Username</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="p-4 font-black text-sm uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground font-medium italic">Tidak ada pengguna menunggu.</td></tr>
              ) : pendingUsers.map((user, i) => (
                <tr key={user.id} className={`hover:bg-muted transition-colors ${i < pendingUsers.length - 1 ? 'border-b border-muted' : ''}`}>
                  <td className="p-4 font-bold text-foreground">{user.name}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground hidden sm:table-cell">{user.username}</td>
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
    </div>
  );
}
