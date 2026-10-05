import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackButton from "./BackButton";

describe("BackButton", () => {
  it("renders with the default label", () => {
    render(<BackButton onClick={jest.fn()} />);

    expect(
      screen.getByRole("button", {
        name: "Back",
      }),
    ).toBeInTheDocument();
  });

  it("renders with a custom label", () => {
    render(
      <BackButton
        onClick={jest.fn()}
        label="Go Back"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Go Back",
      }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <BackButton onClick={handleClick} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Back",
      }),
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick only when the button is clicked", () => {
    const handleClick = jest.fn();

    render(
      <BackButton onClick={handleClick} />,
    );

    expect(handleClick).not.toHaveBeenCalled();
  });
});