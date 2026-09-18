import { describe, expect, it } from "vitest"

import { grossFromNet, isValidAmount, netFromGross, toNumber } from "./price.ts"

describe("isValidAmount", () => {
  it("accepts an amount with a dot, a comma or surrounding spaces", () => {
    expect(isValidAmount("1299.99")).toBe(true)
    expect(isValidAmount("1299,9")).toBe(true)
    expect(isValidAmount(" 100 ")).toBe(true)
  })

  it("rejects three decimal places, negatives, text and a blank string", () => {
    expect(isValidAmount("10.999")).toBe(false)
    expect(isValidAmount("-10")).toBe(false)
    expect(isValidAmount("abc")).toBe(false)
    expect(isValidAmount("")).toBe(false)
  })
})

describe("toNumber", () => {
  it("treats a comma as the decimal separator", () => {
    expect(toNumber("1299,99")).toBe(1299.99)
  })
})

describe("net and gross conversion", () => {
  it("adds VAT and rounds to whole cents", () => {
    expect(grossFromNet("100", "23")).toBe("123.00")
    expect(grossFromNet("99,99", "23")).toBe("122.99")
  })

  it("strips VAT back out of a gross price", () => {
    expect(netFromGross("123", "23")).toBe("100.00")
  })

  it("leaves the amount untouched at a 0% rate", () => {
    expect(grossFromNet("100", "0")).toBe("100.00")
  })

  it("returns an empty string instead of NaN for blank and invalid input", () => {
    expect(grossFromNet("", "23")).toBe("")
    expect(grossFromNet("abc", "23")).toBe("")
  })
})
