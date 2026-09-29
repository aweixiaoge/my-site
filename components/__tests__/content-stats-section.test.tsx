import { render, screen } from "@testing-library/react";
import { ContentStatsSection } from "@/components/content-stats-section";
import { en } from "@/lib/i18n/dictionaries/en";

const STATS = [
  { value: "99.99%", label: "Uptime across all regions" },
  { value: "12,000+", label: "Companies run on Meridian" },
  { value: "48ms", label: "Median API response time" },
];

describe("ContentStatsSection", () => {
  it("should_render_the_section_heading", () => {
    render(<ContentStatsSection dict={en} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Trusted in production",
      }),
    ).toBeInTheDocument();
  });

  it("should_render_the_section_description", () => {
    render(<ContentStatsSection dict={en} />);

    expect(
      screen.getByText("The numbers our customers hold us to."),
    ).toBeInTheDocument();
  });

  it("should_render_each_stat_value", () => {
    render(<ContentStatsSection dict={en} />);

    for (const { value } of STATS) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it("should_render_each_stat_label", () => {
    render(<ContentStatsSection dict={en} />);

    for (const { label } of STATS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
