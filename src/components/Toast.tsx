import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
interface Toast { id: number; message: string; type: ToastType; }

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="glass-strong shadow-float rounded-xl px-4 py-3 flex items-center gap-3 animate-slide-in-right max-w-sm"
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-brand-500 shrink-0" />}
            <span className="text-sm font-medium text-ink-900 dark:text-ink-50">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
