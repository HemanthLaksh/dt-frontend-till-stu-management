import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search", () => {
  it("renders with the default placeholder", () => {
    render(<Search value="" onChange={jest.fn()} />);

    expect(
      screen.getByRole("searchbox", { name: "Search..." }),
    ).toBeInTheDocument();
  });

  it("renders a custom placeholder", () => {
    render(
      <Search
        value=""
        onChange={jest.fn()}
        placeholder="Search students..."
      />,
    );

    expect(
      screen.getByRole("searchbox", {
        name: "Search students...",
      }),
    ).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Search
        value=""
        onChange={handleChange}
      />,
    );

    const searchInput = screen.getByRole("searchbox");

    await user.type(searchInput, "John");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith("n");
  });

  it("shows the clear button when a value exists", () => {
    render(
      <Search
        value="John"
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument();
  });

  it("clears the search value when clear is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Search
        value="John"
        onChange={handleChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Clear search",
      }),
    );

    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("can be disabled", () => {
    render(
      <Search
        value=""
        onChange={jest.fn()}
        disabled
      />,
    );

    expect(screen.getByRole("searchbox")).toBeDisabled();
  });
});