import { useRef, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement>(
  onClickOutside: () => void
) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as HTMLDivElement)
      )
        onClickOutside();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef]);

  return { elementRef };
};
