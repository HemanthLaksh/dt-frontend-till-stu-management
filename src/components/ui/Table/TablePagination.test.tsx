import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TablePagination from "./TablePagination";

describe("TablePagination", () => {
  it("displays the current page and total pages", () => {
    render(
      <TablePagination
        currentPage={2}
        totalPages={10}
        onPageChange={jest.fn()}
      />,
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("calls onPageChange with the previous page", async () => {
    const user = userEvent.setup();
    const handlePageChange = jest.fn();

    render(
      <TablePagination
        currentPage={3}
        totalPages={10}
        onPageChange={handlePageChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Previous page",
      }),
    );

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with the next page", async () => {
    const user = userEvent.setup();
    const handlePageChange = jest.fn();

    render(
      <TablePagination
        currentPage={3}
        totalPages={10}
        onPageChange={handlePageChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Next page",
      }),
    );

    expect(handlePageChange).toHaveBeenCalledWith(4);
  });

  it("disables previous button on the first page", () => {
    render(
      <TablePagination
        currentPage={1}
        totalPages={10}
        onPageChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Previous page",
      }),
    ).toBeDisabled();
  });

  it("disables next button on the last page", () => {
    render(
      <TablePagination
        currentPage={10}
        totalPages={10}
        onPageChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Next page",
      }),
    ).toBeDisabled();
  });

  it("disables both buttons when disabled", () => {
    render(
      <TablePagination
        currentPage={5}
        totalPages={10}
        onPageChange={jest.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Previous page",
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "Next page",
      }),
    ).toBeDisabled();
  });
});