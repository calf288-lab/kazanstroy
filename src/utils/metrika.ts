// Helper for Yandex.Metrika goal tracking
declare global {
  interface Window {
    ym?: (counterId: number, eventName: string, targetName: string, params?: Record<string, unknown>) => void;
  }
}

export const YANDEX_METRIKA_ID = 112292579;

export function trackGoal(targetName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(YANDEX_METRIKA_ID, 'reachGoal', targetName, params);
    }
  } catch (err) {
    console.warn('Metrika goal error:', err);
  }
}
