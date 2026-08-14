import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { getSeoMeta } from "./seo";

export function render(url: string) {
  const html = renderToString(
    <Router hook={() => [url, () => {}]}>
      <App />
    </Router>,
  );

  return {
    html,
    meta: getSeoMeta(url),
  };
}
