import { useEffect, useState } from 'react';

const useScroll = (loading: boolean) => {
  const [scrollPos, setScrollPos] = useState(0);
  const handleScroll = () => {
    if (!loading && window.scrollY !== 0) {
      setScrollPos(window.scrollY);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    window.scrollTo(0, scrollPos);
  }, [loading]);
};

export default useScroll;
