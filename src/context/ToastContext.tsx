"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ToastType = "loading" | "success" | "error" | "info";

export interface ToastOptions {
  duration?: number;
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", options?: ToastOptions) => {
      const id = Date.now().toString();
      setToast({ id, message, type });

      // Automatically dismiss non-loading toasts
      if (type !== "loading") {
        const timeout = options?.duration ?? 3500;
        setTimeout(() => {
          setToast((current) => (current?.id === id ? null : current));
        }, timeout);
      }
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Floating Global Toast Notification */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          aria-label="Notification"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-4"
        >
          <div
            className={`flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-2xl backdrop-blur-md border text-sm sm:text-base font-semibold max-w-[92vw] sm:max-w-md ${
              toast.type === "loading"
                ? "bg-[#111827]/95 text-white border-white/20"
                : toast.type === "success"
                ? "bg-[#064e3b]/95 text-white border-emerald-400/40"
                : toast.type === "error"
                ? "bg-[#7f1d1d]/95 text-white border-rose-400/40"
                : "bg-[#1e293b]/95 text-white border-blue-400/40"
            }`}
          >
            {/* Icon */}
            {toast.type === "loading" && (
              <svg
                className="animate-spin w-5 h-5 text-emerald-400 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="opacity-95"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}

            {toast.type === "success" && (
              <div className="w-5 h-5 rounded-full bg-emerald-400 text-[#064e3b] flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {toast.type === "error" && (
              <div className="w-5 h-5 rounded-full bg-rose-400 text-[#7f1d1d] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                ✕
              </div>
            )}

            {toast.type === "info" && (
              <div className="w-5 h-5 rounded-full bg-sky-400 text-[#0c4a6e] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                i
              </div>
            )}

            {/* Message */}
            <span className="leading-snug flex-1">{toast.message}</span>

            {/* Dismiss Button (for non-loading) */}
            {toast.type !== "loading" && (
              <button
                type="button"
                onClick={hideToast}
                className="opacity-70 hover:opacity-100 p-1 -mr-1 transition-opacity text-white text-base leading-none cursor-pointer"
                aria-label="Dismiss toast"
              >
                ✕
              </button>
            )}
          </div>
        </aside>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
