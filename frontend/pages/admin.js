import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/config";
import { fetchJSON } from "../lib/fetcher";
import StatsCard from "../components/StatsCard";
import FeedbackTable from "../components/FeedbackTable";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Admin() {
  const [list, setList] = useState([]);
  const [stats, setStats] = useState(null);

  async function loadData() {
    try {
      const [feedbackList, analytics] = await Promise.all([
        fetchJSON(`${API_BASE_URL}/feedback`),
        fetchJSON(`${API_BASE_URL}/feedback/analytics`),
      ]);
      setList(feedbackList);
      setStats(analytics);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

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

      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      <FeedbackTable list={list} />

      <p className="mt-6">
        <a href="/" className="text-purple-600 font-semibold hover:underline">
          Back to submit
        </a>
      </p>
    </main>
  );
}
