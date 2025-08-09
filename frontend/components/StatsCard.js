const colorClasses = {
  blue: {
    icon: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  emerald: {
    icon: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    icon: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
  },
  red: {
    icon: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
  },
};

export default function StatsCard({ label, value, icon, color = "blue", percentage }) {
  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
          <p className={`text-3xl font-bold ${color === "blue" ? "text-gray-900 dark:text-gray-100" : classes.text}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${classes.bg}`}>
          <i className={`${icon} ${classes.icon} text-xl`}></i>
        </div>
      </div>
      {percentage && (
        <div className="mt-2 flex items-center text-sm">
          {color === "blue" && <i className="fas fa-arrow-up text-green-500 mr-1"></i>}
          <span className={color === "blue" ? "text-green-500 font-medium" : `${classes.text} font-medium`}>
            {percentage}
          </span>
          <span className="text-gray-600 dark:text-gray-400 ml-1">
            {color === "blue" ? "from last month" : "of total feedback"}
          </span>
        </div>
      )}
    </div>
  );
}
