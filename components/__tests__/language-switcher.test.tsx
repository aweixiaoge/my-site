import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/language-switcher";

const languages = [
  { label: "English", value: "en" },
  { label: "Korean", value: "ko" },
];

describe("LanguageSwitcher", () => {
  it("should_show_the_default_language_when_rendered", () => {
    render(<LanguageSwitcher languages={languages} />);

    expect(screen.getByRole("button", { name: "Language" })).toHaveTextContent("English");
  });

  it("should_show_the_chosen_language_after_a_selection", () => {
    render(<LanguageSwitcher languages={languages} />);

    fireEvent.click(screen.getByRole("button", { name: "Language" }));
    fireEvent.click(screen.getByRole("button", { name: "Korean" }));

    expect(screen.getByRole("button", { name: "Language" })).toHaveTextContent("Korean");
  });
});
