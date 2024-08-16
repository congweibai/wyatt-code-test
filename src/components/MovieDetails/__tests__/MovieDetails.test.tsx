import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { MovieDetails } from "@/components/MovieDetails";
import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";
import { useMovieDetail } from "@/pages/movie/hooks";

vi.mock("@/contexts/selectedMovieContext/useSelectedMovie");
vi.mock("@/pages/movie/hooks");

describe("MovieDetails", () => {
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

    // act
    render(<MovieDetails />);

    // assert
    expect(
      screen.getByText("Please select movie to view detail")
    ).toBeInTheDocument();
  });

  it("displays movie details when data is available", () => {
    // mock
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

    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "tt6320628",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: mockResponse,
      getMovieDetail: vi.fn(),
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

  it.todo("should able to bookmark", async () => {
    //act
  });
});
