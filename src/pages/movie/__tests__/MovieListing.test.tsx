import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { MovieListing } from "../MovieListing";
import { useMovieDetail, useMovieSearch, useMovieWatchlist } from "../hooks";
import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";

vi.mock("@/contexts/selectedMovieContext/useSelectedMovie");
vi.mock("@/pages/movie/hooks");

describe("MovieListing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useMovieWatchlist as Mock).mockReturnValue({
      isInWatchList: false,
      addToWatchList: vi.fn(),
      removeFromWatchList: vi.fn(),
      loading: false,
    });
  });
  it("should render defult page view when no search happened nad nothing is selected", () => {
    // mock
    (useMovieSearch as Mock).mockReturnValue({
      loading: false,
      response: null,
      getMovieDetail: vi.fn(),
    });
    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: null,
      getMovieDetail: vi.fn(),
    });

    // act
    render(<MovieListing />);

    // assert
    const filterParts = screen.getByPlaceholderText("Search Movies");
    expect(filterParts).toBeVisible();

    const listingParts = screen.getByText("0 RESULTS");
    expect(listingParts).toBeVisible();

    const detailParts = screen.getByText(/Please select movie to view detail/);
    expect(detailParts).toBeVisible();
  });

  it("should render page view when search happened and movie is not selected", () => {
    // mock
    (useMovieSearch as Mock).mockReturnValue({
      loading: false,
      response: {
        Search: [
          {
            Title: "Spider",
            Year: "2007",
            imdbID: "tt1029161",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BNjMzMjE3MTQ0NV5BMl5BanBnXkFtZTcwMTcyMTgwNQ@@._V1_SX300.jpg",
          },
          {
            Title: "Spider-Man: Lotus",
            Year: "2023",
            imdbID: "tt13904644",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZjhmZTlkOTAtYTE0Yi00Yjg2LTg5M2UtNWNmNTZkZGM4ODRmXkEyXkFqcGdeQXVyMTI4NjgxNTk5._V1_SX300.jpg",
          },
          {
            Title: "Earth vs. the Spider",
            Year: "2001",
            imdbID: "tt0282178",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMjZlMzQ2MDMtNDQwYi00MDMzLTg3NmEtZjg2NGMwMmNmMWFjXkEyXkFqcGdeQXVyMTU0NTE4MTkz._V1_SX300.jpg",
          },
          {
            Title: "Spider in the Web",
            Year: "2019",
            imdbID: "tt7942736",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BNzcwMGU3MDAtYzEzZi00OWIyLTgzMDMtNGQ3NTY3OGE2ZDIwXkEyXkFqcGdeQXVyNDMzNDc4Mg@@._V1_SX300.jpg",
          },
          {
            Title: "The Spider Within: A Spider-Verse Story",
            Year: "2023",
            imdbID: "tt27369002",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZjQ5NTgxNTktYWU5Yy00ZDIzLWJiYmItMWIxOTc4NTgwYzRlXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg",
          },
          {
            Title: "The Girl and the Spider",
            Year: "2021",
            imdbID: "tt11967484",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZWRkZGQ5ZjUtNWE5Zi00ZjYyLWIxMmMtMjJjZWFjZGIyN2JlXkEyXkFqcGdeQXVyMTg5MDEyNw@@._V1_SX300.jpg",
          },
          {
            Title: "Spider-Plant Man",
            Year: "2005",
            imdbID: "tt0460946",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMjVkOTU5MGEtMmRjYy00ZjQwLTk2YzgtNzlmNTJiZWI5M2NjXkEyXkFqcGdeQXVyMzI2NTcxODU@._V1_SX300.jpg",
          },
          {
            Title: "Jack Black: Spider-Man",
            Year: "2002",
            imdbID: "tt0331527",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZDhlMmNmMDMtZmQ2Zi00M2FlLTg2MjEtNjZjNGI3M2ZmZTc1XkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_SX300.jpg",
          },
        ],
        totalResults: "36",
        Response: "True",
      },
      getMovieDetail: vi.fn(),
    });
    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: null,
      getMovieDetail: vi.fn(),
    });

    // act
    render(<MovieListing />);

    // assert
    const filterParts = screen.getByPlaceholderText("Search Movies");
    expect(filterParts).toBeVisible();

    const listingParts = screen.getByText("36 RESULTS");
    expect(listingParts).toBeVisible();

    const nothingDetail = screen.queryByText(
      /Please select movie to view detail/
    );
    expect(nothingDetail).toBeVisible();
  });

  it("should render page view when search happened and movie is selected", () => {
    // mock
    (useMovieSearch as Mock).mockReturnValue({
      loading: false,
      response: {
        Search: [
          {
            Title: "Spider",
            Year: "2007",
            imdbID: "tt1029161",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BNjMzMjE3MTQ0NV5BMl5BanBnXkFtZTcwMTcyMTgwNQ@@._V1_SX300.jpg",
          },
          {
            Title: "Spider-Man: Lotus",
            Year: "2023",
            imdbID: "tt13904644",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZjhmZTlkOTAtYTE0Yi00Yjg2LTg5M2UtNWNmNTZkZGM4ODRmXkEyXkFqcGdeQXVyMTI4NjgxNTk5._V1_SX300.jpg",
          },
          {
            Title: "Earth vs. the Spider",
            Year: "2001",
            imdbID: "tt0282178",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMjZlMzQ2MDMtNDQwYi00MDMzLTg3NmEtZjg2NGMwMmNmMWFjXkEyXkFqcGdeQXVyMTU0NTE4MTkz._V1_SX300.jpg",
          },
          {
            Title: "Spider Forest",
            Year: "2004",
            imdbID: "tt0407821",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BNjg5OTY0NzczMF5BMl5BanBnXkFtZTgwNzI4MDQ2MzE@._V1_SX300.jpg",
          },
          {
            Title: "Spider Lilies",
            Year: "2007",
            imdbID: "tt0891457",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMjA1NjI4OTQ2MF5BMl5BanBnXkFtZTcwMjEyNzkzMg@@._V1_SX300.jpg",
          },
          {
            Title: "Spider in the Web",
            Year: "2019",
            imdbID: "tt7942736",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BNzcwMGU3MDAtYzEzZi00OWIyLTgzMDMtNGQ3NTY3OGE2ZDIwXkEyXkFqcGdeQXVyNDMzNDc4Mg@@._V1_SX300.jpg",
          },
          {
            Title: "The Spider Within: A Spider-Verse Story",
            Year: "2023",
            imdbID: "tt27369002",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZjQ5NTgxNTktYWU5Yy00ZDIzLWJiYmItMWIxOTc4NTgwYzRlXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg",
          },
          {
            Title: "The Girl and the Spider",
            Year: "2021",
            imdbID: "tt11967484",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZWRkZGQ5ZjUtNWE5Zi00ZjYyLWIxMmMtMjJjZWFjZGIyN2JlXkEyXkFqcGdeQXVyMTg5MDEyNw@@._V1_SX300.jpg",
          },
          {
            Title: "Spider-Plant Man",
            Year: "2005",
            imdbID: "tt0460946",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMjVkOTU5MGEtMmRjYy00ZjQwLTk2YzgtNzlmNTJiZWI5M2NjXkEyXkFqcGdeQXVyMzI2NTcxODU@._V1_SX300.jpg",
          },
          {
            Title: "Jack Black: Spider-Man",
            Year: "2002",
            imdbID: "tt0331527",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BZDhlMmNmMDMtZmQ2Zi00M2FlLTg2MjEtNjZjNGI3M2ZmZTc1XkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_SX300.jpg",
          },
        ],
        totalResults: "600",
        Response: "True",
      },
      getMovieDetail: vi.fn(),
    });
    (useSelectedMovie as Mock).mockReturnValue({
      selectedImdbID: "Spider in the Web",
    });
    (useMovieDetail as Mock).mockReturnValue({
      loading: false,
      response: {
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
      },
      getMovieDetail: vi.fn(),
    });

    // act
    render(<MovieListing />);

    // assert
    const filterParts = screen.getByPlaceholderText("Search Movies");
    expect(filterParts).toBeVisible();

    const listingParts = screen.getByText("600 RESULTS");
    expect(listingParts).toBeVisible();

    const nothingDetail = screen.queryByText(
      /Please select movie to view detail/
    );
    expect(nothingDetail).toBeNull();
    const movieDetailTitle = screen.getByText("Spider-Man: Far from Home");
    expect(movieDetailTitle).toBeVisible();
  });

  it("should show loading spinner when movies are being fetched", () => {
    // mock
    (useMovieSearch as Mock).mockReturnValue({
      loading: true,
      response: null,
      getMovieList: vi.fn(),
    });

    // act
    render(<MovieListing />);

    // assert
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
