import useDarkMode from '@/states/darkMode';

export function useTheme() {
  const darkModeState = useDarkMode();
  const theme = (() => {
    if (darkModeState.systemTheme === 'not-ready') return 'light';
    if (darkModeState.theme !== 'default') return darkModeState.theme;
    return darkModeState.systemTheme;
  })();

  return theme;
}
