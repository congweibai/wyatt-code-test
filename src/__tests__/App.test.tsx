import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// To Test
import App from "../App";

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    //act
    render(<App />);
    const title = await screen.queryByText("Vite + React");

    // assert
    expect(title).toBeInTheDocument();
  });
});
