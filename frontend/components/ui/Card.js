export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-black/40 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className='', children }) {
  return <div className={`px-5 pt-5 pb-3 border-b border-slate-200/60 dark:border-slate-700/60 ${className}`}>{children}</div>;
}

export function CardTitle({ className='', children }) {
  return <h3 className={`text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight ${className}`}>{children}</h3>;
}

export function CardBody({ className='', children }) {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>;
}
