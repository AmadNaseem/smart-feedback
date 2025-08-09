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
      className="bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-6 rounded-xl shadow-xl max-w-lg mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Your name (optional)</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Feedback</label>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 min-h-[120px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:border-gray-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-2 rounded shadow-lg transition"
      >
      Send feedback
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
