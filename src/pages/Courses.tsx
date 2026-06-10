import { useEffect, useState } from 'react';
import { BookOpen, Plus, X, GraduationCap, Hash } from 'lucide-react';
import { getUserData as getStoredData, saveUserData as saveStoredData } from '@/lib/mockStore';

const STORAGE_KEY_COURSES = 'umla_courses';

const MOCK_COURSES = [
  { id: '1', name: 'Struktur Data', sks: 4, semester: 3, code: 'IF301' },
  { id: '2', name: 'Basis Data', sks: 3, semester: 3, code: 'IF204' },
  { id: '3', name: 'Kalkulus II', sks: 3, semester: 2, code: 'MA102' },
  { id: '4', name: 'Algoritma & Pemrograman', sks: 4, semester: 2, code: 'IF201' },
  { id: '5', name: 'Fisika Dasar', sks: 3, semester: 1, code: 'FI101' },
  { id: '6', name: 'Bahasa Inggris', sks: 2, semester: 1, code: 'EN101' },
];

export default function Courses() {
  const [courses, setCourses] = useState(() => getStoredData(STORAGE_KEY_COURSES, MOCK_COURSES));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', sks: '', semester: '' });

  useEffect(() => { saveStoredData(STORAGE_KEY_COURSES, courses); }, [courses]);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses([...courses, { id: Date.now().toString(), name: newCourse.name, sks: Number(newCourse.sks), semester: Number(newCourse.semester), code: '-' }]);
    setIsModalOpen(false);
    setNewCourse({ name: '', sks: '', semester: '' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><BookOpen className="w-8 h-8 text-green-600" /> COURSES</h1>
          <p className="page-subtitle">Your academic subjects 📚</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> NEW COURSE
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <div key={course.id} className="p-6 border-drawn shadow-brutal-sm hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_hsl(var(--navy))] transition-all bg-green-50/50 group cursor-pointer animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-green-200 border-drawn rounded-full flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                <BookOpen className="w-5 h-5 text-foreground" />
              </div>
              <span className="tag-brutal bg-green-100">{course.code}</span>
            </div>
            <h3 className="font-black text-xl leading-tight mb-2 text-foreground">{course.name}</h3>
            <div className="flex gap-3 mt-4">
              <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
                <Hash className="w-4 h-4" /> {course.sks} SKS
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
                <GraduationCap className="w-4 h-4" /> Sem {course.semester}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">NEW COURSE</h2>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Course Name</label>
                <input type="text" required value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} className="input-brutal" placeholder="e.g., Database Systems" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">SKS</label>
                  <input type="number" value={newCourse.sks} onChange={(e) => setNewCourse({ ...newCourse, sks: e.target.value })} className="input-brutal" placeholder="3" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Semester</label>
                  <input type="text" value={newCourse.semester} onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })} className="input-brutal" placeholder="4" />
                </div>
              </div>
              <button type="submit" className="w-full mt-6 btn-primary py-3">SAVE COURSE</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
