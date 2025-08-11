import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from './ui/Button';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkToken = () => setLoggedIn(!!localStorage.getItem('token'));
      checkToken();
      window.addEventListener('storage', checkToken);
      return () => window.removeEventListener('storage', checkToken);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    router.push('/login');
  }

  const navLink = (href, label, lockTheme) => {
    const active = router.pathname === href;
    const base = 'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50';
  const color = active ? 'text-primary' : 'text-slate-300';
    return <Link href={href} className={`${base} ${color}`}>{label}</Link>;
  };

  return (
  <header className={`sticky top-0 z-40 transition bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/60 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center h-16 gap-4">
  <Link href="/" className="text-xl font-black tracking-tight bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text select-none">SmartFeedback</Link>
        <nav className="hidden md:flex items-center gap-2 ml-6">
          {navLink('/', 'Home', true)}
          {navLink('/admin', 'Admin')}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {loggedIn ? (
            <Button onClick={handleLogout} variant="outline" className="hidden sm:inline-flex">Logout</Button>
          ) : (
            <Link href="/login" className="hidden sm:inline-flex"><Button variant="primary">Login</Button></Link>
          )}
          <button className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:bg-slate-800/60" onClick={() => setOpen(o => !o)} aria-label="Toggle Menu">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h14M3 12h14M3 18h14" /></svg>
          </button>
        </div>
      </div>
      {open && (
  <div className="md:hidden border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-xl px-4 pt-2 pb-4 space-y-2">
          <div className="flex flex-col gap-1">
            {navLink('/', 'Home', true)}
            {navLink('/admin', 'Admin')}
            {loggedIn ? (
              <Button onClick={handleLogout} variant="outline" className="w-full mt-1">Logout</Button>
            ) : (
              <Link href="/login" className="w-full"><Button className="w-full">Login</Button></Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
