import { LineChart, Download, ChevronDown, ChevronUp, Plus, X, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CourseGrade, Semester } from '@/types/study';

function gradeFromAngka(n: number): string {
  if (n >= 85) return 'A';
  if (n >= 80) return 'A-';
  if (n >= 75) return 'B+';
  if (n >= 70) return 'B';
  if (n >= 65) return 'B-';
  if (n >= 60) return 'C+';
  if (n >= 55) return 'C';
  if (n >= 45) return 'D';
  return 'E';
}

function scoreFromGrade(g: string): number {
  const map: Record<string, number> = { A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, D: 1.0, E: 0 };
  return map[g] ?? 0;
}

const INITIAL_SEMESTERS: Semester[] = [
  {
    semester: '4', gpa: '3.80',
    records: [
      { id: '1', matkul: 'Manajemen Pelayanan Farmasi', sks: 3, grade: 'A', score: 4.0, nilaiAngka: 92, nilaiHuruf: 'A' },
      { id: '2', matkul: 'Manajemen Promosi Kesehatan', sks: 2, grade: 'B+', score: 3.3, nilaiAngka: 85, nilaiHuruf: 'B+' },
      { id: '3', matkul: 'Farmakologi Dasar', sks: 3, grade: 'A-', score: 3.7, nilaiAngka: 83, nilaiHuruf: 'A-' },
      { id: '4', matkul: 'Biokimia', sks: 2, grade: 'A', score: 4.0, nilaiAngka: 90, nilaiHuruf: 'A' },
    ],
  },
];

function calcGpa(records: CourseGrade[]) {
  const totalWeight = records.reduce((s, r) => s + r.sks * r.score, 0);
  const totalSks = records.reduce((s, r) => s + r.sks, 0);
  return totalSks > 0 ? (totalWeight / totalSks).toFixed(2) : '0.00';
}

