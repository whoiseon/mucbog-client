import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  const [loading, setLoading] = useState(false);
  const tablet = useMediaQuery({
    query: '(max-width: 768px)',
  });

  useEffect(() => {
    setIsTablet(tablet);
    setLoading(true);
  }, [tablet]);

  return [isTablet, loading];
}
