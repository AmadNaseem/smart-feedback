import { useState } from "react";
import { API_BASE_URL } from "../lib/config";
import { fetchJSON } from "../lib/fetcher";

export default function FeedbackForm({ onSubmitted }) {
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("Submitting...");
    try {
      const data = await fetchJSON(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, text, rating: Number(rating) }),
      });
      setMessage(`Sent! Sentiment: ${data.sentiment}`);
      setText("");
      setUserName("");
      setRating(5);
      onSubmitted?.();
    } catch (err) {
      setMessage("Error " + err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-2xl max-w-lg mx-auto space-y-7 transition-all duration-300 ring-1 ring-indigo-100 dark:ring-slate-800"
    >
      <div>
  <label className="block text-sm font-semibold mb-2 text-primary dark:text-accent">Your name (optional)</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/60 text-base shadow-sm"
        />
      </div>
      <div>
  <label className="block text-sm font-semibold mb-2 text-secondary dark:text-accent">Feedback</label>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/60 text-base shadow-sm"
        />
      </div>
      <div>
  <label className="block text-sm font-semibold mb-2 text-accent dark:text-secondary">Rating</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/60 text-base shadow-sm w-24"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 tracking-wide drop-shadow-md hover:scale-[1.03] focus:ring-2 focus:ring-indigo-300"
      >
        <span className="inline-block align-middle">✨ Send feedback</span>
      </button>
  {message && <p className="text-sm mt-2 text-center text-success dark:text-accent font-medium animate-fade-in">{message}</p>}
    </form>
  );
}
