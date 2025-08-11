import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import { API_BASE_URL } from "../lib/config";
import { fetchJSON } from "../lib/fetcher";
import StatsCard from "../components/StatsCard";
import FeedbackTable from "../components/FeedbackTable";
import Button from '../components/ui/Button';

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
  <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400 max-w-prose">Monitor incoming feedback, sentiment distribution and refine filters to focus on what matters most.</p>
        </div>
        {/* <div className="flex items-center gap-3 self-start md:self-center">
          <ThemeSwitcher />
        </div> */}
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
        <Button onClick={() => setShowFilters(v => !v)} variant="outline">Filters</Button>
        {showFilters && (
          <div ref={filterRef} className="absolute left-0 mt-2 w-72 rounded-2xl border border-slate-700/70 bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-black/40 p-4 z-20">
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1 text-slate-400 uppercase tracking-wide">Sentiment</label>
              <select value={sentiment} onChange={e => setSentiment(e.target.value)} className="w-full p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">All</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1 text-slate-400 uppercase tracking-wide">Rating</label>
              <select value={rating} onChange={e => setRating(e.target.value)} className="w-full p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">All</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1 text-slate-400 uppercase tracking-wide">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <Button onClick={() => { setSentiment(''); setRating(''); setDate(''); }} variant="outline" className="w-full mt-2">Clear</Button>
          </div>
        )}
      </div>

  <h2 className="text-xl font-semibold mb-4 tracking-tight">Feedback</h2>
      <FeedbackTable list={filteredList} />

    </main>
  );
}
