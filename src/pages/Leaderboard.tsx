import { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Aisyah Putri', hours: 42.5, streak: 15 },
  { rank: 2, name: 'Budi Santoso', hours: 38.2, streak: 8 },
  { rank: 3, name: 'Citra Dewi', hours: 35.0, streak: 21 },
  { rank: 4, name: 'Dimas Pratama', hours: 31.5, streak: 5 },
  { rank: 5, name: 'Eka Wahyuni', hours: 28.0, streak: 2 },
  { rank: 6, name: 'Fajar Hidayat', hours: 25.5, streak: 10 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="w-8 h-8 text-amber-500 fill-amber-500" />;
    case 2: return <Medal className="w-8 h-8 text-slate-400 fill-slate-400" />;
    case 3: return <Medal className="w-8 h-8 text-amber-600 fill-amber-600" />;
    default: return <span className="text-2xl font-black text-muted-foreground w-8 text-center">{rank}</span>;
  }
};

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'allTime'>('weekly');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 border-b-2 border-dashed border-muted pb-4 text-center">
        <h1 className="text-5xl font-black italic flex items-center justify-center gap-4 text-amber-500 drop-shadow-[2px_2px_0_hsl(var(--navy))]">
          <Trophy className="w-12 h-12" /> LEADERBOARD
        </h1>
        <p className="page-subtitle text-center">See who's crushing it this week 🚀🔥</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {(['daily', 'weekly', 'allTime'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-6 py-3 font-black text-lg border-drawn transition-all capitalize active:scale-95 ${
              timeframe === tf
                ? 'bg-foreground text-primary-foreground shadow-brutal-sm translate-y-1'
                : 'bg-card hover:bg-muted shadow-[2px_2px_0px_0px_hsl(var(--navy))]'
            }`}
          >
            {tf.replace('Time', ' Time')}
          </button>
        ))}
      </div>

      <div className="bg-card p-8 border-drawn shadow-brutal animate-fade-up">
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <div
              key={user.name}
              className={`flex items-center justify-between p-4 border-drawn transition-all hover:bg-muted ${index < 3 ? 'bg-accent/20' : 'bg-card'}`}
            >
              <div className="flex items-center gap-6">
                <div className="w-12 flex justify-center">{getRankIcon(user.rank)}</div>
                <div className="w-12 h-12 rounded-full border-drawn bg-muted flex items-center justify-center font-black text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black">{user.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-bold">
                    <TrendingUp className="w-4 h-4 text-green-500" /> {user.streak} day streak
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-mono text-foreground">{user.hours}h</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Studied</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
