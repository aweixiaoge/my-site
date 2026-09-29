import { fireEvent, render, screen } from "@testing-library/react";
import { submitInquiry } from "@/app/[lang]/contact/actions";
import { ContactForm } from "@/components/contact-form";
import { en } from "@/lib/i18n/dictionaries/en";

jest.mock("@/app/[lang]/contact/actions", () => ({
  submitInquiry: jest.fn(),
}));

const mockSubmitInquiry = submitInquiry as jest.Mock;

const inquiry = {
  name: "Jane Cooper",
  email: "jane@company.com",
  subject: "Partnership enquiry",
  message: "We would like to hear more about Meridian.",
};

function typeInto(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
}

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmitInquiry.mockResolvedValue({ ok: true });
  });

  it("should_render_the_fields_and_button_from_the_design", () => {
    render(<ContactForm dict={en} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Message" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_placeholder_copy_from_the_design", () => {
    render(<ContactForm dict={en} />);

    expect(screen.getByPlaceholderText("Jane Cooper")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("jane@company.com"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Partnership enquiry"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("How can we help?")).toBeInTheDocument();
  });

  it("should_block_an_empty_submission_and_explain_what_is_missing", async () => {
    render(<ContactForm dict={en} />);

    submit();

    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a message.")).toBeInTheDocument();
    expect(mockSubmitInquiry).not.toHaveBeenCalled();
  });

  it("should_block_a_malformed_email_before_calling_the_server", async () => {
    render(<ContactForm dict={en} />);
    typeInto("Name", inquiry.name);
    typeInto("Email", "jane");
    typeInto("Message", inquiry.message);

    submit();

    expect(
      await screen.findByText("Please enter a valid email address."),
    ).toBeInTheDocument();
    expect(mockSubmitInquiry).not.toHaveBeenCalled();
  });

  it("should_send_the_inquiry_and_confirm_it_was_received", async () => {
    render(<ContactForm dict={en} />);
    typeInto("Name", inquiry.name);
    typeInto("Email", inquiry.email);
    typeInto("Subject", inquiry.subject);
    typeInto("Message", inquiry.message);

    submit();

    expect(await screen.findByRole("status")).toHaveTextContent(
      "we will get back to you within one business day",
    );
    expect(mockSubmitInquiry).toHaveBeenCalledWith(inquiry);
  });

  it("should_clear_the_fields_once_the_inquiry_is_sent", async () => {
    render(<ContactForm dict={en} />);
    typeInto("Name", inquiry.name);
    typeInto("Email", inquiry.email);
    typeInto("Message", inquiry.message);

    submit();

    await screen.findByRole("status");
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("should_keep_the_typed_values_when_the_write_fails", async () => {
    mockSubmitInquiry.mockResolvedValue({
      ok: false,
      error: "We could not send your message.",
    });
    render(<ContactForm dict={en} />);
    typeInto("Name", inquiry.name);
    typeInto("Email", inquiry.email);
    typeInto("Message", inquiry.message);

    submit();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "We could not send your message.",
    );
    expect(screen.getByLabelText("Name")).toHaveValue(inquiry.name);
  });
});
