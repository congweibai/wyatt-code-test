import { useEffect, useState } from "react";

// this can be replaced by DB apis
function getStorageValue(key: string) {
  const saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved);
  return "";
}

// this can be replaced by DB apis
function setStorageValue(key: string, value: string) {
  localStorage.setItem(key, value);
}

// this can be replaced by DB apis
function removeStorageValue(key: string) {
  localStorage.removeItem(key);
}

export const useMovieWatchlist = (movieId: string) => {
  const [isInWatchList, setIsInWatchList] = useState(
    !!getStorageValue(movieId)
  );

  const [loading, setLoading] = useState(false);

  const addToWatchList = async () => {
    setLoading(true);
    setStorageValue(movieId, "1");
    // this mock api call
    setTimeout(() => {
      setIsInWatchList(!!getStorageValue(movieId));
      setLoading(false);
    }, 1000);
  };

  const removeFromWatchList = () => {
    setLoading(true);
    removeStorageValue(movieId);
    // this mock api call
    setTimeout(() => {
      setIsInWatchList(!!getStorageValue(movieId));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setIsInWatchList(!!getStorageValue(movieId));
  }, [movieId]);

  return {
    isInWatchList,
    addToWatchList,
    removeFromWatchList,
    loading,
  };
};
