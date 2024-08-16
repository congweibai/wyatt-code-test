import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import useScrollToBottom from "../useScrollToBottom";
import { describe, expect, it } from "vitest";

// mock
const ScrollComponent = ({ threshold }: { threshold: number }) => {
  const { containerRef, atBottom } = useScrollToBottom(threshold);

  return (
    <div>
      <div
        ref={containerRef}
        style={{ height: "100px", overflow: "auto" }}
        data-testid='container'
      >
        <div style={{ height: "600px" }}>Scrollable Content</div>
      </div>
      {atBottom && <div data-testid='at-bottom'>At bottom</div>}
    </div>
  );
};

describe("useScrollToBottom", () => {
  it("should detect when user scrolls to the bottom", async () => {
    // mock
    render(<ScrollComponent threshold={100} />);

    // act
    const scrollableDiv = screen.getByTestId("container");

    expect(screen.queryByTestId("at-bottom")).toBeNull();

    // Simulate scrolling, to the bottom
    fireEvent.scroll(scrollableDiv, {
      target: { scrollTop: -99 },
    });

    // assert
    await waitFor(() =>
      expect(screen.getByTestId("at-bottom")).toBeInTheDocument()
    );
  });

  it("should not detect as bottom if not scrolled to the threshold", async () => {
    // mock
    render(<ScrollComponent threshold={100} />);

    // act
    const scrollableDiv = screen.getByTestId("container");

    // Simulate scrolling, but not to the bottom
    fireEvent.scroll(scrollableDiv, {
      target: { scrollTop: -101 },
    });

    // assert
    await waitFor(() => expect(screen.queryByTestId("at-bottom")).toBeNull());
  });
});
