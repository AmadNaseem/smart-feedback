import { useState } from 'react';
import { useRouter } from 'next/router';
import { fetchJSON } from '../lib/fetcher';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = await fetchJSON('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (data.access_token) {
        setSuccess('Signup successful! Redirecting to admin...');
        localStorage.setItem('token', data.access_token);
        setTimeout(() => router.push('/admin'), 1000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  }

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <form onSubmit={handleSignup} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-500 text-sm text-center">{success}</div>}
        <button type="submit" className="w-full bg-primary text-white p-3 rounded font-semibold">Sign Up</button>
        <p className="text-center text-sm mt-2">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
      </form>
    </div>
  );
}
