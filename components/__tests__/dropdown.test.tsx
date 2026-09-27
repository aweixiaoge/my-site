import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "@/components/dropdown";

const options = [
  { label: "English", value: "en" },
  { label: "Korean", value: "ko" },
];

describe("Dropdown", () => {
  it("should_show_the_selected_label_and_no_options_when_closed", () => {
    render(<Dropdown label="Language" options={options} value="en" onChange={() => {}} />);

    const trigger = screen.getByRole("button", { name: "Language" });

    expect(trigger).toHaveTextContent("English");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: "Korean" })).not.toBeInTheDocument();
  });

  it("should_show_every_option_when_the_trigger_is_clicked", () => {
    render(<Dropdown label="Language" options={options} value="en" onChange={() => {}} />);

    const trigger = screen.getByRole("button", { name: "Language" });
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Korean" })).toBeInTheDocument();
  });

  it("should_report_the_chosen_value_and_close_when_an_option_is_selected", () => {
    const onChange = jest.fn();
    render(<Dropdown label="Language" options={options} value="en" onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Language" }));
    fireEvent.click(screen.getByRole("button", { name: "Korean" }));

    expect(onChange).toHaveBeenCalledWith("ko");
    expect(screen.queryByRole("button", { name: "Korean" })).not.toBeInTheDocument();
  });

  it("should_anchor_the_menu_to_the_bottom_edge_of_its_container", () => {
    render(<Dropdown label="Language" options={options} value="en" onChange={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Language" }));

    const menu = screen.getByRole("list");
    expect(menu).toHaveClass("top-full");
    expect(menu.parentElement).toHaveClass("h-full");
  });

  it("should_close_and_return_focus_to_the_trigger_when_escape_is_pressed", () => {
    render(<Dropdown label="Language" options={options} value="en" onChange={() => {}} />);

    const trigger = screen.getByRole("button", { name: "Language" });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("button", { name: "Korean" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("should_close_when_a_click_lands_outside_the_dropdown", () => {
    render(<Dropdown label="Language" options={options} value="en" onChange={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Language" }));
    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole("button", { name: "Korean" })).not.toBeInTheDocument();
  });
});
