import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(
      <Card>
        <p>Student information</p>
      </Card>,
    );

    expect(
      screen.getByText("Student information"),
    ).toBeInTheDocument();
  });

  it("renders a title", () => {
    render(
      <Card title="Student Details">
        <p>Student information</p>
      </Card>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Student Details",
      }),
    ).toBeInTheDocument();
  });

  it("renders a description", () => {
    render(
      <Card
        title="Student Details"
        description="View student information."
      >
        <p>Student information</p>
      </Card>,
    );

    expect(
      screen.getByText("View student information."),
    ).toBeInTheDocument();
  });

  it("renders title and description together", () => {
    render(
      <Card
        title="Orders"
        description="View recent orders."
      >
        <p>Order list</p>
      </Card>,
    );

    expect(
      screen.getByRole("heading", { name: "Orders" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("View recent orders."),
    ).toBeInTheDocument();

    expect(screen.getByText("Order list")).toBeInTheDocument();
  });

  it("accepts custom class names", () => {
    render(
      <Card className="max-w-2xl">
        <p>Content</p>
      </Card>,
    );

    expect(screen.getByText("Content").parentElement).toHaveClass(
      "p-5",
    );

    expect(
      screen.getByText("Content").parentElement?.parentElement,
    ).toHaveClass("max-w-2xl");
  });
});