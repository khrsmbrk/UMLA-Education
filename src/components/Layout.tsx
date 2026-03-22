import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, LineChart, CheckCircle, BarChart3, Monitor, DollarSign, Settings, BookOpen, FileText, GraduationCap, Calendar, Book, Trophy } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/grades', icon: LineChart, label: 'Grades' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/tasks', icon: CheckCircle, label: 'Tasks' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/assignments', icon: FileText, label: 'Assign' },
  { to: '/exams', icon: GraduationCap, label: 'Exams' },
  { to: '/notes', icon: Book, label: 'Notes' },
  { to: '/resources', icon: Monitor, label: 'Resources' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
  { to: '/leaderboard', icon: Trophy, label: 'Board' },
  { to: '/finance', icon: DollarSign, label: 'Finance' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 md:px-8 pb-20">
        <Outlet />
      </div>
      
      {/* Bottom Nav - scrollable */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-foreground z-40">
        <div className="flex overflow-x-auto scrollbar-hide">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-shrink-0 flex flex-col items-center px-3 py-2 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
