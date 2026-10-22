import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it } from "vitest";
import manifest from "../../src/assets/science/manifest.json";
import Credits from "../../src/pages/credits/Credits";
import ScienceCredit from "../../src/components/challenge/ScienceCredit";
import { LICENCES } from "../../src/data/thirdPartyNotices";
import historyManifest from "../../src/assets/history/manifest.json";

it("lists every manifest source with its licence, link and full text", () => {
  const { container } = render(<MemoryRouter><Credits /></MemoryRouter>);
  for (const [id, source] of Object.entries(manifest.sources)) {
    const card = container.querySelector(`li[id="${id}"]`);
    expect(card, id).not.toBeNull();
    const link = within(card).getByRole("link", { name: LICENCES[source.license].name });
    expect(link.getAttribute("href")).toBe(LICENCES[source.license].url);
    expect([...card.querySelectorAll("pre")].at(-1)?.textContent.length, id).toBeGreaterThan(500);
    if (source.attribution.includes("Adapted:")) expect(card.textContent).toMatch(/Adapted:/);
  }
  expect(container.textContent).toMatch(/This product includes software developed by Ivan Vulović/);
});

it("CC BY captions link the licence and the credits page", () => {
  render(<MemoryRouter><ScienceCredit>Bones: BodyParts3D © DBCLS, CC BY 4.0, adapted</ScienceCredit></MemoryRouter>);
  expect(screen.getByRole("link", { name: "CC BY 4.0 licence" }).getAttribute("href")).toBe("https://creativecommons.org/licenses/by/4.0/");
  expect(screen.getByRole("link", { name: "All credits" }).getAttribute("href")).toBe("/credits");
});

it("lists every History picture with its museum, licence and source link", () => {
  const { container } = render(<MemoryRouter><Credits /></MemoryRouter>);
  for (const [id, image] of Object.entries(historyManifest.images)) {
    const card = container.querySelector(`li[id="history-${id}"]`);
    expect(card, id).not.toBeNull();
    expect(card.textContent).toContain(image.title);
    expect(card.textContent).toContain(image.institution);
    expect(within(card).getByRole("link", { name: LICENCES[image.licence].name }).getAttribute("href")).toBe(LICENCES[image.licence].url);
    expect(within(card).getByRole("link", { name: "Source" }).getAttribute("href")).toBe(image.objectUrl);
  }
});

it("credits Solar System Scope for the Solar System textures under CC BY 4.0", () => {
  const { container } = render(<MemoryRouter><Credits /></MemoryRouter>);
  const card = container.querySelector('li[id="solar-system-scope"]');
  expect(card).not.toBeNull();
  expect(card.textContent).toMatch(/Solar System Scope/);
  const licence = within(card).getByRole("link", { name: LICENCES["CC-BY-4.0"].name });
  expect(licence.getAttribute("href")).toBe("https://creativecommons.org/licenses/by/4.0/");
});
