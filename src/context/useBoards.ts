import { useState, useEffect, createContext } from "react";

export function useBoards(loading: boolean, error: any, data: any) {
  const [boards, setBoards] = useState();
  useEffect(() => {
    const loadData = () => {
      if (loading) return "loading";
      if (error) return error.message;
      setBoards(data);
    };
  }, []);
  return boards;
}
