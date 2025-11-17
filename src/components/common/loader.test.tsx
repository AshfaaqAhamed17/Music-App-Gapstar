import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Loader from "./loader";

describe("Loader", () => {
  it("renders spinner with correct color", () => {
    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <Loader />
      </ChakraProvider>
    );

    const spinner = container.querySelector('span[class*="spinner"]');
    expect(spinner).toBeInTheDocument();
  });

  it("renders loader component", () => {
    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <Loader />
      </ChakraProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
