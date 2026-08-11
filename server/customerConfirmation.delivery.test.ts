import { beforeEach, describe, expect, it, vi } from "vitest";

const { createTransportMock, sendMailMock } = vi.hoisted(() => {
  const sendMailMock = vi.fn();
  const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));
  return { createTransportMock, sendMailMock };
});

vi.mock("nodemailer", () => ({
  default: { createTransport: createTransportMock },
}));

import { sendCustomerConfirmationEmail } from "./quoteMailer";

describe("sendCustomerConfirmationEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMTP_HOST = "mail.bridgewax.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USERNAME = "info@bridgewax.com";
    process.env.SMTP_PASSWORD = "test-password";
    process.env.SMTP_FROM = "info@bridgewax.com";
    process.env.SMTP_RECIPIENT = "info@bridgewax.com";
    sendMailMock.mockResolvedValue({
      accepted: ["customer@example.com"],
      messageId: "confirmation-message-id",
    });
  });

  it("sends the confirmation only to the submitted customer email after a quotation request", async () => {
    await expect(
      sendCustomerConfirmationEmail({
        name: "Sample Customer",
        email: "Customer@Example.com",
        products: [{ name: "End-Suction Centrifugal Pump", code: "BW-WP-001", categoryTitle: "Water Pumps", quantity: 2 }],
      }),
    ).resolves.toEqual({ messageId: "confirmation-message-id" });

    expect(createTransportMock).toHaveBeenCalledWith(expect.objectContaining({
      host: "mail.bridgewax.com",
      port: 587,
      secure: false,
      requireTLS: true,
    }));
    expect(sendMailMock).toHaveBeenCalledWith(expect.objectContaining({
      from: "info@bridgewax.com",
      to: "Customer@Example.com",
      replyTo: "info@bridgewax.com",
      subject: "We received your Bridge Wax quotation request",
      text: expect.stringContaining("BW-WP-001"),
    }));
  });
});
