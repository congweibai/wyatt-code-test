import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useMovieSearch } from "../useMovieSearch";
import axios from "axios";
import * as constants from "@/constants";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

describe("useMovieSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("error cases", () => {
    it("should handle API errors", async () => {
      // mock
      (mockedAxios.get as Mock).mockRejectedValue(new Error("Network Error"));
      vi.spyOn(constants, "OMD_API_KEY", "get").mockReturnValue("123456");
      vi.spyOn(constants, "OMD_BASE_URL", "get").mockReturnValue(
        "http://www.omdbapi.com"
      );

      // act
      const { result } = renderHook(() => useMovieSearch());
      act(() => {
        result.current.getMovieList({
          title: "Inception",
          year: 2010,
          type: "movie",
          page: 1,
        });
      });

      // assert
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockedAxios.get).toBeCalledTimes(1);
      expect(mockedAxios.get).toBeCalledWith("http://www.omdbapi.com", {
        params: {
          apiKey: "123456",
          s: "Inception",
          y: 2010,
          type: "movie",
          page: 1,
        },
      });
      expect(result.current.response).toBe(null);
      expect(result.current.error).toBe(
        "An error occurred during movie list retrieval."
      );
    });

    it("should handle missing API key", async () => {
      // mock
      vi.spyOn(constants, "OMD_API_KEY", "get").mockReturnValue("");
      vi.spyOn(constants, "OMD_BASE_URL", "get").mockReturnValue(
        "http://www.omdbapi.com"
      );
      const consoleMock = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);

      // act
      const { result } = renderHook(() => useMovieSearch());

      // assert
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.response).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.getMovieList).toBeInstanceOf(Function);
      expect(consoleMock).toHaveBeenCalledOnce();
      expect(consoleMock).toHaveBeenLastCalledWith("No OMD API been found");
    });
  });

  describe("success cases", () => {
    it("should initialize with correct default states", () => {
      const { result } = renderHook(() => useMovieSearch());

      expect(result.current.loading).toBe(false);
      expect(result.current.response).toBe(null);
      expect(result.current.error).toBe(null);
    });

    it("should handle successful API response", async () => {
      // mock
      vi.spyOn(constants, "OMD_API_KEY", "get").mockReturnValue("123456");
      vi.spyOn(constants, "OMD_BASE_URL", "get").mockReturnValue(
        "http://www.omdbapi.com"
      );

      const mockResponse = {
        totalResults: "1",
        Response: "True",
        Search: [
          {
            Title: "Peter Parker es Spider-Man",
            Year: "2010",
            imdbID: "tt8085826",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZjFjYzk2NzgtODU5Yy00Y2NlLWE2YTQtZmRiOGU4NmIwY2UzXkEyXkFqcGdeQXVyMTkwMDgzODc@._V1_SX300.jpg",
          },
        ],
      };

      (mockedAxios.get as Mock).mockResolvedValue({ data: mockResponse });

      // act
      const { result } = renderHook(() => useMovieSearch());

      act(() => {
        result.current.getMovieList({
          title: "Spider",
          year: 2010,
          type: "movie",
          page: 1,
        });
      });

      // assert
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockedAxios.get).toBeCalledTimes(1);
      expect(mockedAxios.get).toBeCalledWith("http://www.omdbapi.com", {
        params: {
          apiKey: "123456",
          s: "Spider",
          type: "movie",
          y: 2010,
          page: 1,
        },
      });
      expect(result.current.response).toEqual(mockResponse);
      expect(result.current.error).toBe(null);
    });

    it("should combine results when page is greater than 1 with successful API response", async () => {
      // mock
      vi.spyOn(constants, "OMD_API_KEY", "get").mockReturnValue("123456");
      vi.spyOn(constants, "OMD_BASE_URL", "get").mockReturnValue(
        "http://www.omdbapi.com"
      );

      const mockResponse = {
        totalResults: "2",
        Response: "True",
        Search: [
          {
            Title: "Peter Parker es Spider-Man",
            Year: "2010",
            imdbID: "tt8085826",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZjFjYzk2NzgtODU5Yy00Y2NlLWE2YTQtZmRiOGU4NmIwY2UzXkEyXkFqcGdeQXVyMTkwMDgzODc@._V1_SX300.jpg",
          },
        ],
      };

      const mockSecondResponse = {
        totalResults: "2",
        Response: "True",
        Search: [
          {
            Title: "Spider in the Web",
            Year: "2019",
            imdbID: "tt7942736",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BNzcwMGU3MDAtYzEzZi00OWIyLTgzMDMtNGQ3NTY3OGE2ZDIwXkEyXkFqcGdeQXVyNDMzNDc4Mg@@._V1_SX300.jpg",
          },
        ],
      };

      (mockedAxios.get as Mock)
        .mockResolvedValueOnce({ data: mockResponse })
        .mockResolvedValueOnce({ data: mockSecondResponse });

      // act
      const { result } = renderHook(() => useMovieSearch());

      act(() => {
        result.current.getMovieList({
          title: "Spider",
          year: 2010,
          type: "movie",
          page: 1,
        });
      });

      act(() => {
        result.current.getMovieList({
          title: "Spider",
          year: 2010,
          type: "movie",
          page: 2,
        });
      });

      // assert
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockedAxios.get).toBeCalledTimes(2);
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        1,
        "http://www.omdbapi.com",
        {
          params: {
            apiKey: "123456",
            s: "Spider",
            type: "movie",
            y: 2010,
            page: 1,
          },
        }
      );
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        2,
        "http://www.omdbapi.com",
        {
          params: {
            apiKey: "123456",
            s: "Spider",
            type: "movie",
            y: 2010,
            page: 2,
          },
        }
      );
      expect(result.current.response).toEqual({
        ...mockSecondResponse,
        Search: [...mockResponse.Search, ...mockSecondResponse.Search],
      });
      expect(result.current.error).toBe(null);
    });
  });
});
