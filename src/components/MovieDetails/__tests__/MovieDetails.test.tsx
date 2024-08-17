import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock, afterEach } from "vitest";
import { MovieDetails } from "@/components/MovieDetails";
import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";
import { useMovieDetail, useMovieWatchlist } from "@/pages/movie/hooks";
import userEvent from "@testing-library/user-event";
import { mockMovieResponse } from "./mock";

vi.mock("@/contexts/selectedMovieContext/useSelectedMovie");
vi.mock("@/pages/movie/hooks");

describe("MovieDetails", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should display a loading spinner when data is loading", () => {
    // mock
    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "tt0133093",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: true,
      response: null,
      getMovieDetail: vi.fn(),
    });
    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: false,
      addToWatchList: vi.fn(),
      removeFromWatchList: vi.fn(),
      loading: false,
    });

    // act
    render(<MovieDetails />);

    // assert
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should show please select movie if no movie is selected", () => {
    // mock
    (useSelectedMovie as Mock).mockReturnValue({ selectedImdbID: "" });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: null,
      getMovieDetail: vi.fn(),
    });
    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: false,
      addToWatchList: vi.fn(),
      removeFromWatchList: vi.fn(),
      loading: false,
    });

    // act
    render(<MovieDetails />);

    // assert
    expect(
      screen.getByText("Please select movie to view detail")
    ).toBeInTheDocument();
  });

  it("displays movie details when data is available", () => {
    // mock
    const mockResponse = mockMovieResponse;

    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "tt6320628",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: mockResponse,
      getMovieDetail: vi.fn(),
    });
    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: false,
      addToWatchList: vi.fn(),
      removeFromWatchList: vi.fn(),
      loading: false,
    });

    // act
    render(<MovieDetails />);

    // assert
    const movieTitle = screen.getByText("Spider-Man: Far from Home");
    expect(movieTitle).toBeVisible();
    const movieRated = screen.getByText("PG-13");
    expect(movieRated).toBeVisible();
    const movieGenre = screen.getByText(/Action, Adventure, Comedy/);
    expect(movieGenre).toBeVisible();
    const movieRuntime = screen.getByText("129 min");
    expect(movieRuntime).toBeVisible();
    const moviePlot = screen.getByText(
      "Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever."
    );
    expect(moviePlot).toBeVisible();
    const movieActors = screen.getByText(
      "Tom Holland, Samuel L. Jackson, Jake Gyllenhaal"
    );
    expect(movieActors).toBeVisible();
    const movieDirector = screen.getByText("Jon Watts");
    expect(movieDirector).toBeVisible();

    const internetRateScore = screen.getByText("7.4/10");
    const internetRate = screen.getByText("Internet Movie Database");
    expect(internetRateScore).toBeVisible();
    expect(internetRate).toBeVisible();

    const tomatoesRateScore = screen.getByText("91%");
    const tomatoesRate = screen.getByText("Rotten Tomatoes");
    expect(tomatoesRateScore).toBeVisible();
    expect(tomatoesRate).toBeVisible();

    const metacriticRateScore = screen.getByText("69/100");
    const metacriticRate = screen.getByText("Metacritic");
    expect(metacriticRateScore).toBeVisible();
    expect(metacriticRate).toBeVisible();
  });

  it("should able to click bookmark when movie is not in watchlist", async () => {
    // mock
    const mockResponse = mockMovieResponse;

    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "tt6320628",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: mockResponse,
      getMovieDetail: vi.fn(),
    });

    const mockAddToWatchList = vi.fn();

    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: false,
      addToWatchList: mockAddToWatchList,
      removeFromWatchList: vi.fn(),
      loading: false,
    });

    // act
    render(<MovieDetails />);
    const user = userEvent.setup();

    // assert
    const watchlistButton = screen.getByRole("button", { name: /Watchlist/ });
    expect(watchlistButton).toBeEnabled();
    expect(watchlistButton).toBeInTheDocument();
    user.click(watchlistButton);
    await waitFor(() => expect(mockAddToWatchList).toBeCalledTimes(1));

    const removeButton = screen.queryByRole("button", { name: /Remove/ });
    expect(removeButton).toBeNull();
  });

  it("should able to click remove button when movie is in watchlist", async () => {
    // mock
    const mockResponse = mockMovieResponse;

    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "tt6320628",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: mockResponse,
      getMovieDetail: vi.fn(),
    });

    const mockRemoveFromWatchList = vi.fn();

    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: true,
      addToWatchList: vi.fn(),
      removeFromWatchList: mockRemoveFromWatchList,
      loading: false,
    });

    // act
    render(<MovieDetails />);
    const user = userEvent.setup();

    // assert
    const removeButton = screen.getByRole("button", { name: /Remove/ });
    expect(removeButton).toBeEnabled();
    expect(removeButton).toBeInTheDocument();
    user.click(removeButton);
    await waitFor(() => expect(mockRemoveFromWatchList).toBeCalledTimes(1));

    const watchlistButton = screen.queryByRole("button", { name: /Watchlist/ });
    expect(watchlistButton).toBeNull();
  });

  it("should not able to click bookmark when bookmark is loading", async () => {
    // mock
    const mockResponse = mockMovieResponse;

    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "tt6320628",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: mockResponse,
      getMovieDetail: vi.fn(),
    });

    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: false,
      addToWatchList: vi.fn(),
      removeFromWatchList: vi.fn(),
      loading: true,
    });

    // act
    render(<MovieDetails />);

    // assert
    const watchlistButton = screen.getByRole("button", { name: /Watchlist/ });
    expect(watchlistButton).toBeDisabled();
    expect(watchlistButton).toBeInTheDocument();
  });

  it("should not able to click remove when bookmark is loading", async () => {
    // mock
    const mockResponse = mockMovieResponse;

    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "tt6320628",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: mockResponse,
      getMovieDetail: vi.fn(),
    });

    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: true,
      addToWatchList: vi.fn(),
      removeFromWatchList: vi.fn(),
      loading: true,
    });

    // act
    render(<MovieDetails />);

    // assert
    const removeButton = screen.getByRole("button", { name: /Remove/ });
    expect(removeButton).toBeDisabled();
    expect(removeButton).toBeInTheDocument();
  });
});
