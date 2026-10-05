import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  it("does not render when closed", () => {
    render(
      <Modal
        isOpen={false}
        onClose={jest.fn()}
        title="Student Details"
      >
        <p>Student information</p>
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="Student Details"
      >
        <p>Student information</p>
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Student Details",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Student information"),
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="Activate Student"
        description="Confirm student activation."
      >
        <p>Content</p>
      </Modal>,
    );

    expect(
      screen.getByText("Confirm student activation."),
    ).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Modal
        isOpen
        onClose={handleClose}
        title="Student Details"
      >
        <p>Content</p>
      </Modal>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Close modal",
      }),
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the overlay is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Modal
        isOpen
        onClose={handleClose}
        title="Student Details"
      >
        <p>Content</p>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");

    await user.click(dialog.parentElement!);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when overlay clicking is disabled", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Modal
        isOpen
        onClose={handleClose}
        title="Student Details"
        closeOnOverlayClick={false}
      >
        <p>Content</p>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");

    await user.click(dialog.parentElement!);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("renders different modal sizes", () => {
    const { rerender } = render(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="Student Details"
        size="sm"
      >
        <p>Content</p>
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toHaveClass("max-w-md");

    rerender(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="Student Details"
        size="xl"
      >
        <p>Content</p>
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toHaveClass("max-w-4xl");
  });
});