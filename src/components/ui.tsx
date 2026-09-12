import type { ReactNode } from 'react';

export function Badge({
  children,
  color = 'brand',
  size = 'sm',
}: {
  children: ReactNode;
  color?: 'brand' | 'mint' | 'accent' | 'rose' | 'ink';
  size?: 'xs' | 'sm';
}) {
  const colors = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300',
    mint: 'bg-mint-50 text-mint-600 dark:bg-mint-500/15 dark:text-mint-300',
    accent: 'bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
    ink: 'bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-300',
  };
  const sizes = { xs: 'px-2 py-0.5 text-[10px]', sm: 'px-2.5 py-1 text-xs' };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${colors[color]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

export function Avatar({ src, alt, size = 40, ring = false }: { src: string; alt: string; size?: number; ring?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${ring ? 'ring-2 ring-brand-400 ring-offset-2 ring-offset-white dark:ring-offset-ink-900' : ''}`}
      style={{ width: size, height: size }}
    />
  );
}

export function ProgressBar({ value, color = 'brand' }: { value: number; color?: 'brand' | 'mint' | 'accent' | 'rose' }) {
  const colors = {
    brand: 'bg-brand-500',
    mint: 'bg-mint-500',
    accent: 'bg-accent-500',
    rose: 'bg-rose-500',
  };
  return (
    <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
      <div
        className={`h-full rounded-full ${colors[color]} transition-all duration-700 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  desc,
  action,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4 animate-bounce-soft">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-ink-900 dark:text-ink-50 mb-1">{title}</h3>
      <p className="text-sm text-ink-500 dark:text-ink-400 max-w-xs mb-4">{desc}</p>
      {action}
    </div>
  );
}
