import { render, screen } from "@testing-library/react";
import { ContactInfoSection } from "@/components/contact-info-section";
import { getContactInfo } from "@/sanity/contact-info";

jest.mock("@/sanity/contact-info", () => ({
  getContactInfo: jest.fn(),
}));

const mockGetContactInfo = getContactInfo as jest.Mock;

const contactInfo = {
  email: "hello@meridian.com",
  phone: "+1 (415) 555-0134",
  whatsapp: "+86 13556785648",
  address: "100 Market Street, Suite 400, San Francisco, CA 94105",
  youtube: "https://youtube.com/@meridian",
  facebook: "https://facebook.com/meridian",
  instagram: "https://instagram.com/meridian",
};

async function renderSection() {
  return render(await ContactInfoSection());
}

describe("ContactInfoSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContactInfo.mockResolvedValue(contactInfo);
  });

  it("should_render_one_card_per_contact_field_from_sanity", async () => {
    const { container } = await renderSection();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText(contactInfo.email)).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText(contactInfo.phone)).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText(contactInfo.whatsapp)).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText(contactInfo.address)).toBeInTheDocument();
    expect(container.querySelectorAll("a[href^='mailto']")).toHaveLength(1);
  });

  it("should_link_the_email_address_as_a_mailto_url", async () => {
    await renderSection();

    expect(
      screen.getByRole("link", { name: contactInfo.email }),
    ).toHaveAttribute("href", `mailto:${contactInfo.email}`);
  });

  it("should_skip_cards_for_fields_missing_in_sanity", async () => {
    mockGetContactInfo.mockResolvedValue({ email: contactInfo.email });

    await renderSection();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.queryByText("Phone")).not.toBeInTheDocument();
    expect(screen.queryByText("WhatsApp")).not.toBeInTheDocument();
    expect(screen.queryByText("Address")).not.toBeInTheDocument();
  });

  it("should_skip_cards_for_fields_that_are_blank_in_sanity", async () => {
    mockGetContactInfo.mockResolvedValue({
      email: contactInfo.email,
      phone: "   ",
    });

    await renderSection();

    expect(screen.queryByText("Phone")).not.toBeInTheDocument();
  });

  it("should_link_every_social_profile_from_sanity", async () => {
    await renderSection();

    expect(screen.getByRole("link", { name: "YouTube" })).toHaveAttribute(
      "href",
      contactInfo.youtube,
    );
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      contactInfo.facebook,
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      contactInfo.instagram,
    );
  });

  it("should_open_social_profiles_in_a_new_tab", async () => {
    await renderSection();

    const youtube = screen.getByRole("link", { name: "YouTube" });

    expect(youtube).toHaveAttribute("target", "_blank");
    expect(youtube).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should_skip_social_links_that_are_not_set_in_sanity", async () => {
    mockGetContactInfo.mockResolvedValue({
      ...contactInfo,
      facebook: null,
      instagram: "",
    });

    await renderSection();

    expect(screen.getByRole("link", { name: "YouTube" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Facebook" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Instagram" }),
    ).not.toBeInTheDocument();
  });

  it("should_render_nothing_when_no_contact_info_document_exists", async () => {
    mockGetContactInfo.mockResolvedValue(null);

    const { container } = await renderSection();

    expect(container).toBeEmptyDOMElement();
  });
});
