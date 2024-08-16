import { useEffect, useState, useRef } from "react";

const useScrollToBottom = (threshold: number = 0) => {
  const [atBottom, setAtBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setAtBottom(distanceFromBottom <= threshold);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [threshold]);

  return { containerRef, atBottom };
};

export default useScrollToBottom;
