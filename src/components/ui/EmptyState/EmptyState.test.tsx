import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders the default title and message", () => {
    render(<EmptyState />);

    expect(
      screen.getByRole("heading", {
        name: "No data found",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "There is no data available to display.",
      ),
    ).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    render(
      <EmptyState
        title="No students found"
        message="No students match your filters."
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "No students found",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("No students match your filters."),
    ).toBeInTheDocument();
  });

  it("renders a custom icon", () => {
    render(
      <EmptyState
        icon={<span data-testid="custom-icon">Icon</span>}
      />,
    );

    expect(
      screen.getByTestId("custom-icon"),
    ).toBeInTheDocument();
  });

  it("renders an action when provided", () => {
    render(
      <EmptyState
        title="No students found"
        action={
          <button type="button">
            Clear Filters
          </button>
        }
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Clear Filters",
      }),
    ).toBeInTheDocument();
  });

  it("has status role", () => {
    render(<EmptyState />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});