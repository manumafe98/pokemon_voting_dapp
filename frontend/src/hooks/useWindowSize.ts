import { useEffect, useState } from "react";

export function useWindowSize() {
  const [showMenuIcon, setShowMenuIcon] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowMenuIcon(window.innerWidth <= 1021);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return showMenuIcon;
}
