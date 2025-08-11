import { useEffect, useState, useRef } from "react";
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
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    }
    if (showFilters) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showFilters]);
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
  <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 text-slate-900 dark:text-slate-100">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-transparent bg-clip-text">
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

      <div className="relative mb-6">
        <button
          className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-blue-700 transition"
          onClick={() => setShowFilters((v) => !v)}
        >
          Filters
        </button>
        {showFilters && (
          <div ref={filterRef} className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-20">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sentiment</label>
              <select value={sentiment} onChange={e => setSentiment(e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-gray-600">
                <option value="">All</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select value={rating} onChange={e => setRating(e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-gray-600">
                <option value="">All</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-gray-600" />
            </div>
            <button
              onClick={() => { setSentiment(''); setRating(''); setDate(''); }}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded mt-2"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      <FeedbackTable list={filteredList} />

    </main>
  );
}
