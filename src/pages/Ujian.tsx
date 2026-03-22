import { LineChart, Download, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { useState } from 'react';

const MOCK_SEMESTERS = [
  {
    semester: '1',
    gpa: '3.65',
    records: [
      { id: '1', matkul: 'Kalkulus I', sks: 3, grade: 'A', score: 4.0 },
      { id: '2', matkul: 'Fisika Dasar', sks: 3, grade: 'A-', score: 3.7 },
      { id: '3', matkul: 'Pengantar Informatika', sks: 3, grade: 'B+', score: 3.3 },
      { id: '4', matkul: 'Bahasa Inggris', sks: 2, grade: 'A', score: 4.0 },
    ],
  },
  {
    semester: '2',
    gpa: '3.72',
    records: [
      { id: '5', matkul: 'Kalkulus II', sks: 3, grade: 'A-', score: 3.7 },
      { id: '6', matkul: 'Algoritma & Pemrograman', sks: 4, grade: 'A', score: 4.0 },
      { id: '7', matkul: 'Statistika', sks: 3, grade: 'B+', score: 3.3 },
    ],
  },
  {
    semester: '3',
    gpa: '3.80',
    records: [
      { id: '8', matkul: 'Struktur Data', sks: 4, grade: 'A', score: 4.0 },
      { id: '9', matkul: 'Basis Data', sks: 3, grade: 'A-', score: 3.7 },
      { id: '10', matkul: 'Sistem Operasi', sks: 3, grade: 'A', score: 4.0 },
    ],
  },
];

export default function Ujian() {
  const [openSemester, setOpenSemester] = useState<string | null>('1');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({ courseName: '', sks: 3, semester: 1, grade: 'A' });

  const totalCredits = MOCK_SEMESTERS.flatMap(s => s.records).reduce((sum, r) => sum + r.sks, 0);
  const stats = { totalCredits, remainingCredits: 144 - totalCredits, cumulativeGpa: '3.72', predikat: 'Cum Laude' };
  const maxGpa = 4.0;

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
    setNewRecord({ courseName: '', sks: 3, semester: 1, grade: 'A' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <LineChart className="w-8 h-8 text-blue-600" />
            STUDI PROGRES
          </h1>
          <p className="page-subtitle">Pantau perkembangan akademikmu! 📈</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button onClick={() => setShowAddModal(true)} className="btn-accent flex-1 md:flex-none flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> TAMBAH NILAI
          </button>
          <button className="btn-secondary hidden md:flex items-center gap-2">
            <Download className="w-4 h-4" /> DOWNLOAD
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'IPK', value: stats.cumulativeGpa, color: 'bg-green-200/80', valueClass: 'text-blue-600' },
          { label: 'TOTAL SKS', value: stats.totalCredits, color: 'bg-blue-200/80' },
          { label: 'SKS SISA', value: stats.remainingCredits, color: 'bg-accent/80' },
          { label: 'PREDIKAT', value: stats.predikat, color: 'bg-red-200/80', valueClass: 'text-orange-500 text-xl' },
        ].map((s, i) => (
          <div key={i} className="bg-card p-4 border-drawn shadow-sm text-center relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 ${s.color} transform ${i % 2 ? 'rotate-2' : '-rotate-2'}`} />
            <p className="stat-label">{s.label}</p>
            <p className={`text-3xl md:text-4xl font-black mt-1 ${s.valueClass || ''}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* GPA Chart */}
      <div className="bg-card p-6 md:p-8 border-drawn shadow-sm relative mb-8 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="absolute -top-3 right-8 w-16 h-4 bg-purple-100/50 transform rotate-2" />
        <h3 className="text-xl font-black italic mb-6">GRAFIK IPK PER SEMESTER</h3>
        <div className="h-48 flex items-end gap-2 sm:gap-4 pt-4 border-b-2 border-l-2 border-foreground px-2 sm:px-4 pb-0 relative">
          <div className="absolute -left-6 bottom-0 text-xs font-bold text-muted-foreground">0.0</div>
          <div className="absolute -left-6 bottom-1/2 text-xs font-bold text-muted-foreground">2.0</div>
          <div className="absolute -left-6 top-0 text-xs font-bold text-muted-foreground">4.0</div>
          <div className="absolute left-0 right-0 bottom-1/2 border-t border-dashed border-muted -z-10" />
          <div className="absolute left-0 right-0 top-0 border-t border-dashed border-muted -z-10" />
          {MOCK_SEMESTERS.map((sem, index) => {
            const heightPercentage = (parseFloat(sem.gpa) / maxGpa) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex justify-center">
                  <div
                    className="w-full max-w-[40px] bg-accent border-2 border-foreground rounded-t-sm transition-all duration-500 ease-out group-hover:bg-secondary"
                    style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground text-xs font-bold px-2 py-1 pointer-events-none transition-opacity">
                      {sem.gpa}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs font-bold text-muted-foreground">Smt {sem.semester}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transcript Accordion */}
      <div className="space-y-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
        <h3 className="text-xl font-black italic mb-4">TRANSKRIP NILAI</h3>
        {MOCK_SEMESTERS.map((sem) => (
          <div key={sem.semester} className="bg-card border-drawn shadow-brutal-sm overflow-hidden">
            <button
              onClick={() => setOpenSemester(openSemester === sem.semester ? null : sem.semester)}
              className="w-full flex justify-between items-center p-4 bg-muted hover:bg-accent transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground text-primary-foreground flex items-center justify-center font-bold">
                  {sem.semester}
                </div>
                <div>
                  <h4 className="font-black text-lg">Semester {sem.semester}</h4>
                  <p className="text-xs font-bold text-muted-foreground">IPS: <span className="text-foreground">{sem.gpa}</span></p>
                </div>
              </div>
              {openSemester === sem.semester ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openSemester === sem.semester && (
              <div className="p-0 border-t-2 border-foreground">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted border-b-2 border-foreground">
                        <th className="p-3 text-xs font-bold text-muted-foreground uppercase">Mata Kuliah</th>
                        <th className="p-3 text-xs font-bold text-muted-foreground uppercase text-center">SKS</th>
                        <th className="p-3 text-xs font-bold text-muted-foreground uppercase text-center">Nilai</th>
                        <th className="p-3 text-xs font-bold text-muted-foreground uppercase text-center">Angka</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sem.records.map((r, idx) => (
                        <tr key={r.id} className={idx !== sem.records.length - 1 ? 'border-b border-muted' : ''}>
                          <td className="p-3 font-bold">{r.matkul}</td>
                          <td className="p-3 text-center font-medium">{r.sks}</td>
                          <td className="p-3 text-center font-black text-blue-600">{r.grade}</td>
                          <td className="p-3 text-center font-medium">{r.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-black italic mb-6">TAMBAH NILAI</h2>
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Mata Kuliah</label>
                <input type="text" required value={newRecord.courseName} onChange={e => setNewRecord({ ...newRecord, courseName: e.target.value })} className="input-brutal" placeholder="Contoh: Algoritma" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">SKS</label>
                  <input type="number" min="1" max="6" required value={newRecord.sks} onChange={e => setNewRecord({ ...newRecord, sks: parseInt(e.target.value) })} className="input-brutal" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">Semester</label>
                  <input type="number" min="1" max="14" required value={newRecord.semester} onChange={e => setNewRecord({ ...newRecord, semester: parseInt(e.target.value) })} className="input-brutal" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Nilai Huruf</label>
                <select value={newRecord.grade} onChange={e => setNewRecord({ ...newRecord, grade: e.target.value })} className="input-brutal">
                  {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full mt-4 btn-primary py-3 text-lg">SIMPAN</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
