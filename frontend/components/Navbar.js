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
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-blue-700">Smart Feedback</div>
      <div className="space-x-6 flex items-center">
        <Link href="/">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
        </Link>
        <Link href="/admin">
          <span className="hover:text-blue-600 cursor-pointer">Admin</span>
        </Link>
        {loggedIn ? (
          <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Logout</button>
        ) : (
          <Link href="/login">
            <span className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition cursor-pointer">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
