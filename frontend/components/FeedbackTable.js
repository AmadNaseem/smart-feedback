import { motion } from "framer-motion";

export default function FeedbackTable({ list }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white">
          <tr>
            {["When", "User", "Text", "Rating", "Sentiment"].map((header) => (
              <th key={header} className="p-3 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {list.map((f, i) => (
            <motion.tr
              key={f.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 transition"
            >
              <td className="p-3">{new Date(f.createdAt).toLocaleString()}</td>
              <td className="p-3">{f.userName || "-"}</td>
              <td className="p-3 max-w-xs truncate">{f.text}</td>
              <td className="p-3">{f.rating ?? "-"}</td>
              <td className="p-3">{f.sentiment}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
