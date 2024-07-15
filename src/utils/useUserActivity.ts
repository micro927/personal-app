import { useState, useEffect } from 'react';

export const useUserActivity = () => {
  const [isActive, setIsActive] = useState(true); // Initially assume user is active

  const setActive = () => {
    setIsActive(true);
  };

  const setInactive = () => {
    setIsActive(false);
  };

  const handleActivity = () => {
    setActive();
  };

  const handleInactivity = () => {
    setInactive();
  };

  useEffect(() => {
    window.addEventListener('blur', handleInactivity);
    window.addEventListener('focus', handleActivity);
    // document.addEventListener('mousemove', handleActivity);
    // document.addEventListener('keydown', handleActivity);
    // document.addEventListener('scroll', handleActivity);
    window.addEventListener('pagehide', handleInactivity);
    window.addEventListener('pageshow', handleActivity);
    return () => {
      setInactive();
      window.removeEventListener('blur', handleInactivity);
      window.removeEventListener('focus', handleActivity);
      // document.removeEventListener('mousemove', handleActivity);
      // document.removeEventListener('keydown', handleActivity);
      // document.removeEventListener('scroll', handleActivity);
      window.removeEventListener('pagehide', handleInactivity);
      window.removeEventListener('pageshow', handleActivity);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isActive };
};
