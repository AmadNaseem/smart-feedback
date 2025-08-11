export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-700 dark:text-slate-400">
        <p className="order-2 sm:order-1">© {new Date().getFullYear()} SmartFeedback. All rights reserved.</p>
        <div className="flex items-center gap-4 order-1 sm:order-2">
          <a href="/" className="hover:text-primary transition">Home</a>
          <a href="/admin" className="hover:text-primary transition">Admin</a>
          <a href="https://github.com/AmadNaseem" target="_blank" rel="noreferrer" className="hover:text-primary transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
