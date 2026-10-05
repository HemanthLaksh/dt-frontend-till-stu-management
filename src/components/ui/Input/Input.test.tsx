import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  it("renders with a label", () => {
    render(<Input label="Student Name" />);

    expect(
      screen.getByRole("textbox", { name: "Student Name" }),
    ).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    render(
      <Input
        label="Student Name"
        placeholder="Enter student name"
      />,
    );

    expect(
      screen.getByPlaceholderText("Enter student name"),
    ).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(<Input label="Student Name" required />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();

    render(<Input label="Student Name" />);

    const input = screen.getByRole("textbox", {
      name: "Student Name",
    });

    await user.type(input, "John");

    expect(input).toHaveValue("John");
  });

  it("shows an error message", () => {
    render(
      <Input
        label="Email"
        error="Please enter a valid email"
      />,
    );

    expect(
      screen.getByText("Please enter a valid email"),
    ).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Input label="Student ID" disabled />);

    expect(
      screen.getByRole("textbox", { name: "Student ID" }),
    ).toBeDisabled();
  });
});