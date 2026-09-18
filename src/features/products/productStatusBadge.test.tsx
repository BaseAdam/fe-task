import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProductStatusBadge } from "./productStatusBadge"

const badgeText = (isAvailable: boolean, stockQuantity: number | null) =>
  render(
    <ProductStatusBadge
      isAvailable={isAvailable}
      stockQuantity={stockQuantity}
    />
  ).container.textContent

describe("ProductStatusBadge", () => {
  it("reads as unavailable when a limited product has nothing in stock", () => {
    expect(badgeText(true, 0)).toBe("Niedostępny")
  })

  it("reads as available while stock is left", () => {
    expect(badgeText(true, 5)).toBe("Dostępny")
  })

  it("ignores stock for a product that is not limited", () => {
    expect(badgeText(true, null)).toBe("Dostępny")
  })

  it("stays unavailable when the flag is off despite stock", () => {
    expect(badgeText(false, 9)).toBe("Niedostępny")
  })
})
