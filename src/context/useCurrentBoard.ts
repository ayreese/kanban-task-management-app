import { useEffect, useState } from "react";

export function useCurrentBoard() {
  const [getCurrentBoard, setCurrentBoard] = useState({
    id: "",
    name: "",
    columns: [],
  });
  useEffect(() => {
    if (window.sessionStorage.getItem("currentBoard")) {
      setCurrentBoard(
        JSON.parse(window.sessionStorage.getItem("currentBoard")!),
      );
    } else {
      window.sessionStorage.setItem(
        "currentBoard",
        JSON.stringify(getCurrentBoard),
      );
    }
  }, []);
  return getCurrentBoard;
}
