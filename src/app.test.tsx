/* eslint-disable check-file/filename-naming-convention */
import { render } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import App from "./App";
import { vi } from "vitest";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("App", () => {
  it("renders without crashing", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
  });
});
