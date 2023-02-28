import type { AppProps } from 'next/app';
import GlobalStyle from '@/styles/GlobalStyle';
import { useEffect } from 'react';
import storage from '@/lib/storage';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const theme = storage.getItem('theme');
    if (!theme) {
      storage.setItem('theme', 'light');
      return;
    }
    document.body.dataset.theme = theme;
  }, [storage]);

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
