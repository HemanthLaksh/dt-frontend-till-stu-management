import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders badge content", () => {
    render(<Badge>Active</Badge>);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("uses the success variant", () => {
    render(<Badge variant="success">Active</Badge>);

    expect(screen.getByText("Active")).toHaveClass(
      "bg-green-50",
      "text-success",
    );
  });

  it("uses the warning variant", () => {
    render(<Badge variant="warning">Pending</Badge>);

    expect(screen.getByText("Pending")).toHaveClass(
      "bg-amber-50",
      "text-warning",
    );
  });

  it("uses the error variant", () => {
    render(<Badge variant="error">Failed</Badge>);

    expect(screen.getByText("Failed")).toHaveClass(
      "bg-red-50",
      "text-error",
    );
  });

  it("uses the info variant", () => {
    render(<Badge variant="info">NEET PG</Badge>);

    expect(screen.getByText("NEET PG")).toHaveClass(
      "bg-primary-light",
      "text-primary",
    );
  });

  it("uses neutral variant by default", () => {
    render(<Badge>Inactive</Badge>);

    expect(screen.getByText("Inactive")).toHaveClass(
      "bg-secondary-light",
      "text-text-secondary",
    );
  });
});