export default function Ujian() {
  const [semesters, setSemesters] = useState<Semester[]>(INITIAL_SEMESTERS);
  const [openSemester, setOpenSemester] = useState<string | null>('4');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({ courseName: '', sks: 3, semester: 4, nilaiAngka: 85, grade: 'A', catatan: '' });
  const [editRecord, setEditRecord] = useState<(CourseGrade & { semesterIdx: string }) | null>(null);

  const allRecords = semesters.flatMap(s => s.records);
  const totalCredits = allRecords.reduce((sum, r) => sum + r.sks, 0);
  const cumulativeGpa = calcGpa(allRecords);
  const predikat = parseFloat(cumulativeGpa) >= 3.5 ? 'Dengan Pujian (Cum Laude)' : parseFloat(cumulativeGpa) >= 3.0 ? 'Sangat Memuaskan' : 'Memuaskan';
  const maxGpa = 4.0;

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const grade = gradeFromAngka(newRecord.nilaiAngka);
    const score = scoreFromGrade(grade);
    const semKey = String(newRecord.semester);
    const newCourse: CourseGrade = { id: Date.now().toString(), matkul: newRecord.courseName, sks: newRecord.sks, grade, score, nilaiAngka: newRecord.nilaiAngka, nilaiHuruf: grade, catatan: newRecord.catatan || undefined };
    setSemesters(prev => {
      const existing = prev.find(s => s.semester === semKey);
      if (existing) {
        return prev.map(s => {
          if (s.semester !== semKey) return s;
          const recs = [...s.records, newCourse];
          return { ...s, records: recs, gpa: calcGpa(recs) };
        });
      }
      return [...prev, { semester: semKey, gpa: calcGpa([newCourse]), records: [newCourse] }].sort((a, b) => Number(a.semester) - Number(b.semester));
    });
    setShowAddModal(false);
    setNewRecord({ courseName: '', sks: 3, semester: 4, nilaiAngka: 85, grade: 'A', catatan: '' });
    toast.success('Nilai berhasil ditambahkan!');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRecord) return;
    const grade = gradeFromAngka(editRecord.nilaiAngka);
    const score = scoreFromGrade(grade);
    setSemesters(prev => prev.map(s => {
      if (s.semester !== editRecord.semesterIdx) return s;
      const recs = s.records.map(r => r.id === editRecord.id ? { ...editRecord, grade, score, nilaiHuruf: grade } : r);
      return { ...s, records: recs, gpa: calcGpa(recs) };
    }));
    setEditRecord(null);
    toast.success('Nilai berhasil diperbarui!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><LineChart className="w-8 h-8 text-blue-600" /> STUDI PROGRES</h1>
          <p className="page-subtitle">Pantau perkembangan akademikmu! 📈</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button onClick={() => setShowAddModal(true)} className="btn-accent flex-1 md:flex-none flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> TAMBAH NILAI</button>
          <button className="btn-secondary hidden md:flex items-center gap-2"><Download className="w-4 h-4" /> EXPORT NILAI</button>
          <button className="btn-secondary hidden md:flex items-center gap-2"><Download className="w-4 h-4" /> TRANSKRIP PDF</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'IPK', value: cumulativeGpa, color: 'bg-green-200/80', valueClass: 'text-blue-600' },
          { label: 'TOTAL SKS', value: totalCredits, color: 'bg-blue-200/80' },
          { label: 'SKS SISA', value: 144 - totalCredits, color: 'bg-accent/80' },
          { label: 'PREDIKAT', value: predikat, color: 'bg-red-200/80', valueClass: 'text-orange-500 text-base md:text-lg' },
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
        <h3 className="text-xl font-black italic mb-6">GRAFIK IPK PER SEMESTER</h3>
        <div className="h-48 flex items-end gap-2 sm:gap-4 pt-4 border-b-2 border-l-2 border-foreground px-2 sm:px-4 pb-0 relative">
          <div className="absolute -left-6 bottom-0 text-xs font-bold text-muted-foreground">0.0</div>
          <div className="absolute -left-6 bottom-1/2 text-xs font-bold text-muted-foreground">2.0</div>
          <div className="absolute -left-6 top-0 text-xs font-bold text-muted-foreground">4.0</div>
          <div className="absolute left-0 right-0 bottom-1/2 border-t border-dashed border-muted -z-10" />
          <div className="absolute left-0 right-0 top-0 border-t border-dashed border-muted -z-10" />
          {semesters.map((sem, index) => {
            const heightPercentage = (parseFloat(sem.gpa) / maxGpa) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex justify-center">
                  <div className="w-full max-w-[40px] bg-accent border-2 border-foreground rounded-t-sm transition-all duration-500 ease-out group-hover:bg-secondary" style={{ height: `${heightPercentage}%`, minHeight: '4px' }}>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground text-xs font-bold px-2 py-1 pointer-events-none transition-opacity">{sem.gpa}</div>
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
        {semesters.map((sem) => (
          <div key={sem.semester} className="bg-card border-drawn shadow-brutal-sm overflow-hidden">
            <button onClick={() => setOpenSemester(openSemester === sem.semester ? null : sem.semester)} className="w-full flex justify-between items-center p-4 bg-muted hover:bg-accent transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground text-primary-foreground flex items-center justify-center font-bold">{sem.semester}</div>
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
                        <th className="p-3 text-xs font-bold text-muted-foreground uppercase text-center">Nilai Huruf</th>
                        <th className="p-3 text-xs font-bold text-muted-foreground uppercase text-center">Nilai Angka</th>
                        <th className="p-3 text-xs font-bold text-muted-foreground uppercase text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sem.records.map((r, idx) => (
                        <tr key={r.id} className={idx !== sem.records.length - 1 ? 'border-b border-muted' : ''}>
                          <td className="p-3 font-bold">{r.matkul}</td>
                          <td className="p-3 text-center font-medium">{r.sks}</td>
                          <td className="p-3 text-center font-black text-blue-600">{r.grade}</td>
                          <td className="p-3 text-center font-medium">{r.nilaiAngka}</td>
                          <td className="p-3 text-center">
                            <button onClick={() => setEditRecord({ ...r, semesterIdx: sem.semester })} className="p-1.5 hover:bg-accent transition-colors border-drawn"><Edit2 className="w-4 h-4" /></button>
                          </td>
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
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
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
                <label className="block text-sm font-bold text-muted-foreground mb-1">Nilai Angka (0-100)</label>
                <input type="number" min="0" max="100" required value={newRecord.nilaiAngka} onChange={e => {
                  const v = parseInt(e.target.value) || 0;
                  setNewRecord({ ...newRecord, nilaiAngka: v, grade: gradeFromAngka(v) });
                }} className="input-brutal" />
                <p className="text-xs text-muted-foreground mt-1">Auto: {gradeFromAngka(newRecord.nilaiAngka)} ({scoreFromGrade(gradeFromAngka(newRecord.nilaiAngka))})</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Catatan (Opsional)</label>
                <input type="text" value={newRecord.catatan} onChange={e => setNewRecord({ ...newRecord, catatan: e.target.value })} className="input-brutal" placeholder="Catatan tambahan..." />
              </div>
              <button type="submit" className="w-full mt-4 btn-primary py-3 text-lg">SIMPAN</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editRecord && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setEditRecord(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">EDIT NILAI</h2>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Mata Kuliah</label>
                <input type="text" required value={editRecord.matkul} onChange={e => setEditRecord({ ...editRecord, matkul: e.target.value })} className="input-brutal" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">SKS</label>
                  <input type="number" min="1" max="6" required value={editRecord.sks} onChange={e => setEditRecord({ ...editRecord, sks: parseInt(e.target.value) })} className="input-brutal" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">Nilai Angka (0-100)</label>
                  <input type="number" min="0" max="100" required value={editRecord.nilaiAngka} onChange={e => {
                    const v = parseInt(e.target.value) || 0;
                    setEditRecord({ ...editRecord, nilaiAngka: v });
                  }} className="input-brutal" />
                  <p className="text-xs text-muted-foreground mt-1">→ {gradeFromAngka(editRecord.nilaiAngka)} ({scoreFromGrade(gradeFromAngka(editRecord.nilaiAngka))})</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Nilai Huruf</label>
                <select value={gradeFromAngka(editRecord.nilaiAngka)} onChange={e => {
                  const g = e.target.value;
                  setEditRecord({ ...editRecord, nilaiHuruf: g, grade: g, score: scoreFromGrade(g) });
                }} className="input-brutal">
                  {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Catatan (Opsional)</label>
                <input type="text" value={editRecord.catatan || ''} onChange={e => setEditRecord({ ...editRecord, catatan: e.target.value })} className="input-brutal" placeholder="Catatan..." />
              </div>
              <button type="submit" className="w-full mt-4 btn-primary py-3 text-lg">SIMPAN PERUBAHAN</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
