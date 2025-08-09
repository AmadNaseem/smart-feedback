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
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg max-w-lg mx-auto space-y-6 transition-all duration-200"
    >
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Your name (optional)</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Feedback</label>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Rating</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-lg shadow-md font-semibold text-lg transition-all duration-200"
      >
        Send feedback
      </button>
      {message && <p className="text-sm mt-2 text-center text-primary dark:text-secondary">{message}</p>}
    </form>
  );
}
