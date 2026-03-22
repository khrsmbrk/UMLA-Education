import { BarChart3, TrendingUp, Clock, CalendarDays, Activity } from 'lucide-react';

const stats = {
  totalHours: 142.5,
  weeklyAverage: 28.4,
  currentStreak: 15,
  longestStreak: 21,
  mostStudiedSubject: 'Computer Science',
  completionRate: 85,
};

const weeklyData = [
  { day: 'Mon', hours: 4.2 },
  { day: 'Tue', hours: 5.1 },
  { day: 'Wed', hours: 3.8 },
  { day: 'Thu', hours: 6.0 },
  { day: 'Fri', hours: 4.5 },
  { day: 'Sat', hours: 2.1 },
  { day: 'Sun', hours: 3.7 },
];

export default function Stats() {
  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title"><BarChart3 className="w-8 h-8 text-emerald-600" /> STATISTICS</h1>
          <p className="page-subtitle">Track your progress, visualize your success 📈✨</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Clock, color: 'bg-emerald-100 text-emerald-600', label: 'Total Hours', value: `${stats.totalHours}h` },
          { icon: TrendingUp, color: 'bg-blue-100 text-blue-600', label: 'Weekly Avg', value: `${stats.weeklyAverage}h` },
          { icon: Activity, color: 'bg-orange-100 text-orange-600', label: 'Current Streak', value: stats.currentStreak, suffix: 'days' },
        ].map((s, i) => (
          <div key={i} className="bg-card p-6 border-drawn shadow-brutal animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg border-drawn ${s.color.split(' ')[0]}`}>
                <s.icon className={`w-6 h-6 ${s.color.split(' ')[1]}`} />
              </div>
              <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-sm">{s.label}</h3>
            </div>
            <div className="stat-value">
              {s.value} {s.suffix && <span className="text-xl text-muted-foreground">{s.suffix}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card p-8 border-drawn shadow-brutal animate-fade-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-indigo-600" /> WEEKLY HOURS
          </h2>
          <div className="h-48 flex items-end gap-3 border-b-2 border-l-2 border-foreground px-4 pb-0 relative">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex justify-center">
                  <div
                    className="w-full max-w-[36px] bg-emerald-400 border-2 border-foreground rounded-t-sm transition-all duration-500 group-hover:bg-emerald-300"
                    style={{ height: `${(d.hours / maxHours) * 100}%`, minHeight: '4px' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground text-xs font-bold px-2 py-0.5 transition-opacity whitespace-nowrap">
                      {d.hours}h
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs font-bold text-muted-foreground">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {[
            { label: 'Longest Streak', value: `${stats.longestStreak} days` },
            { label: 'Top Subject', value: stats.mostStudiedSubject },
          ].map((s, i) => (
            <div key={i} className="bg-card p-6 border-drawn shadow-sm animate-fade-up" style={{ animationDelay: `${400 + i * 100}ms` }}>
              <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-sm mb-2">{s.label}</h3>
              <div className="text-2xl font-black text-foreground">{s.value}</div>
            </div>
          ))}
          <div className="bg-card p-6 border-drawn shadow-sm animate-fade-up" style={{ animationDelay: '600ms' }}>
            <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-sm mb-2">Task Completion</h3>
            <div className="flex items-end gap-2">
              <div className="text-4xl font-black font-mono text-foreground">{stats.completionRate}%</div>
              <div className="w-full bg-muted h-4 overflow-hidden mb-2 border-drawn">
                <div className="bg-emerald-500 h-full transition-all duration-700" style={{ width: `${stats.completionRate}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
