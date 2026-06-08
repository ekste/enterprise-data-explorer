import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerGridControls } from "./CustomerGridControls";

describe("CustomerGridControls", () => {
  it("renders the result count and calls filter change handlers", async () => {
    const user = userEvent.setup();
    const onSearchTermChange = vi.fn();
    const onStatusFilterChange = vi.fn();

    render(
      <CustomerGridControls
        searchTerm=""
        statusFilter="all"
        filteredCount={1}
        totalCount={5}
        onSearchTermChange={onSearchTermChange}
        onStatusFilterChange={onStatusFilterChange}
      />,
    );

    expect(screen.getByText("Showing 1 of 5 customers")).toBeInTheDocument();

    await user.type(screen.getByRole("searchbox", { name: /search/i }), "acme");

    expect(onSearchTermChange).toHaveBeenCalled();

    await user.selectOptions(
      screen.getByRole("combobox", { name: /status/i }),
      "active",
    );

    expect(onStatusFilterChange).toHaveBeenCalledWith("active");
  });
});