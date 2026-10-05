import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("renders the default title and message", () => {
    render(<ErrorState />);

    expect(
      screen.getByRole("heading", {
        name: "Something went wrong",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "We couldn't load the requested data. Please try again.",
      ),
    ).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    render(
      <ErrorState
        title="Unable to load students"
        message="Please try again later."
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Unable to load students",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please try again later."),
    ).toBeInTheDocument();
  });

  it("renders the retry button when onRetry is provided", () => {
    render(<ErrorState onRetry={jest.fn()} />);

    expect(
      screen.getByRole("button", {
        name: /try again/i,
      }),
    ).toBeInTheDocument();
  });

  it("calls onRetry when retry is clicked", async () => {
    const user = userEvent.setup();
    const handleRetry = jest.fn();

    render(<ErrorState onRetry={handleRetry} />);

    await user.click(
      screen.getByRole("button", {
        name: /try again/i,
      }),
    );

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("supports a custom retry label", () => {
    render(
      <ErrorState
        onRetry={jest.fn()}
        retryLabel="Reload Students"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Reload Students",
      }),
    ).toBeInTheDocument();
  });

  it("renders a custom icon", () => {
    render(
      <ErrorState
        icon={<span data-testid="custom-icon">Error</span>}
      />,
    );

    expect(
      screen.getByTestId("custom-icon"),
    ).toBeInTheDocument();
  });

  it("has alert role", () => {
    render(<ErrorState />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});