import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { API_BASE_URL } from "../lib/config";
import { fetchJSON } from "../lib/fetcher";
import StatsCard from "../components/StatsCard";
import FeedbackTable from "../components/FeedbackTable";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Admin() {
  const [list, setList] = useState([]);
  const [stats, setStats] = useState(null);
  const [sentiment, setSentiment] = useState('');
  const [rating, setRating] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  async function loadData(token) {
    try {
      const [feedbackList, analytics] = await Promise.all([
        fetchJSON(`${API_BASE_URL}/feedback`, { headers: { Authorization: `Bearer ${token}` } }),
        fetchJSON(`${API_BASE_URL}/feedback/analytics`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setList(feedbackList);
      setStats(analytics);
    } catch (err) {
      if (err.status === 401) {
        router.push('/login');
      }
      console.error(err);
    }
  }

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }
    loadData(token);
  }, []);

  // Filter logic
  const filteredList = list.filter(f => {
    let match = true;
    if (sentiment && f.sentiment?.toLowerCase() !== sentiment?.toLowerCase()) match = false;
    if (rating && String(f.rating) !== String(rating)) match = false;
    if (date && f.createdAt && new Date(f.createdAt).toISOString().slice(0, 10) !== date) match = false;
    return match;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Admin Dashboard
        </h1>
        <ThemeSwitcher />
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Total" value={stats.total} />
          <StatsCard label="Positive" value={stats.positive} />
          <StatsCard label="Neutral" value={stats.neutral} />
          <StatsCard label="Negative" value={stats.negative} />
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Sentiment</label>
          <select value={sentiment} onChange={e => setSentiment(e.target.value)} className="p-2 rounded border border-gray-300 dark:border-gray-600">
            <option value="">All</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <select value={rating} onChange={e => setRating(e.target.value)} className="p-2 rounded border border-gray-300 dark:border-gray-600">
            <option value="">All</option>
            {[...Array(10)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="p-2 rounded border border-gray-300 dark:border-gray-600" />
        </div>
        <button onClick={() => { setSentiment(''); setRating(''); setDate(''); }} className="ml-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Clear</button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      <FeedbackTable list={filteredList} />

    </main>
  );
}
