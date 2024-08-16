import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MovieFilterForm } from "../MovieFilterForm";
import userEvent from "@testing-library/user-event";

const mockHandleSearch = vi.fn();

describe("MovieFilterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form correctly", () => {
    render(<MovieFilterForm handleSearch={mockHandleSearch} />);

    const searchInput = screen.getByPlaceholderText("Search Movies");
    expect(searchInput).toBeInTheDocument();
    const yearInput = screen.getByRole("slider");
    expect(yearInput).toBeInTheDocument();
    const typeAnyInput = screen.getByLabelText("Any");
    expect(typeAnyInput).toBeInTheDocument();
    const typeMoviesInput = screen.getByLabelText("Movies");
    expect(typeMoviesInput).toBeInTheDocument();
    const typeSeriesInput = screen.getByLabelText("Series");
    expect(typeSeriesInput).toBeInTheDocument();
    const typeEpisodesInput = screen.getByLabelText("Episodes");
    expect(typeEpisodesInput).toBeInTheDocument();
  });

  it("should prevent form submission on Enter key press in input field", async () => {
    render(<MovieFilterForm handleSearch={mockHandleSearch} />);

    const input = screen.getByPlaceholderText("Search Movies");
    const user = userEvent.setup();
    await user.type(input, "Inception{enter}");

    expect(mockHandleSearch).not.toHaveBeenCalled();
  });

  it("should handleSearch with correct data on submit", async () => {
    render(<MovieFilterForm handleSearch={mockHandleSearch} />);

    const input = screen.getByPlaceholderText("Search Movies");
    const user = userEvent.setup();
    await user.type(input, "test movie");

    const typeMoviesInput = screen.getByLabelText("Movies");
    await user.click(typeMoviesInput);

    await user.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith({
        title: "test movie",
        type: "movie",
      });
    });
  });
});
