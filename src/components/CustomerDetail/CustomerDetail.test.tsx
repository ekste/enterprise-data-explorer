import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomerDetail } from "./CustomerDetail/CustomerDetail";

describe("CustomerDetail", () => {
  it("does not render customer details when no customer is selected", () => {
    render(<CustomerDetail customer={undefined} onClose={vi.fn()} />);

    expect(
      screen.queryByRole("region", { name: /customer details/i }),
    ).not.toBeInTheDocument();
  });
});
