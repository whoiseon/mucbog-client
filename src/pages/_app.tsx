import type { AppContext, AppProps } from 'next/app';
import GlobalStyle from '@/styles/GlobalStyle';
import { useEffect, useState } from 'react';
import storage from '@/lib/storage';
import { useThemeEffect } from '@/lib/hooks/useThemeEffect';
import useDarkMode from '@/states/darkMode';
import nookies, { parseCookies } from 'nookies';
import { QueryClient } from '@tanstack/query-core';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { enableDarkMode, enableLightMode } = useDarkMode();

  useThemeEffect();

  useEffect(() => {
    const theme = storage.getItem('theme');
    if (!theme) return;
    if (theme === 'dark') {
      enableDarkMode();
    } else {
      enableLightMode();
    }
    document.body.dataset.theme = theme;
  }, [storage, enableDarkMode, enableLightMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <ReactQueryDevtools />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
