export function quotationSubmissionSuccessMessage(email: string, customerConfirmationSent: boolean): string {
  const internalDeliveryMessage = "Your quotation request has been sent to info@bridgewax.com.";

  return customerConfirmationSent
    ? `${internalDeliveryMessage} A confirmation has also been sent to ${email}.`
    : internalDeliveryMessage;
}
