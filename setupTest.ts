import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Any global setup can go here
afterEach(() => {
  cleanup();
});
