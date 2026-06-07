import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomersPage } from "./CustomersPage";

describe("CustomersPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("filters customers by search term", async () => {
    const user = userEvent.setup();

    render(<CustomersPage />);

    await user.type(
      screen.getByRole("searchbox", { name: /search/i }),
      "finance",
    );

    expect(screen.getByText("Northstar Finance")).toBeInTheDocument();
    expect(screen.queryByText("Acme Corporation")).not.toBeInTheDocument();
  });

  it("shows customer details when a row is selected", async () => {
    const user = userEvent.setup();

    render(<CustomersPage />);

    await user.click(screen.getByText("Acme Corporation"));

    expect(screen.getByText("Sarah Mitchell")).toBeInTheDocument();
  });
});
