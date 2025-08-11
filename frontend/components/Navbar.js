import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkToken = () => setLoggedIn(!!localStorage.getItem('token'));
      checkToken();
      window.addEventListener('storage', checkToken);
      return () => window.removeEventListener('storage', checkToken);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    router.push('/login');
  }

  return (
    <nav className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg py-4 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-indigo-100 dark:border-slate-800">
  <div className="text-2xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text drop-shadow-sm tracking-tight">Smart Feedback</div>
      <div className="space-x-6 flex items-center">
        <Link href="/">
          <span className="hover:text-primary dark:hover:text-accent cursor-pointer font-medium transition">Home</span>
        </Link>
        <Link href="/admin">
          <span className="hover:text-secondary dark:hover:text-accent cursor-pointer font-medium transition">Admin</span>
        </Link>
        {loggedIn ? (
          <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-gradient-to-r from-error to-pink text-white rounded-xl shadow hover:from-pink-600 hover:to-error transition font-semibold">Logout</button>
        ) : (
          <Link href="/login">
            <span className="ml-4 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow hover:from-accent hover:to-primary transition font-semibold cursor-pointer">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
