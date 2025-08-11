export default function Button({ as: Comp = 'button', variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm px-4 py-2';
  const variants = {
  primary: 'relative overflow-hidden bg-gradient-to-r from-primary-500 via-secondary to-accent text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:brightness-105 active:brightness-95 focus-visible:ring-primary-400/60 border border-primary/40 backdrop-blur-sm',
  outline: 'bg-white/70 dark:bg-transparent border border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800 focus-visible:ring-slate-400/60 shadow-sm',
    subtle: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus-visible:ring-slate-400/60',
    danger: 'bg-error text-white hover:bg-red-600 focus-visible:ring-error/60',
  ghost: 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 focus-visible:ring-slate-400/60'
  };
  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;
  return <Comp className={cls} {...props}>{children}</Comp>;
}
