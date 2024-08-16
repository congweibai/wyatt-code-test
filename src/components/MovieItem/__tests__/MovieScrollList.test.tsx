import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MovieScrollList } from "../MovieScrollList";
import { OmdMovieItem } from "@/types";

vi.mock("@/contexts/selectedMovieContext/useSelectedMovie", () => ({
  useSelectedMovie: () => ({
    selectedImdbID: "selected-id",
    setSelectedImdbID: vi.fn(),
  }),
}));

describe("MovieScrollList", () => {
  it("should render the correct number of movie items", () => {
    // mock
    const movieItems: OmdMovieItem[] = [
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
    ];

    // act
    render(
      <MovieScrollList
        totalResults='2'
        movieItems={movieItems}
        loading={false}
        onLoadmore={vi.fn()}
      />
    );

    // assert
    expect(screen.getByText("2 RESULTS")).toBeInTheDocument();
    const movieOneTitle = screen.getByText("Spider in the Web");
    expect(movieOneTitle).toBeInTheDocument();
    const movieTwoTitle = screen.getByText(
      "The Spider Within: A Spider-Verse Story"
    );
    expect(movieTwoTitle).toBeInTheDocument();
  });

  it("should display a loading spinner when loading is true", () => {
    // mock
    render(
      <MovieScrollList
        totalResults='2'
        movieItems={[]}
        loading={true}
        onLoadmore={vi.fn()}
      />
    );

    // assert
    const spinningBar = screen.getByRole("progressbar");
    expect(spinningBar).toBeInTheDocument();
  });

  it("should trigger onLoadmore when scrolled to the bottom", () => {
    // mock
    const mockOnLoadmore = vi.fn();
    const movieItems: OmdMovieItem[] = [
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
    ];

    // act
    render(
      <MovieScrollList
        totalResults='5'
        movieItems={movieItems}
        loading={false}
        onLoadmore={mockOnLoadmore}
      />
    );

    const scrollableDiv = screen.getByTestId("scroll-container");

    fireEvent.scroll(scrollableDiv, {
      target: { scrollTop: 100 },
    });

    // assert
    expect(mockOnLoadmore).toHaveBeenCalled();
  });

  it("should not trigger onLoadmore when not scrolled to the bottom", () => {
    // mock
    const mockOnLoadmore = vi.fn();
    const movieItems: OmdMovieItem[] = [
      {
        Title: "The Spider Within: A Spider-Verse Story",
        Year: "2023",
        imdbID: "tt27369002",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZjQ5NTgxNTktYWU5Yy00ZDIzLWJiYmItMWIxOTc4NTgwYzRlXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg",
      },
    ];

    render(
      <MovieScrollList
        totalResults='30'
        movieItems={movieItems}
        loading={false}
        onLoadmore={mockOnLoadmore}
      />
    );

    const scrollableDiv = screen.getByTestId("scroll-container");

    // Simulate scrolling, but not to the bottom
    fireEvent.scroll(scrollableDiv!, {
      target: { scrollTop: -91 },
    });

    // Assert that onLoadmore is not triggered when not scrolled to the bottom
    expect(mockOnLoadmore).not.toHaveBeenCalled();
  });
});
