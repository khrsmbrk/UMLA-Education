import { useState, useEffect } from 'react';
import {
  BookOpen, Clock, FileText, GraduationCap, Calendar as CalendarIcon,
  CheckCircle, Play, Pause, RotateCcw, Book, Monitor, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_STATS = {
  tasksCompleted: 12,
  coursesActive: 6,
  assignmentsDue: 3,
  examsUpcoming: 2,
  notesCount: 18,
  resourcesCount: 9,
};

const MOCK_TASKS = [
  { id: '1', title: 'Baca Chapter 7 - Data Structures', courseName: 'Struktur Data', priority: 'HIGH', status: 'NOT_STARTED', dueDate: '25 Mar 2026' },
  { id: '2', title: 'Kerjakan tugas SQL query', courseName: 'Basis Data', priority: 'MEDIUM', status: 'NOT_STARTED', dueDate: '28 Mar 2026' },
  { id: '3', title: 'Review materi UTS Kalkulus', courseName: 'Kalkulus II', priority: 'HIGH', status: 'COMPLETED', dueDate: '20 Mar 2026' },
];

export default function Dashboard() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerMode, setTimerMode] = useState('POMODORO');
  const [tasks, setTasks] = useState(MOCK_TASKS);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timerMode === 'POMODORO' ? 25 * 60 : timerMode === 'SHORT_BREAK' ? 5 * 60 : 15 * 60);
  };
  const setMode = (mode: string) => {
    setTimerMode(mode);
    setIsActive(false);
    setTimeLeft(mode === 'POMODORO' ? 25 * 60 : mode === 'SHORT_BREAK' ? 5 * 60 : 15 * 60);
  };
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED' } : t));
  };

  const progressStats = [
    { label: 'Tasks', value: MOCK_STATS.tasksCompleted, desc: 'Completed', icon: CheckCircle, color: 'bg-blue-100', link: '/tasks' },
    { label: 'Courses', value: MOCK_STATS.coursesActive, desc: 'Active Enrolled', icon: BookOpen, color: 'bg-green-100', link: '/courses' },
    { label: 'Assignments', value: MOCK_STATS.assignmentsDue, desc: 'Due this week', icon: FileText, color: 'bg-accent/50', link: '/assignments' },
    { label: 'Exams', value: MOCK_STATS.examsUpcoming, desc: 'Upcoming', icon: GraduationCap, color: 'bg-red-100', link: '/exams' },
    { label: 'Notes', value: MOCK_STATS.notesCount, desc: 'Total saved', icon: Book, color: 'bg-purple-100', link: '/notes' },
    { label: 'Resources', value: MOCK_STATS.resourcesCount, desc: 'Materials', icon: Monitor, color: 'bg-orange-100', link: '/resources' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><GraduationCap className="w-8 h-8 text-blue-600" /> DASHBOARD</h1>
          <p className="page-subtitle">Your Academic Control Center 🚀</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="font-cursive text-2xl text-foreground font-bold uppercase">MAHASISWA</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">student@umla.ac.id</p>
          </div>
          <div className="w-12 h-12 bg-muted border-drawn overflow-hidden shadow-[2px_2px_0px_0px_hsl(var(--navy))] transform rotate-3">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e6b999" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <div className="bg-card p-6 border-drawn shadow-sm relative animate-fade-up">
            <div className="absolute -top-3 left-8 w-16 h-4 bg-accent/50 transform -rotate-2" />
            <h2 className="text-2xl font-black italic mb-6">PROGRESS OVERVIEW</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {progressStats.map((stat, idx) => (
                <Link key={idx} to={stat.link} className={`flex flex-col p-4 border-drawn ${stat.color} shadow-[2px_2px_0px_0px_hsl(var(--navy))] hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_hsl(var(--navy))] transition-all group`}>
                  <div className="flex justify-between items-start mb-2">
                    <stat.icon className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
                    <ArrowRight className="w-4 h-4 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-3xl font-black tracking-tighter text-foreground my-1">{stat.value}</span>
                  <span className="font-bold text-sm uppercase tracking-wider text-foreground">{stat.label}</span>
                  <span className="font-cursive text-xs text-muted-foreground mt-1">{stat.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Weekly Tasks */}
          <div className="bg-card p-6 border-drawn shadow-sm relative animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-green-100/80 transform rotate-1" />
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black italic">THIS WEEK'S TASKS</h2>
              <Link to="/tasks" className="font-bold text-muted-foreground text-xs tracking-widest hover:text-foreground transition-colors">VIEW ALL</Link>
            </div>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className={`flex items-start gap-4 p-4 border-2 border-dashed border-muted hover:bg-muted transition-colors ${task.status === 'COMPLETED' ? 'opacity-60' : ''}`}>
                  <button onClick={() => toggleTask(task.id)} className={`mt-1 w-6 h-6 border-drawn cursor-pointer hover:bg-green-100 transition-colors flex items-center justify-center active:scale-95 ${task.status === 'COMPLETED' ? 'bg-green-100' : 'bg-card'}`}>
                    {task.status === 'COMPLETED' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-black text-lg leading-tight mb-1 ${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h3>
                    <p className="font-cursive text-sm text-muted-foreground mb-2">{task.courseName}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`tag-brutal ${task.priority === 'HIGH' ? 'bg-red-100' : 'bg-accent/50'}`}>{task.priority}</span>
                      <span className="tag-brutal bg-card">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Pomodoro */}
          <div className="bg-foreground text-primary-foreground p-6 border-drawn shadow-brutal-yellow-lg relative overflow-hidden animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h2 className="text-xl font-black italic mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" /> POMODORO TIMER
            </h2>
            <div className="flex justify-center gap-2 mb-8">
              {['POMODORO', 'SHORT_BREAK', 'LONG_BREAK'].map(m => (
                <button key={m} onClick={() => setMode(m)} className={`text-[10px] font-bold px-3 py-1 border-2 border-white/20 rounded-full transition-colors ${timerMode === m ? 'bg-white text-foreground' : 'hover:bg-white/10'}`}>
                  {m.replace('_', ' ')}
                </button>
              ))}
            </div>
            <div className="text-center mb-8">
              <div className="text-7xl font-black tracking-tighter tabular-nums">{formatTime(timeLeft)}</div>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={toggleTimer} className="w-14 h-14 bg-accent text-foreground rounded-full flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
              <button onClick={resetTimer} className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sticky Note */}
          <div className="bg-accent p-6 border-drawn shadow-brutal-sm transform rotate-2 relative animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-red-200/80 transform -rotate-3" />
            <h3 className="font-black text-lg mb-2">Daily Quote</h3>
            <p className="font-cursive text-xl text-foreground/80 leading-relaxed">"The secret of getting ahead is getting started."</p>
            <p className="text-right text-sm font-bold mt-4">- Mark Twain</p>
          </div>
        </div>
      </div>
    </div>
  );
}
