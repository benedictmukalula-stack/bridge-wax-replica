import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { afterEach, describe, expect, it } from "vitest";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter social placeholders", () => {
  afterEach(() => cleanup());

  it("renders all requested accessible social profile placeholders without publishing destination URLs", () => {
    render(<Router><SiteFooter /></Router>);

    const socialProfiles = screen.getByRole("group", { name: "Bridge Wax social profiles" });
    expect(socialProfiles).toBeTruthy();

    ["Facebook", "X / Twitter", "Instagram", "TikTok", "LinkedIn", "YouTube"].forEach((label) => {
      const link = screen.getByRole("link", { name: `${label} profile coming soon` });
      expect(link.getAttribute("aria-disabled")).toBe("true");
      expect(link.getAttribute("data-social-placeholder")).toBe(label);
    });
  });

  it("renders the Knowledge Camp Business Solutions signature with direct contact links", () => {
    render(<Router><SiteFooter /></Router>);

    expect(screen.getByText("Knowledge Camp Business Solutions")).toBeTruthy();
    expect(screen.getByRole("link", { name: "+260 779 721 772" }).getAttribute("href")).toBe("tel:+260779721772");
    expect(screen.getByRole("link", { name: "info@knowledgecampglobal.co.za" }).getAttribute("href")).toBe("mailto:info@knowledgecampglobal.co.za");
  });
});
