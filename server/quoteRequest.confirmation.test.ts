import type { TrpcContext } from "./_core/context";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendQuotationEmailMock, sendCustomerConfirmationEmailMock } = vi.hoisted(() => ({
  sendQuotationEmailMock: vi.fn(),
  sendCustomerConfirmationEmailMock: vi.fn(),
}));

vi.mock("./quoteMailer", () => ({
  sendQuotationEmail: sendQuotationEmailMock,
  sendCustomerConfirmationEmail: sendCustomerConfirmationEmailMock,
}));

import { appRouter } from "./routers";

const request = {
  name: "Sample Customer",
  email: "customer@example.com",
  company: "Sample Mining Ltd",
  products: [{ name: "End-Suction Centrifugal Pump", code: "BW-WP-001", categoryTitle: "Water Pumps", quantity: 1 }],
};

function createContext(): TrpcContext {
  return {
    user: null,
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("quoteRequest.send customer confirmation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sendQuotationEmailMock.mockResolvedValue({ messageId: "internal-message-id" });
    sendCustomerConfirmationEmailMock.mockResolvedValue({ messageId: "customer-message-id" });
  });

  it("reports confirmation success only after the internal quotation request is accepted", async () => {
    const result = await appRouter.createCaller(createContext()).quoteRequest.send(request);

    expect(sendQuotationEmailMock).toHaveBeenCalledWith(request);
    expect(sendCustomerConfirmationEmailMock).toHaveBeenCalledWith(request);
    expect(result).toEqual({
      success: true,
      messageId: "internal-message-id",
      customerConfirmationSent: true,
    });
  });

  it("preserves the internal quotation success if only the customer confirmation fails", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    sendCustomerConfirmationEmailMock.mockRejectedValue(new Error("Customer inbox unavailable"));

    const result = await appRouter.createCaller(createContext()).quoteRequest.send(request);

    expect(result).toEqual({
      success: true,
      messageId: "internal-message-id",
      customerConfirmationSent: false,
    });
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
