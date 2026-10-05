import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

const options = [
  { value: "neet-pg", label: "NEET PG" },
  { value: "neet-ss", label: "NEET SS" },
  { value: "fmge", label: "FMGE" },
];

describe("Select", () => {
  it("renders the label", () => {
    render(
      <Select
        label="Course"
        value=""
        options={options}
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.getByText("Course"),
    ).toBeInTheDocument();
  });

  it("renders the placeholder when no option is selected", () => {
    render(
      <Select
        value=""
        options={options}
        placeholder="Select Course"
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Select Course",
      }),
    ).toBeInTheDocument();
  });

  it("opens the options when clicked", async () => {
    const user = userEvent.setup();

    render(
      <Select
        label="Course"
        value=""
        options={options}
        onChange={jest.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button"),
    );

    expect(
      screen.getByRole("listbox"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "NEET PG",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "NEET SS",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "FMGE",
      }),
    ).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Select
        label="Course"
        value=""
        options={options}
        onChange={handleChange}
      />,
    );

    await user.click(
      screen.getByRole("button"),
    );

    await user.click(
      screen.getByRole("option", {
        name: "NEET PG",
      }),
    );

    expect(handleChange).toHaveBeenCalledWith(
      "neet-pg",
    );
  });

  it("closes the dropdown after selecting an option", async () => {
    const user = userEvent.setup();

    render(
      <Select
        value=""
        options={options}
        onChange={jest.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button"),
    );

    await user.click(
      screen.getByRole("option", {
        name: "NEET SS",
      }),
    );

    expect(
      screen.queryByRole("listbox"),
    ).not.toBeInTheDocument();
  });

  it("displays the selected option", () => {
    render(
      <Select
        value="fmge"
        options={options}
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "FMGE",
      }),
    ).toBeInTheDocument();
  });

  it("shows no options message when options are empty", async () => {
    const user = userEvent.setup();

    render(
      <Select
        value=""
        options={[]}
        onChange={jest.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button"),
    );

    expect(
      screen.getByText("No options available"),
    ).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(
      <Select
        value=""
        options={options}
        onChange={jest.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole("button"),
    ).toBeDisabled();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Select
          value=""
          options={options}
          onChange={jest.fn()}
        />

        <button type="button">
          Outside
        </button>
      </div>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Select an option",
      }),
    );

    expect(
      screen.getByRole("listbox"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Outside",
      }),
    );

    expect(
      screen.queryByRole("listbox"),
    ).not.toBeInTheDocument();
  });
});