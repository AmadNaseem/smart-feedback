import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 bg-gradient-to-br from-primary/25 via-accent/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 bg-gradient-to-br from-secondary/20 via-pink/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 bg-gradient-to-tr from-indigo-400/10 via-accent/10 to-transparent rounded-full blur-2xl" />
      </div>
      <Navbar />
  <main className="flex-1 w-full relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
