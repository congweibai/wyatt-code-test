import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMovieWatchlist } from "../useMovieWatchlist";
import { act } from "react";

// Mocking localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useMovieWatchlist Hook", () => {
  afterEach(() => {
    localStorage.clear();
    vi.clearAllTimers();
  });

  it("should initialize with the movie not in the watchlist", () => {
    // act
    const { result } = renderHook(() => useMovieWatchlist("movie1"));

    // assert
    expect(result.current.isInWatchList).toBe(false);
  });

  it("should add a movie to the watchlist", async () => {
    // act
    const { result } = renderHook(() => useMovieWatchlist("movie1"));

    act(() => {
      result.current.addToWatchList();
    });

    // assert
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.isInWatchList).toBe(true), {
      timeout: 1500,
    });
    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem("movie1")).toBe("1");
  });

  it("should remove a movie from the watchlist", async () => {
    // mock
    localStorage.setItem("movie1", "1");

    // act
    const { result } = renderHook(() => useMovieWatchlist("movie1"));

    expect(result.current.isInWatchList).toBe(true);

    act(() => {
      result.current.removeFromWatchList();
    });

    // assert
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.isInWatchList).toBe(false), {
      timeout: 1500,
    });
    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem("movie1")).toBe(null);
  });
});
