import { useEffect, useState } from 'react';
import { FileText, Plus, CheckCircle, Calendar as CalendarIcon, X, BookOpen } from 'lucide-react';
import { getUserData as getStoredData, saveUserData as saveStoredData } from '@/lib/mockStore';

const STORAGE_KEY_ASSIGNMENTS = 'umla_assignments';

type AssignmentItem = { id: string; title: string; description: string | null; status: string; dueDate: string; course: { name: string } | null };
const MOCK_ASSIGNMENTS: AssignmentItem[] = [];

export default function Assignments() {
  const [assignments, setAssignments] = useState(() => getStoredData(STORAGE_KEY_ASSIGNMENTS, MOCK_ASSIGNMENTS));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => { saveStoredData(STORAGE_KEY_ASSIGNMENTS, assignments); }, [assignments]);

  const toggleStatus = (id: string) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: a.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED' } : a));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignments([...assignments, { id: Date.now().toString(), ...newAssignment, status: 'NOT_STARTED', course: null as any }]);
    setIsModalOpen(false);
    setNewAssignment({ title: '', description: '', dueDate: '' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><FileText className="w-8 h-8 text-amber-600" /> ASSIGNMENTS</h1>
          <p className="page-subtitle">Track your homework and projects ✍️</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> NEW ASSIGNMENT
        </button>
      </div>

      <div className="bg-card p-6 border-drawn shadow-sm animate-fade-up">
        <div className="space-y-4">
          {assignments.map((a) => (
            <div key={a.id} className={`flex items-start gap-4 p-4 border-2 border-dashed border-muted hover:bg-muted transition-colors ${a.status === 'COMPLETED' ? 'opacity-60' : ''}`}>
              <button onClick={() => toggleStatus(a.id)} className={`mt-1 w-6 h-6 border-drawn cursor-pointer hover:bg-accent/50 transition-colors flex items-center justify-center active:scale-95 ${a.status === 'COMPLETED' ? 'bg-accent/50' : 'bg-card'}`}>
                {a.status === 'COMPLETED' && <CheckCircle className="w-4 h-4 text-amber-600" />}
              </button>
              <div className="flex-1">
                <h3 className={`font-black text-lg leading-tight mb-1 ${a.status === 'COMPLETED' ? 'line-through text-muted-foreground' : ''}`}>{a.title}</h3>
                {a.description && <p className="text-sm text-muted-foreground mb-2">{a.description}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {a.course && <span className="tag-brutal bg-green-100 flex items-center gap-1"><BookOpen className="w-3 h-3" />{a.course.name}</span>}
                  {a.dueDate && <span className="tag-brutal bg-card flex items-center gap-1"><CalendarIcon className="w-3 h-3" />{new Date(a.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                  <span className="tag-brutal bg-muted">{a.status.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">NEW ASSIGNMENT</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Title</label>
                <input type="text" required value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} className="input-brutal" placeholder="e.g., Final Essay" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Description</label>
                <textarea value={newAssignment.description} onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })} className="input-brutal" placeholder="Brief description..." rows={3} />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Due Date</label>
                <input type="date" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })} className="input-brutal" />
              </div>
              <button type="submit" className="w-full mt-6 btn-primary py-3">SAVE ASSIGNMENT</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
