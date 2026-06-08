import { useEffect, useState, useRef } from 'react';
import { DollarSign, FileText, Download, CheckCircle, AlertCircle, CreditCard, Plus, X, Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import { Transaction } from '@/types/study';
import { getStoredData, saveStoredData } from '@/lib/mockStore';

const STORAGE_KEY_FINANCE = 'umla_finance_transactions';

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Pembayaran UKT Semester 3', amount: 4500000, status: 'PAID', category: 'UKT', invoiceNumber: 'INV-2026-001', createdAt: '2026-01-15' },
  { id: '2', title: 'Pembayaran UKT Semester 4', amount: 4500000, status: 'UNPAID', category: 'UKT', invoiceNumber: 'INV-2026-002', createdAt: '2026-03-01' },
  { id: '3', title: 'Denda keterlambatan', amount: 250000, status: 'PAID', category: 'Denda', invoiceNumber: 'INV-2026-003', createdAt: '2026-02-10' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredData(STORAGE_KEY_FINANCE, MOCK_TRANSACTIONS));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTx, setNewTx] = useState({ title: '', amount: '', status: 'PAID', category: 'UKT', date: '' });
  const [buktiFile, setBuktiFile] = useState<string | undefined>();
  const [buktiPreview, setBuktiPreview] = useState<string | undefined>();
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalPaid = transactions.filter(t => t.status === 'PAID').reduce((s, t) => s + t.amount, 0);
  const outstanding = transactions.filter(t => t.status === 'UNPAID').reduce((s, t) => s + t.amount, 0);

  useEffect(() => { saveStoredData(STORAGE_KEY_FINANCE, transactions); }, [transactions]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Ukuran file maks 2MB!'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setBuktiFile(url);
      setBuktiPreview(url);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const tx: Transaction = {
      id: Date.now().toString(),
      title: newTx.title,
      amount: Number(newTx.amount),
      status: newTx.status,
      category: newTx.category,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(transactions.length + 1).padStart(3, '0')}`,
      createdAt: newTx.date || new Date().toISOString().split('T')[0],
      buktiUrl: buktiFile,
    };
    setTransactions([...transactions, tx]);
    setShowAddModal(false);
    setNewTx({ title: '', amount: '', status: 'PAID', category: 'UKT', date: '' });
    setBuktiFile(undefined);
    setBuktiPreview(undefined);
    toast.success('Pembayaran berhasil ditambahkan!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><DollarSign className="w-8 h-8 text-green-600" /> FINANCE</h1>
          <p className="page-subtitle">Keep track of your bills! 💸</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-card p-8 border-drawn shadow-sm relative overflow-hidden animate-fade-up">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-100 rounded-full blur-2xl -z-10" />
          <div className="absolute top-4 right-4"><AlertCircle className="w-8 h-8 text-destructive" /></div>
          <p className="stat-label">OUTSTANDING BALANCE</p>
          <h2 className="stat-value mb-2">{formatCurrency(outstanding)}</h2>
          {outstanding > 0 ? <p className="font-cursive text-lg text-destructive">Please pay soon!</p> : <p className="font-cursive text-lg text-green-500">No outstanding balance.</p>}
          <button className="mt-6 btn-primary w-full md:w-auto flex items-center justify-center gap-2"><CreditCard className="w-4 h-4" /> PAY NOW</button>
        </div>
        <div className="bg-card p-8 border-drawn shadow-sm relative animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-green-100 rounded-full blur-2xl -z-10" />
          <div className="absolute top-4 right-4"><CheckCircle className="w-8 h-8 text-green-500" /></div>
          <p className="stat-label">TOTAL PAID (THIS YEAR)</p>
          <h2 className="stat-value mb-2">{formatCurrency(totalPaid)}</h2>
          <p className="font-cursive text-lg text-green-600">All clear for tuition!</p>
          <button className="mt-6 btn-secondary w-full md:w-auto flex items-center justify-center gap-2"><Download className="w-4 h-4" /> TAX RECEIPT</button>
        </div>
      </div>

      <div className="bg-card p-6 md:p-8 border-drawn shadow-sm relative animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-accent/50 transform -rotate-1" />
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black italic">TRANSACTION HISTORY</h3>
          <button onClick={() => setShowAddModal(true)} className="btn-accent flex items-center gap-2"><Plus className="w-4 h-4" /> TAMBAH</button>
        </div>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b-2 border-dashed border-muted hover:bg-muted transition-colors">
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border-drawn ${tx.status === 'PAID' ? 'bg-green-100' : 'bg-red-100'} shadow-[2px_2px_0px_0px_hsl(var(--navy))] transform -rotate-3`}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-lg">{tx.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-cursive">{tx.invoiceNumber}</span>
                    <span>•</span>
                    <span>{formatDate(tx.createdAt)}</span>
                    {tx.buktiUrl && (
                      <button onClick={() => setLightboxUrl(tx.buktiUrl!)} className="flex items-center gap-1 text-blue-600 hover:underline ml-1">
                        <Paperclip className="w-3 h-3" /> Ada Bukti
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-6">
                <p className="font-black text-xl">{formatCurrency(tx.amount)}</p>
                <span className={`tag-brutal ${tx.status === 'PAID' ? 'bg-green-100' : 'bg-red-100'}`}>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => { setShowAddModal(false); setBuktiFile(undefined); setBuktiPreview(undefined); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">TAMBAH PEMBAYARAN</h2>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Deskripsi</label>
                <input type="text" required value={newTx.title} onChange={e => setNewTx({ ...newTx, title: e.target.value })} className="input-brutal" placeholder="Contoh: UKT Semester 4" />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Jumlah (Rp)</label>
                <input type="number" required value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })} className="input-brutal" placeholder="4500000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">Kategori</label>
                  <select value={newTx.category} onChange={e => setNewTx({ ...newTx, category: e.target.value })} className="input-brutal">
                    <option value="UKT">UKT</option>
                    <option value="Denda">Denda</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">Status</label>
                  <select value={newTx.status} onChange={e => setNewTx({ ...newTx, status: e.target.value })} className="input-brutal">
                    <option value="PAID">Lunas</option>
                    <option value="UNPAID">Belum Lunas</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Tanggal</label>
                <input type="date" value={newTx.date} onChange={e => setNewTx({ ...newTx, date: e.target.value })} className="input-brutal" />
              </div>

              {/* Bukti Pembayaran */}
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Bukti Pembayaran (Opsional)</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="input-brutal text-sm file:mr-3 file:border-0 file:bg-accent file:px-3 file:py-1 file:font-bold file:text-sm" />
                <p className="text-xs text-muted-foreground mt-1">Format: JPG, PNG. Maks 2MB.</p>
                {buktiPreview && (
                  <div className="mt-2">
                    <img src={buktiPreview} alt="Preview bukti" className="w-[100px] h-[100px] object-cover border-drawn rounded" />
                  </div>
                )}
              </div>

              <button type="submit" className="w-full mt-4 btn-primary py-3 text-lg">SIMPAN</button>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxUrl && (
        <div className="modal-overlay" onClick={() => setLightboxUrl(null)}>
          <div className="relative max-w-3xl max-h-[90vh] p-2" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightboxUrl(null)} className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-card border-drawn rounded-full flex items-center justify-center"><X className="w-5 h-5" /></button>
            <img src={lightboxUrl} alt="Bukti pembayaran" className="max-w-full max-h-[85vh] object-contain border-drawn bg-card" />
          </div>
        </div>
      )}
    </div>
  );
}
