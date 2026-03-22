import { NavLink, Outlet } from 'react-router-dom';
import { LineChart, CheckCircle, BarChart3, Monitor, DollarSign, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: LineChart, label: 'Grades' },
  { to: '/tasks', icon: CheckCircle, label: 'Tasks' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
  { to: '/resources', icon: Monitor, label: 'Resources' },
  { to: '/finance', icon: DollarSign, label: 'Finance' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 md:px-8 pb-24">
        <Outlet />
      </div>
      
      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-foreground z-40">
        <div className="max-w-5xl mx-auto flex">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="hidden sm:block">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
