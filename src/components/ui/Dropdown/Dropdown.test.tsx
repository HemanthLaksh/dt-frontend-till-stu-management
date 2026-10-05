import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

const options = [
  {
    label: "Edit Profile",
    value: "edit-profile",
  },
  {
    label: "Change Password",
    value: "change-password",
  },
  {
    label: "Logout",
    value: "logout",
    danger: true,
  },
];

describe("Dropdown", () => {
  it("renders the trigger", () => {
    render(
      <Dropdown
        trigger="Hemanth"
        options={options}
        onSelect={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /Hemanth/i }),
    ).toBeInTheDocument();
  });

  it("opens the dropdown when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger="Hemanth"
        options={options}
        onSelect={jest.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Hemanth/i }),
    );

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", { name: "Edit Profile" }),
    ).toBeInTheDocument();
  });

  it("calls onSelect when an option is selected", async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();

    render(
      <Dropdown
        trigger="Hemanth"
        options={options}
        onSelect={handleSelect}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Hemanth/i }),
    );

    await user.click(
      screen.getByRole("menuitem", { name: "Edit Profile" }),
    );

    expect(handleSelect).toHaveBeenCalledWith("edit-profile");
  });

  it("closes after selecting an option", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger="Hemanth"
        options={options}
        onSelect={jest.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Hemanth/i }),
    );

    await user.click(
      screen.getByRole("menuitem", { name: "Logout" }),
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not select a disabled option", async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();

    render(
      <Dropdown
        trigger="Actions"
        options={[
          {
            label: "Edit",
            value: "edit",
            disabled: true,
          },
        ]}
        onSelect={handleSelect}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Actions/i }),
    );

    const option = screen.getByRole("menuitem", {
      name: "Edit",
    });

    expect(option).toBeDisabled();
  });

  it("can disable the trigger", () => {
    render(
      <Dropdown
        trigger="Actions"
        options={options}
        onSelect={jest.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole("button", { name: /Actions/i }),
    ).toBeDisabled();
  });
});