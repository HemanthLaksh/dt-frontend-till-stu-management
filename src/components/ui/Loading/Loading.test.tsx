import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders the default loading message", () => {
    render(<Loading />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders a custom loading message", () => {
    render(<Loading message="Loading students..." />);

    expect(
      screen.getByText("Loading students..."),
    ).toBeInTheDocument();
  });

  it("renders the loading status", () => {
    render(<Loading />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("supports different sizes", () => {
    const { rerender } = render(
      <Loading size="sm" />,
    );

    expect(
      screen.getByRole("status").querySelector("svg"),
    ).toHaveClass("h-4", "w-4");

    rerender(<Loading size="lg" />);

    expect(
      screen.getByRole("status").querySelector("svg"),
    ).toHaveClass("h-8", "w-8");
  });

  it("supports full screen mode", () => {
    render(<Loading fullScreen />);

    expect(screen.getByRole("status")).toHaveClass(
      "min-h-[300px]",
      "w-full",
    );
  });
});