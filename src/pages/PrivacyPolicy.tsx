import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background bg-dot-pattern font-sans text-foreground flex flex-col">
      <header className="p-4 md:p-6 flex justify-between items-center border-b-2 border-foreground">
        <Link to="/" className="text-sm font-bold hover:text-orange-500 transition-colors">← Back to Portal</Link>
        <h1 className="font-black text-xl text-primary">Privacy Policy</h1>
      </header>

      <main className="flex-1 flex items-start justify-center p-8">
        <div className="w-full max-w-3xl bg-card border-drawn shadow-brutal p-8 md:p-12">
          <h2 className="text-2xl font-black text-primary mb-4">Privacy Policy</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Welcome to UMLA SSO Portal. We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information when using our academic portal services.
          </p>
          <h3 className="font-bold text-lg mb-2">Data Collection</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We collect information you provide when registering, including your name, email address, NIM, and academic data necessary for portal functionality.
          </p>
          <h3 className="font-bold text-lg mb-2">Data Usage</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Your data is used solely for academic purposes, including grade tracking, course management, and communication related to your studies at Universitas Muhammadiyah Lamongan.
          </p>
          <h3 className="font-bold text-lg mb-2">Data Protection</h3>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
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
