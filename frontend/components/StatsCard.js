const colorClasses = {
  blue: { icon: 'text-sky-400', bg: 'bg-sky-500/10', text: 'text-sky-400' },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  amber: { icon: 'text-amber-400', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  red: { icon: 'text-red-400', bg: 'bg-red-500/10', text: 'text-red-400' },
};

export default function StatsCard({ label, value, icon, color = 'blue', percentage }) {
  const c = colorClasses[color] || colorClasses.blue;
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 backdrop-blur-xl p-6 shadow shadow-black/40 hover:shadow-black/60 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
          <p className={`mt-1 text-3xl font-bold text-slate-100`}>{value}</p>
        </div>
        <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${c.bg} border border-slate-700/50`}> 
          {icon ? (
            <span className={`text-xl ${c.icon}`}>{icon}</span>
          ) : (
            <span className={`text-xl ${c.icon}`}>📊</span>
          )}
        </div>
      </div>
      {percentage && (
        <div className="mt-3 flex items-center text-sm">
          <span className={`font-medium ${c.text}`}>{percentage}</span>
          <span className="text-slate-500 ml-2">of total feedback</span>
        </div>
      )}
    </div>
  );
}
