// hook from https://usehooks.com/useOnClickOutside/
import { useEffect } from "react";

// Hook
function useOnClickOutside(ref: any, handler: any) {
  useEffect(
    () => {
      const listener = (ev : TouchEvent | MouseEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(ev.target)) {
          return;
        }

        handler(ev);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}

export default useOnClickOutside;
