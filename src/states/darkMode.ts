import { create, State } from 'zustand';

export type DarkModeState = {
  theme: 'dark' | 'light' | 'default';
  systemTheme: 'dark' | 'light' | 'not-ready';
};

export type SystemThemePayload = 'dark' | 'light';

type Action = {
  enableDarkMode: () => void;
  enableLightMode: () => void;
  setSystemTheme: (payload: SystemThemePayload) => void;
};

const useDarkMode = create<DarkModeState & Action>((set) => ({
  theme: 'default',
  systemTheme: 'not-ready',
  enableDarkMode: () => set({ theme: 'dark' }),
  enableLightMode: () => set({ theme: 'light' }),
  setSystemTheme: (payload: SystemThemePayload) =>
    set({ systemTheme: payload }),
}));

export default useDarkMode;
