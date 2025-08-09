import { motion } from "framer-motion";

const colorClasses = {
  Total: "bg-gray-800",
  Positive: "bg-green-600",
  Neutral: "bg-yellow-500",
  Negative: "bg-red-600",
};

export default function StatsCard({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`${colorClasses[label] || "bg-gray-700"} 
                  p-5 rounded-xl shadow-lg text-white`}
    >
      <h2 className="text-sm opacity-90">{label}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}
