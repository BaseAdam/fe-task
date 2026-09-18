import { describe, expect, it } from "vitest"

import { clampPage, getPageCount, getPageRange } from "./pagination.ts"

describe("getPageCount", () => {
  it("returns a single page for an empty catalogue", () => {
    expect(getPageCount(0)).toBe(1)
  })

  it("rounds a partial page up", () => {
    expect(getPageCount(5)).toBe(1)
    expect(getPageCount(6)).toBe(2)
  })
})

describe("clampPage", () => {
  it("clamps an out-of-range page number", () => {
    expect(clampPage(0, 3)).toBe(1)
    expect(clampPage(99, 3)).toBe(3)
    expect(clampPage(2, 3)).toBe(2)
  })
})

describe("getPageRange", () => {
  it("lists every page when they fit without gaps", () => {
    expect(getPageRange(1, 3)).toEqual([1, 2, 3])
  })

  it("inserts an ellipsis on both sides of the block around the current page", () => {
    expect(getPageRange(5, 9)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 9])
  })

  it("does not duplicate the first or the last page", () => {
    expect(getPageRange(1, 1)).toEqual([1])
    expect(getPageRange(2, 2)).toEqual([1, 2])
  })
})
