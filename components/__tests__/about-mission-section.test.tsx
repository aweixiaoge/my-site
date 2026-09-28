import { render, screen } from "@testing-library/react";
import { AboutMissionSection } from "@/components/about-mission-section";

const VALUES = [
  { title: "Customer First", description: "Starts with the people using it." },
  { title: "Build in the Open", description: "Roadmap and docs are public." },
  { title: "Trust by Default", description: "Secure and private by design." },
  { title: "Think Long Term", description: "We plan in decades, not quarters." },
];

describe("AboutMissionSection", () => {
  it("should_render_the_section_heading", () => {
    render(<AboutMissionSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Our Mission" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_mission_statement", () => {
    render(<AboutMissionSection />);

    expect(
      screen.getByText(
        "Make enterprise software feel as simple as the tools people choose for themselves.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_the_supporting_copy", () => {
    render(<AboutMissionSection />);

    expect(
      screen.getByText(
        "We remove the friction between a good idea and a shipped product, for every team, at every size.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_a_card_for_every_value", () => {
    render(<AboutMissionSection />);

    for (const value of VALUES) {
      expect(
        screen.getByRole("heading", { level: 3, name: value.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(value.description)).toBeInTheDocument();
    }
  });

  it("should_render_an_icon_for_every_value", () => {
    const { container } = render(<AboutMissionSection />);

    expect(container.querySelectorAll("svg")).toHaveLength(VALUES.length);
  });
});
