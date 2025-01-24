import { RefObject, useEffect, useRef } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  handler: (event: Event) => void,
  customRef?: RefObject<T>
) => {
  const elementRef = useRef<T>(null);
  const ref = customRef || elementRef;

  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);

  return ref;
};
