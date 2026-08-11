import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import superjson from "superjson";
import App from "./App";
import { trpc } from "./lib/trpc";
import { getSeoMeta, type SeoMeta } from "./seo";

export type SsrRenderResult = { html: string; meta: SeoMeta };

export async function render(url: string): Promise<SsrRenderResult> {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const trpcClient = trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })] });
  const queryIndex = url.indexOf("?");
  const ssrPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const ssrSearch = queryIndex === -1 ? "" : url.slice(queryIndex + 1);
  const meta = getSeoMeta(ssrPath);
  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router ssrPath={ssrPath} ssrSearch={ssrSearch}><App /></Router>
      </QueryClientProvider>
    </trpc.Provider>,
  );
  return { html, meta };
}
