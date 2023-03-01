import { useTheme } from '@/lib/hooks/useTheme';
import storage from '@/lib/storage';
import useDarkMode from '@/states/darkMode';

export function useToggleTheme() {
  const theme = useTheme();
  const { enableDarkMode, enableLightMode } = useDarkMode();
  const saveStorage = (value: 'light' | 'dark') => {
    storage.setItem('theme', value); // For Client side rendering
    document.cookie = `theme=${value}; path=/;`; // For Server side rendering
  };

  const toggle = () => {
    if (!theme) return;
    if (theme === 'dark') {
      enableLightMode();
      saveStorage('light');
    } else {
      enableDarkMode();
      saveStorage('dark');
    }
  };

  return [theme, toggle] as const;
}
