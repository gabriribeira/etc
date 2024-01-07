import { useState, useEffect } from "react";

function useWindowSize() {
  const [state, setState] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= "640",
    isTablet: window.innerWidth <= "1024" && window.innerWidth >= "640",
    isDesktop: window.innerWidth >= "1024" && window.innerWidth <= "1280",
  });
  function handleResize() {
    setState({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= "640",
      isTablet: window.innerWidth <= "1024" && window.innerWidth >= "640",
      isDesktop: window.innerWidth >= "1024" && window.innerWidth <= "1280",
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return state;
}

export default useWindowSize;
