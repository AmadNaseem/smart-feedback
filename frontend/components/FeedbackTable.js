import { motion } from "framer-motion";

export default function FeedbackTable({ list }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <table className="w-full">
    <thead className="bg-gradient-to-r from-primary to-secondary text-white">
          <tr>
            {["When", "User", "Text", "Rating", "Sentiment"].map((header) => (
      <th key={header} className="p-4 text-left font-semibold tracking-wide">{header}</th>
            ))}
          </tr>
        </thead>
    <tbody>
          {list.map((f, i) => (
            <motion.tr
              key={f.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
      className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
      <td className="p-4 text-gray-700 dark:text-gray-300">{new Date(f.createdAt).toLocaleString()}</td>
              <td className="p-3">{f.userName || "-"}</td>
      <td className="p-4 max-w-xs truncate text-gray-700 dark:text-gray-300">{f.text}</td>
              <td className="p-3">{f.rating ?? "-"}</td>
              <td className="p-3">{f.sentiment}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
