import { useEffect } from 'react';

export default function useBodyScrollLock(condition: boolean) {
  useEffect(() => {
    if (condition) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [condition]);
}
