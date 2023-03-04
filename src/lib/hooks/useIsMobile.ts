import {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const mobile = useMediaQuery({
    query: '(max-width: 640px)'
  });

  useEffect(() => {
    setIsMobile(mobile);
    setLoading(true);
  }, [mobile]);

  return [isMobile, loading];
}
