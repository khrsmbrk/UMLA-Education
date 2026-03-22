import { useState } from 'react';
import { Book, Plus, FileText, Calendar, X } from 'lucide-react';

const MOCK_NOTES = [
  { id: '1', title: 'Chapter 1 - Intro to Algorithms', content: 'An algorithm is a step-by-step procedure for solving a problem. Key concepts: time complexity, space complexity, Big O notation...', updatedAt: '2026-03-20', course: { code: 'IF301' } },
  { id: '2', title: 'Database Normalization', content: '1NF: Eliminate repeating groups\n2NF: Remove partial dependencies\n3NF: Remove transitive dependencies\nBCNF: Every determinant is a candidate key', updatedAt: '2026-03-18', course: { code: 'IF204' } },
  { id: '3', title: 'React Hooks Summary', content: 'useState - state management\nuseEffect - side effects\nuseContext - context consumption\nuseRef - mutable refs\nuseMemo - memoization', updatedAt: '2026-03-15', course: null },
  { id: '4', title: 'Linear Algebra Notes', content: 'Vectors, matrices, determinants, eigenvalues and eigenvectors. Key theorem: every square matrix has at least one eigenvalue.', updatedAt: '2026-03-12', course: { code: 'MA102' } },
];

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setNewNote({ title: '', content: '' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Book className="w-8 h-8 text-purple-600" /> NOTES</h1>
          <p className="page-subtitle">Your personal knowledge base 🧠</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> NEW NOTE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_NOTES.map((note, i) => (
          <div key={note.id} className="bg-card p-6 border-drawn shadow-brutal-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-brutal transition-all animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-xl text-foreground line-clamp-2">{note.title}</h3>
              <FileText className="w-5 h-5 text-purple-500 flex-shrink-0" />
            </div>
            <p className="text-muted-foreground text-sm line-clamp-4 flex-grow mb-4 whitespace-pre-wrap">{note.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t-2 border-dashed border-muted">
              {note.course ? <span className="bg-purple-100 text-purple-800 px-2 py-1 font-medium">{note.course.code}</span> : <span>General</span>}
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">NEW NOTE</h2>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block font-bold text-sm mb-1">Title</label>
                <input type="text" required value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} className="input-brutal" placeholder="e.g. Chapter 1 Summary" />
              </div>
              <div>
                <label className="block font-bold text-sm mb-1">Content</label>
                <textarea required rows={10} value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} className="input-brutal font-mono text-sm" placeholder="Start writing..." />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-secondary">CANCEL</button>
                <button type="submit" className="flex-1 btn-primary">SAVE NOTE</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
