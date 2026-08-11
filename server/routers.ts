import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sendCustomerConfirmationEmail, sendQuotationEmail } from "./quoteMailer";

const quoteProductSchema = z.object({
  name: z.string().trim().min(1).max(160),
  code: z.string().trim().min(1).max(80),
  categoryTitle: z.string().trim().min(1).max(100),
  rangeTitle: z.string().trim().max(100).optional(),
  quantity: z.number().int().min(1).max(100),
});

const quoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional(),
  requirements: z.string().trim().max(2_000).optional(),
  products: z.array(quoteProductSchema).min(1).max(50),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  quoteRequest: router({
    send: publicProcedure.input(quoteRequestSchema).mutation(async ({ input }) => {
      const result = await sendQuotationEmail(input);
      let customerConfirmationSent = true;

      try {
        await sendCustomerConfirmationEmail(input);
      } catch (error) {
        customerConfirmationSent = false;
        console.error("[Quotation] Customer confirmation email could not be sent after internal delivery", error);
      }

      return { success: true, messageId: result.messageId, customerConfirmationSent } as const;
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
