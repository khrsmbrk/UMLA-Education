import { useEffect, useState } from 'react';
import { CheckCircle, Plus, Calendar as CalendarIcon, X } from 'lucide-react';
import { getUserData as getStoredData, saveUserData as saveStoredData } from '@/lib/mockStore';

const STORAGE_KEY_TASKS = 'umla_tasks';

const MOCK_TASKS = [
  { id: '1', title: 'Get Practical Review From Teacher', course: { name: 'Manajemen Pelayanan Farmasi' }, priority: 'HIGH', status: 'NOT_STARTED', dueDate: '2026-04-01' },
  { id: '2', title: 'Update Project Documentation', course: { name: 'Manajemen Promosi Kesehatan' }, priority: 'HIGH', status: 'NOT_STARTED', dueDate: '2026-04-02' },
  { id: '3', title: 'Prepare Quarterly Report', course: null, priority: 'MEDIUM', status: 'IN_PROGRESS', dueDate: '2026-04-04' },
];

export default function Tasks() {
  const [tasks, setTasks] = useState(() => getStoredData(STORAGE_KEY_TASKS, MOCK_TASKS));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'MEDIUM', dueDate: '' });

  useEffect(() => { saveStoredData(STORAGE_KEY_TASKS, tasks); }, [tasks]);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED' }
        : task
    ));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask.title, course: null, priority: newTask.priority, status: 'NOT_STARTED', dueDate: newTask.dueDate }]);
    setIsModalOpen(false);
    setNewTask({ title: '', priority: 'MEDIUM', dueDate: '' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><CheckCircle className="w-8 h-8 text-blue-600" /> TASKS</h1>
          <p className="page-subtitle">Manage your to-dos and deadlines 📝</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> NEW TASK
        </button>
      </div>

      <div className="bg-card p-6 border-drawn shadow-sm animate-fade-up">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground font-cursive text-center py-10">No tasks found. Create one to get started!</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className={`flex items-start gap-4 p-4 border-2 border-dashed border-muted hover:bg-muted transition-colors relative ${task.status === 'COMPLETED' ? 'opacity-60' : ''}`}>
                <div className="mt-1">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`w-6 h-6 border-drawn cursor-pointer hover:bg-green-100 transition-colors flex items-center justify-center active:scale-95 ${task.status === 'COMPLETED' ? 'bg-green-100' : 'bg-card'}`}
                  >
                    {task.status === 'COMPLETED' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className={`font-black text-lg leading-tight mb-1 ${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h3>
                  {task.course && <p className="font-cursive text-sm text-muted-foreground mb-2">{task.course.name}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`tag-brutal ${task.priority === 'HIGH' ? 'bg-red-100' : task.priority === 'MEDIUM' ? 'bg-accent/50' : 'bg-blue-100'}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="tag-brutal bg-card flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    <span className="tag-brutal bg-muted">{task.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black italic mb-6">NEW TASK</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Task Title</label>
                <input type="text" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="input-brutal" placeholder="e.g., Read chapter 4" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Priority</label>
                  <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="input-brutal">
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Due Date</label>
                  <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="input-brutal" />
                </div>
              </div>
              <button type="submit" className="w-full mt-6 btn-primary py-3">SAVE TASK</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
