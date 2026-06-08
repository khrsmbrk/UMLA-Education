import { useEffect, useState } from 'react';
import { GraduationCap, Plus, Calendar, Clock, CheckCircle2, Circle, X } from 'lucide-react';
import { getStoredData, saveStoredData } from '@/lib/mockStore';

const STORAGE_KEY_EXAMS = 'umla_exams';

const MOCK_EXAMS = [
  { id: '1', title: 'UTS Struktur Data', type: 'MIDTERM', date: '2026-04-05', status: 'UPCOMING', course: { code: 'IF301' } },
  { id: '2', title: 'Quiz Basis Data #3', type: 'QUIZ', date: '2026-03-28', status: 'UPCOMING', course: { code: 'IF204' } },
  { id: '3', title: 'UAS Kalkulus II', type: 'FINAL', date: '2026-06-15', status: 'UPCOMING', course: { code: 'MA102' } },
  { id: '4', title: 'Praktikum Fisika', type: 'PRACTICAL', date: '2026-03-10', status: 'FINISHED', course: { code: 'FI101' } },
];

export default function Exams() {
  const [exams, setExams] = useState(() => getStoredData(STORAGE_KEY_EXAMS, MOCK_EXAMS));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExam, setNewExam] = useState({ title: '', type: 'MIDTERM', date: '' });

  useEffect(() => { saveStoredData(STORAGE_KEY_EXAMS, exams); }, [exams]);

  const toggleExamStatus = (id: string) => {
    setExams(exams.map(e => e.id === id ? { ...e, status: e.status === 'FINISHED' ? 'UPCOMING' : 'FINISHED' } : e));
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    setExams([...exams, { id: Date.now().toString(), ...newExam, status: 'UPCOMING', course: null as any }]);
    setIsModalOpen(false);
    setNewExam({ title: '', type: 'MIDTERM', date: '' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><GraduationCap className="w-8 h-8 text-red-600" /> EXAMS</h1>
          <p className="page-subtitle">Prepare for your upcoming tests 🎯</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> NEW EXAM
        </button>
      </div>

      <div className="grid gap-4">
        {exams.map((exam, i) => (
          <div key={exam.id} className={`bg-card p-4 border-drawn shadow-brutal-sm flex items-center justify-between transition-all animate-fade-up ${exam.status === 'FINISHED' ? 'opacity-60 bg-muted' : ''}`} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-4">
              <button onClick={() => toggleExamStatus(exam.id)} className="text-foreground hover:text-blue-600 transition-colors active:scale-95">
                {exam.status === 'FINISHED' ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6" />}
              </button>
              <div>
                <h3 className={`font-bold text-lg ${exam.status === 'FINISHED' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{exam.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  {exam.course && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 font-medium text-xs">{exam.course.code}</span>}
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(exam.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.type}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">NEW EXAM</h2>
            <form onSubmit={handleCreateExam} className="space-y-4">
              <div>
                <label className="block font-bold text-sm mb-1">Title</label>
                <input type="text" required value={newExam.title} onChange={e => setNewExam({ ...newExam, title: e.target.value })} className="input-brutal" placeholder="e.g. Midterm Exam" />
              </div>
              <div>
                <label className="block font-bold text-sm mb-1">Type</label>
                <select value={newExam.type} onChange={e => setNewExam({ ...newExam, type: e.target.value })} className="input-brutal">
                  <option value="MIDTERM">Midterm</option><option value="FINAL">Final</option><option value="QUIZ">Quiz</option><option value="PRACTICAL">Practical</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-sm mb-1">Date</label>
                <input type="date" required value={newExam.date} onChange={e => setNewExam({ ...newExam, date: e.target.value })} className="input-brutal" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-secondary">CANCEL</button>
                <button type="submit" className="flex-1 btn-primary">SAVE EXAM</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
