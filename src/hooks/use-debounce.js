import { useState, useEffect } from "react";

const useDebounce = (value, delay=600) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set the debouncedValue to the current value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on component unmount or when the value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
