import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronRight, Star, Plus, X } from 'lucide-react';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const COLORS = ['bg-blue-100', 'bg-accent/50', 'bg-green-100', 'bg-purple-100', 'bg-orange-100'];

const STORAGE_KEY = 'umla_schedule';

export default function Schedule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedule, setSchedule] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [newSlot, setNewSlot] = useState({ dayOfWeek: 'MONDAY', startTime: '', endTime: '', location: '', type: 'ON-SITE', courseName: '' });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  const groupedSchedule = DAYS.map(day => ({
    day,
    classes: schedule.filter((s: any) => s.dayOfWeek === day),
  })).filter(g => g.classes.length > 0);

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: `${Date.now()}`,
      dayOfWeek: newSlot.dayOfWeek,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      location: newSlot.location,
      type: newSlot.type,
      course: { name: newSlot.courseName, code: '-' },
    };
    setSchedule(prev => [...prev, item]);
    setIsModalOpen(false);
    setNewSlot({ dayOfWeek: 'MONDAY', startTime: '', endTime: '', location: '', type: 'ON-SITE', courseName: '' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><CalendarIcon className="w-8 h-8 text-blue-600" /> CLASS SCHEDULE</h1>
          <p className="page-subtitle">Genap Semester 2025/2026 📅</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="hidden md:block text-right">
            <p className="stat-label">CURRENT WEEK</p>
            <p className="font-black text-2xl text-foreground">Week 11</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> NEW CLASS
          </button>
        </div>
      </div>

      {groupedSchedule.length === 0 && (
        <div className="bg-card p-12 border-drawn shadow-sm text-center animate-fade-up">
          <Star className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="font-black text-2xl italic mb-2">No classes scheduled.</h3>
          <p className="font-cursive text-xl text-muted-foreground">Enjoy your free time!</p>
        </div>
      )}

      <div className="space-y-12">
        {groupedSchedule.map((daySchedule, idx) => (
          <div key={idx} className="relative animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <h2 className="text-2xl font-black italic bg-card px-4 py-1 border-drawn shadow-brutal-sm transform -rotate-2 inline-block">{daySchedule.day}</h2>
              <div className="flex-1 border-b-2 border-dashed border-muted" />
            </div>
            <div className="grid md:grid-cols-2 gap-6 pl-4 md:pl-8 border-l-2 border-foreground ml-4">
              {daySchedule.classes.map((cls: any, cIdx: number) => (
                <div key={cls.id} className="bg-card p-6 border-drawn shadow-brutal-sm relative group hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 ${COLORS[cIdx % COLORS.length]} opacity-80 transform ${cIdx % 2 === 0 ? 'rotate-2' : '-rotate-2'}`} />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-cursive text-xl">{cls.startTime} - {cls.endTime}</span>
                    </div>
                    <span className={`tag-brutal ${cls.type === 'ONLINE' ? 'bg-blue-50' : 'bg-accent/80'}`}>{cls.type}</span>
                  </div>
                  <h3 className="font-black text-lg italic mb-4 pr-8">{cls.course.name}</h3>
                  <div className="space-y-2 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{cls.course.code}</span></div>
                    {cls.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{cls.location}</span></div>}
                  </div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">NEW CLASS</h2>
            <form onSubmit={handleCreateSlot} className="space-y-4">
              <div>
                <label className="block font-bold text-sm mb-1">Course Name</label>
                <input type="text" required value={newSlot.courseName} onChange={e => setNewSlot({ ...newSlot, courseName: e.target.value })} className="input-brutal" placeholder="e.g. Algoritma" />
              </div>
              <div>
                <label className="block font-bold text-sm mb-1">Day</label>
                <select value={newSlot.dayOfWeek} onChange={e => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })} className="input-brutal">
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm mb-1">Start</label>
                  <input type="time" required value={newSlot.startTime} onChange={e => setNewSlot({ ...newSlot, startTime: e.target.value })} className="input-brutal" />
                </div>
                <div>
                  <label className="block font-bold text-sm mb-1">End</label>
                  <input type="time" required value={newSlot.endTime} onChange={e => setNewSlot({ ...newSlot, endTime: e.target.value })} className="input-brutal" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-secondary">CANCEL</button>
                <button type="submit" className="flex-1 btn-primary">SAVE</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
