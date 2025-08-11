import { useState } from 'react';
import { useRouter } from 'next/router';
import { fetchJSON } from '../lib/fetcher';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const data = await fetchJSON('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div className="px-4 sm:px-6 flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Username</label>
              <input
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Password</label>
              <input
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-error text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">Don't have an account? <a href="/signup" className="text-primary font-medium hover:underline">Sign up</a></p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
