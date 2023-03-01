import { useEffect } from 'react';
import useDarkMode from '@/states/darkMode';

export function useThemeEffect() {
  const { theme, setSystemTheme } = useDarkMode();

  useEffect(() => {
    if (window !== undefined) {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setSystemTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, [setSystemTheme]);

  useEffect(() => {
    if (theme !== 'default') {
      document.body.dataset.theme = theme;
    }
  }, [theme]);
}
