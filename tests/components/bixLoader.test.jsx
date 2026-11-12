import { act, render, screen } from "@testing-library/react";
import { Link, Outlet, RouterProvider, createMemoryRouter } from "react-router";
import { expect, it } from "vitest";
import BixLoader from "../../src/components/mascot/BixLoader";
import RouteLoading from "../../src/components/RouteLoading";

it("announces what Bix is fetching, with Bix hidden from assistive technology", () => {
  const { container } = render(<BixLoader message="Finding your progress" />);
  const status = screen.getByRole("status");
  expect(status.textContent).toMatch(/Finding your progress/);
  const bix = container.querySelector(".mascot");
  expect(bix.getAttribute("aria-hidden")).toBe("true");
  expect(bix.tabIndex).toBe(-1);
});

it("has a friendly default message", () => {
  render(<BixLoader />);
  expect(screen.getByRole("status").textContent).toMatch(/Bix is getting things ready/);
});

it("covers the screen while a lazy page's code loads, then gets out of the way", async () => {
  let finish;
  const router = createMemoryRouter([
    {
      path: "/",
      element: <><Outlet /><RouteLoading /></>,
      children: [
        { index: true, element: <Link to="/later">Go</Link> },
        {
          path: "later",
          lazy: () => new Promise((resolve) => { finish = () => resolve({ Component: () => <p>Arrived</p> }); }),
        },
      ],
    },
  ]);
  render(<RouterProvider router={router} />);
  expect(screen.queryByRole("status")).toBeNull();

  await act(async () => { screen.getByRole("link", { name: "Go" }).click(); });
  expect(screen.getByRole("status").textContent).toMatch(/Off we go/);

  await act(async () => { finish(); });
  expect(await screen.findByText("Arrived")).toBeTruthy();
  expect(screen.queryByRole("status")).toBeNull();
});
