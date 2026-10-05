import { fireEvent, render, screen } from "@testing-library/react";
import DatePicker from "./DatePicker";

describe("DatePicker", () => {
  const defaultProps = {
    label: "From Date",
    value: "",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the label and placeholder", () => {
    render(<DatePicker {...defaultProps} />);

    expect(screen.getByText("From Date")).toBeInTheDocument();
    expect(screen.getByText("Select date")).toBeInTheDocument();
  });

  it("opens the calendar when clicked", () => {
    render(<DatePicker {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));

    expect(
      screen.getByText("Today"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("MO"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("TU"),
    ).toBeInTheDocument();
  });

  it("displays the selected date", () => {
    render(
      <DatePicker
        {...defaultProps}
        value="2026-10-15"
      />,
    );

    expect(
      screen.getByText("15 Oct 2026"),
    ).toBeInTheDocument();
  });

  it("calls onChange when a date is selected", () => {
    const onChange = jest.fn();

    render(
      <DatePicker
        {...defaultProps}
        onChange={onChange}
        value="2026-10-15"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /15/i,
      }),
    );

    // The selected date button is already rendered,
    // so selecting another date is tested below.
    fireEvent.click(
      screen.getByRole("button", {
        name: "20",
      }),
    );

    expect(onChange).toHaveBeenCalledWith(
      "2026-10-20",
    );
  });

  it("clears the selected date", () => {
    const onChange = jest.fn();

    render(
      <DatePicker
        {...defaultProps}
        value="2026-10-15"
        onChange={onChange}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /15 Oct 2026/i,
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Clear",
      }),
    );

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("supports minimum date", () => {
    render(
      <DatePicker
        {...defaultProps}
        minDate="2026-10-15"
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    const dateButton = screen.getByRole("button", {
      name: "10",
    });

    expect(dateButton).toBeDisabled();
  });

  it("allows dates on or after the minimum date", () => {
    const onChange = jest.fn();

    render(
      <DatePicker
        {...defaultProps}
        minDate="2026-10-15"
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(
      screen.getByRole("button", {
        name: "20",
      }),
    );

    expect(onChange).toHaveBeenCalledWith(
      "2026-10-20",
    );
  });

  it("can be disabled", () => {
    render(
      <DatePicker
        {...defaultProps}
        disabled
      />,
    );

    expect(
      screen.getByRole("button"),
    ).toBeDisabled();
  });

  it("closes the calendar when clicking outside", () => {
    render(
      <div>
        <DatePicker {...defaultProps} />
        <button>Outside</button>
      </div>,
    );

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(
      screen.getByText("Today"),
    ).toBeInTheDocument();

    fireEvent.mouseDown(
      screen.getByRole("button", {
        name: "Outside",
      }),
    );

    expect(
      screen.queryByText("Today"),
    ).not.toBeInTheDocument();
  });

  it("opens with the selected month and year", () => {
    render(
      <DatePicker
        {...defaultProps}
        value="2026-10-15"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /15 Oct 2026/i,
      }),
    );

    expect(
      screen.getByText("October"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("2026"),
    ).toBeInTheDocument();
  });
});