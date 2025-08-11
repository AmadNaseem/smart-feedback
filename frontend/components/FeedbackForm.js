import { useState } from "react";
import { API_BASE_URL } from "../lib/config";
import { fetchJSON } from "../lib/fetcher";
import Button from './ui/Button';

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
      className="rounded-2xl border border-slate-700/70 bg-slate-900/80 backdrop-blur-xl p-8 shadow-lg shadow-black/40 max-w-xl mx-auto space-y-7 transition-all duration-300"
    >
      <div>
  <label className="block text-sm font-semibold mb-2 text-slate-300">Your name (optional)</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/60 text-base shadow-sm text-slate-100"
        />
      </div>
      <div>
  <label className="block text-sm font-semibold mb-2 text-slate-300">Feedback</label>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/60 text-base shadow-sm text-slate-100"
        />
      </div>
      <div>
  <label className="block text-sm font-semibold mb-2 text-slate-300">Rating</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-3 rounded-xl border border-slate-700 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/60 text-base shadow-sm w-24 text-slate-100"
        />
      </div>
  <Button type="submit" className="w-full text-base py-3 after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition rounded-xl">✨ Send feedback</Button>
  {message && <p className="text-sm mt-2 text-center text-slate-300 font-medium animate-fade-in">{message}</p>}
    </form>
  );
}
