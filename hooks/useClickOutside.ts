import { RefObject, useEffect } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null> | T | null,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const element = ref instanceof HTMLElement ? ref : ref?.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("click", handleClickOutside);
    // document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // document.removeEventListener("mousedown", handleClickOutside);
      // document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);
}

export default useClickOutside;
