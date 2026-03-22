import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, BookOpen, Mail } from 'lucide-react';

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      if (isRegistering) {
        setSuccessMsg('Registrasi berhasil! Silakan login.');
        setIsRegistering(false);
      } else {
        navigate('/dashboard');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative overflow-hidden flex flex-col">
      <header className="p-6 flex justify-between items-center bg-card border-b-2 border-foreground shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center text-white font-bold border-drawn transform -rotate-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl leading-none">UMLA SSO</h1>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Universitas Muhammadiyah Lamongan</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 relative">
        <div className="absolute top-10 left-1/4 w-32 h-8 bg-orange-300/60 transform -rotate-6 z-0" />
        <div className="absolute top-20 right-1/3 w-24 h-6 bg-blue-200/60 transform rotate-3 z-0" />

        <div className="w-full max-w-5xl grid md:grid-cols-3 gap-8 items-start z-10">
          {/* Left Polaroid */}
          <div className="hidden md:block transform -rotate-3 mt-10">
            <div className="bg-card p-4 pb-8 border-drawn shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-orange-200/80 transform rotate-2" />
              <div className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider p-2 mb-4 flex justify-between items-center border-drawn">
                <span>Student Access</span>
                <div className="w-3 h-3 rounded-full bg-white border border-foreground" />
              </div>
              <div className="aspect-square bg-muted border-drawn mb-4 flex items-center justify-center">
                <UserIcon className="w-16 h-16 text-muted-foreground/30" />
              </div>
              <p className="font-cursive text-xl text-center text-orange-500">Academic Passport</p>
            </div>
            <div className="mt-4 text-center">
              <p className="font-cursive text-2xl text-destructive transform -rotate-6">Don't forget! →</p>
            </div>
          </div>

          {/* Center Form */}
          <div className="md:col-span-1 relative">
            <div className="bg-card border-drawn shadow-2xl p-8 pt-12 relative min-h-[500px]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-blue-200/80 transform -rotate-2 flex items-center justify-center">
                <span className="text-[8px] font-mono text-blue-800 tracking-widest">UMLA • UMLA</span>
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-black mb-1">{isRegistering ? 'Register' : 'Sign In'}</h2>
                  <p className="font-cursive text-xl text-muted-foreground">{isRegistering ? 'Join our digital world.' : 'Access your digital world.'}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 border-drawn rounded-sm flex items-center justify-center transform rotate-6">
                  <Key className="w-5 h-5 text-orange-500" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && <div className="bg-red-100 border-2 border-destructive text-destructive p-3 font-bold text-sm">{errorMsg}</div>}
                {successMsg && <div className="bg-green-100 border-2 border-green-500 text-green-700 p-3 font-bold text-sm">{successMsg}</div>}

                {isRegistering && (
                  <>
                    <div>
                      <label className="inline-block bg-orange-200 px-2 py-1 text-sm font-bold border-drawn transform -rotate-1 mb-2">Full Name</label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="Your full name..." />
                    </div>
                    <div>
                      <label className="inline-block bg-blue-200 px-2 py-1 text-sm font-bold border-drawn transform rotate-1 mb-2">Email</label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="Your email..." />
                    </div>
                  </>
                )}

                <div>
                  <label className="inline-block bg-orange-200 px-2 py-1 text-sm font-bold border-drawn transform -rotate-1 mb-2">Username</label>
                  <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="Type your username..." />
                </div>
                <div>
                  <label className="inline-block bg-blue-200 px-2 py-1 text-sm font-bold border-drawn transform rotate-1 mb-2">Secret Password</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-foreground border-dashed py-2 focus:outline-none focus:border-solid font-cursive text-2xl placeholder:text-muted-foreground/40" placeholder="Your secret key..." />
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full bg-orange-500 text-white font-black text-xl py-4 border-drawn shadow-brutal-sm hover:translate-y-1 transition-all disabled:opacity-70 mt-4 active:scale-[0.97]">
                  {isLoading ? 'Loading...' : (isRegistering ? 'Register Now' : 'Enter My UMLA')}
                </button>

                <div className="text-center mt-4">
                  <button type="button" onClick={() => { setIsRegistering(!isRegistering); setErrorMsg(''); setSuccessMsg(''); }}
                    className="font-bold text-muted-foreground hover:text-foreground transition-colors">
                    {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
                  </button>
                </div>
              </form>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-accent p-4 border-drawn shadow-lg transform -rotate-6 w-48 z-20">
              <div className="w-2 h-2 rounded-full bg-destructive mx-auto mb-2" />
              <p className="text-xs font-bold uppercase mb-1">Reminder:</p>
              <p className="font-cursive text-sm leading-tight">Midterms start next Monday! Check your exam schedule.</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex flex-col items-center gap-8 mt-4">
            <div className="bg-card p-4 pb-8 border-drawn shadow-xl transform rotate-3 relative w-64">
              <div className="absolute -top-3 right-4 w-12 h-6 bg-blue-200/80 transform -rotate-6" />
              <div className="aspect-square bg-muted border-drawn mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-muted flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-muted-foreground/20 rounded-full" />
                </div>
              </div>
              <p className="font-cursive text-xl text-center">Campus Vibes ✨</p>
            </div>
            <div className="text-center mt-10">
              <p className="font-cursive text-3xl text-muted-foreground transform rotate-12">Dream Big!</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 flex flex-col items-center z-10 relative">
        <div className="bg-card border-drawn px-6 py-3 mb-6 flex items-center gap-3 shadow-[2px_2px_0px_0px_hsl(var(--navy))]">
          <Mail className="w-5 h-5 text-orange-500" />
          <span className="font-medium">Need help? <a href="mailto:it-support@umla.ac.id" className="text-orange-500 font-bold hover:underline">it-support@umla.ac.id</a></span>
        </div>
      </footer>
    </div>
  );
}
