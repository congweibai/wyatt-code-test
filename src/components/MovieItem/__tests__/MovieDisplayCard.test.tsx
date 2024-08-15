import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MovieDisplayCard } from "../index";
import { OmdMovieItem } from "@/types";
import userEvent from "@testing-library/user-event";

const mockMovie: OmdMovieItem = {
  Title: "The Matrix",
  Year: "1999",
  imdbID: "tt0133093",
  Type: "movie",
  Poster: "https://via.placeholder.com/70",
};

describe("MovieDisplayCard", () => {
  it("should render the movie information correctly", () => {
    // act
    render(<MovieDisplayCard movieItem={mockMovie} selected={false} />);

    const poster = screen.getByAltText("The Matrix's poster");

    // assert
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", mockMovie.Poster);
    expect(screen.getByText("The Matrix")).toBeInTheDocument();
    expect(screen.getByText("1999")).toBeInTheDocument();
  });

  it("should apply selected background color when selected is true", () => {
    // act
    render(<MovieDisplayCard movieItem={mockMovie} selected={true} />);

    const card = screen.getByTestId("movie-display-card");

    // assert
    expect(card).toHaveStyle("background-color: #e8e8e8");
  });

  it("should not apply selected background color when selected is false", () => {
    // act
    render(<MovieDisplayCard movieItem={mockMovie} selected={false} />);

    const card = screen.getByTestId("movie-display-card");

    // assert
    expect(card).not.toHaveStyle("background-color: #e8e8e8");
  });

  it("should call the onClick handler when the card is clicked", async () => {
    // mock
    const mockHandleClick = vi.fn();

    // act
    render(
      <MovieDisplayCard
        movieItem={mockMovie}
        selected={false}
        onClick={mockHandleClick}
      />
    );
    const user = userEvent.setup();
    const poster = screen.getByAltText("The Matrix's poster");
    user.click(poster);

    // assert
    await waitFor(() => expect(mockHandleClick).toHaveBeenCalledTimes(1));
  });
});
