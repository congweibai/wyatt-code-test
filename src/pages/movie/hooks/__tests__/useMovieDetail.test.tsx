import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useMovieDetail } from "../useMovieDetail";
import axios from "axios";
import * as constants from "@/constants";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

describe("useMovieDetail", () => {
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
      const { result } = renderHook(() => useMovieDetail());
      act(() => {
        result.current.getMovieDetail({
          imdbID: "tt0413300",
        });
      });

      // assert
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockedAxios.get).toBeCalledTimes(1);
      expect(mockedAxios.get).toBeCalledWith("http://www.omdbapi.com", {
        params: {
          apiKey: "123456",
          i: "tt0413300",
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
      const { result } = renderHook(() => useMovieDetail());

      // assert
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.response).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.getMovieDetail).toBeInstanceOf(Function);
      expect(consoleMock).toHaveBeenCalledOnce();
      expect(consoleMock).toHaveBeenLastCalledWith("No OMD API been found");
    });
  });

  describe("success cases", () => {
    it("should initialize with correct default states", () => {
      const { result } = renderHook(() => useMovieDetail());

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
        Title: "Spider-Man: Far from Home",
        Year: "2019",
        Rated: "PG-13",
        Released: "02 Jul 2019",
        Runtime: "129 min",
        Genre: "Action, Adventure, Comedy",
        Director: "Jon Watts",
        Writer: "Chris McKenna, Erik Sommers, Stan Lee",
        Actors: "Tom Holland, Samuel L. Jackson, Jake Gyllenhaal",
        Plot: "Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.",
        Language: "English, Italian, Czech",
        Country: "United States, Czech Republic, Australia, Canada, Italy",
        Awards: "11 wins & 26 nominations",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BODA5MTY0OWUtNjdlOC00NDI5LWE3NjYtNDM4MDI2MzE4OWUxXkEyXkFqcGdeQXVyOTAzODkzMjI@._V1_SX300.jpg",
        Ratings: [
          {
            Source: "Internet Movie Database",
            Value: "7.4/10",
          },
          {
            Source: "Rotten Tomatoes",
            Value: "91%",
          },
          {
            Source: "Metacritic",
            Value: "69/100",
          },
        ],
        Metascore: "69",
        imdbRating: "7.4",
        imdbVotes: "564,966",
        imdbID: "tt6320628",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$391,283,774",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
      };

      (mockedAxios.get as Mock).mockResolvedValue({ data: mockResponse });

      // act
      const { result } = renderHook(() => useMovieDetail());

      act(() => {
        result.current.getMovieDetail({
          imdbID: "tt0413300",
        });
      });

      // assert
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockedAxios.get).toBeCalledTimes(1);
      expect(mockedAxios.get).toBeCalledWith("http://www.omdbapi.com", {
        params: {
          apiKey: "123456",
          i: "tt0413300",
        },
      });
      expect(result.current.response).toEqual(mockResponse);
      expect(result.current.error).toBe(null);
    });
  });
});
