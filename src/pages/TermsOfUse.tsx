import { Link } from 'react-router-dom';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background bg-dot-pattern font-sans text-foreground flex flex-col">
      <header className="p-4 md:p-6 flex justify-between items-center border-b-2 border-foreground">
        <Link to="/" className="text-sm font-bold hover:text-orange-500 transition-colors">← Back to Portal</Link>
        <h1 className="font-black text-xl text-primary">Terms of Use</h1>
      </header>

      <main className="flex-1 flex items-start justify-center p-8">
        <div className="w-full max-w-3xl bg-card border-drawn shadow-brutal p-8 md:p-12">
          <h2 className="text-2xl font-black text-primary mb-4">Terms of Use</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            By using this portal, you agree to our terms and conditions. The UMLA SSO Portal is provided for academic use by registered students and staff of Universitas Muhammadiyah Lamongan.
          </p>
          <h3 className="font-bold text-lg mb-2">Acceptable Use</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Users must use the portal responsibly and only for legitimate academic purposes. Sharing login credentials or attempting unauthorized access is prohibited.
          </p>
          <h3 className="font-bold text-lg mb-2">Account Responsibility</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <h3 className="font-bold text-lg mb-2">Content Ownership</h3>
          <p className="text-muted-foreground leading-relaxed">
            Academic materials, grades, and other data within the portal remain the property of Universitas Muhammadiyah Lamongan and its respective departments.
          </p>
        </div>
      </main>

      <footer className="py-6 flex flex-col items-center border-t border-muted">
        <p className="text-xs text-muted-foreground mb-3">© 2026 Universitas Muhammadiyah Lamongan. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Privacy Policy</Link>
          <Link to="/terms-of-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Terms of Use</Link>
        </div>
      </footer>
    </div>
  );
}
