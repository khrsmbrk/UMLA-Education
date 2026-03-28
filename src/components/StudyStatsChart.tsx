import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', hours: 4.5 },
  { name: 'Tue', hours: 5.2 },
  { name: 'Wed', hours: 3.8 },
  { name: 'Thu', hours: 6.0 },
  { name: 'Fri', hours: 4.1 },
  { name: 'Sat', hours: 2.5 },
  { name: 'Sun', hours: 3.0 },
];

export default function StudyStatsChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }} dx={-10} />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{
              backgroundColor: 'hsl(var(--foreground))',
              color: 'hsl(var(--background))',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)',
            }}
            itemStyle={{ color: 'hsl(var(--background))' }}
          />
          <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} activeBar={{ fill: 'hsl(var(--secondary))' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
