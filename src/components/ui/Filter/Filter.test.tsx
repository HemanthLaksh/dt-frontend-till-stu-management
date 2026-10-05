import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

const options = [
  { label: "NEET PG", value: "neet-pg" },
  { label: "NEET SS", value: "neet-ss" },
  { label: "FMGE", value: "fmge" },
];

describe("Filter", () => {
  it("renders the filter label", () => {
    render(
      <Filter
        label="Course"
        value=""
        options={options}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Course")).toBeInTheDocument();
  });

  it("renders all filter options", () => {
    render(
      <Filter
        label="Course"
        value=""
        options={options}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByRole("option", { name: "NEET PG" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "NEET SS" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "FMGE" })).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Filter
        label="Course"
        value=""
        options={options}
        onChange={handleChange}
      />,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Course" }),
      "neet-pg",
    );

    expect(handleChange).toHaveBeenCalledWith("neet-pg");
  });

  it("shows the selected value", () => {
    render(
      <Filter
        label="Course"
        value="neet-ss"
        options={options}
        onChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Course" }),
    ).toHaveValue("neet-ss");
  });

  it("can be disabled", () => {
    render(
      <Filter
        label="Course"
        value=""
        options={options}
        onChange={jest.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Course" }),
    ).toBeDisabled();
  });
});