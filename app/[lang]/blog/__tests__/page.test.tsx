import { render, screen } from "@testing-library/react";
import BlogPage, { generateMetadata } from "@/app/[lang]/blog/page";
import { BlogContentSection } from "@/components/blog-content-section";

jest.mock("@/components/blog-content-section", () => ({
  BlogContentSection: jest.fn(() => (
    <div data-testid="blog-content-section" />
  )),
}));

const mockSection = BlogContentSection as jest.Mock;

function renderPage(
  searchParams: Record<string, string | string[] | undefined> = {},
) {
  return BlogPage({
    params: Promise.resolve({ lang: "en" }),
    searchParams: Promise.resolve(searchParams),
  });
}

describe("BlogPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_main_content_area", async () => {
    render(await renderPage());

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should_render_the_blog_content_section", async () => {
    render(await renderPage());

    expect(screen.getByTestId("blog-content-section")).toBeInTheDocument();
  });

  it("should_pass_the_parsed_page_to_the_content_section", async () => {
    render(await renderPage({ page: "2" }));

    expect(mockSection.mock.calls[0][0]).toMatchObject({ page: 2 });
  });

  it("should_default_to_page_1_when_no_search_params_are_set", async () => {
    render(await renderPage());

    expect(mockSection.mock.calls[0][0]).toMatchObject({ page: 1 });
  });

  it("should_provide_a_title_and_description_via_generateMetadata", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ lang: "en" }), searchParams: Promise.resolve({}) });

    expect(metadata.title).toBe("Blog");
    expect(metadata.description).toBeTruthy();
  });
});
