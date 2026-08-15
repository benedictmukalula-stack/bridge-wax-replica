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
});
