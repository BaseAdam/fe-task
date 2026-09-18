import type { VatRate } from "../types/productSchema.ts"

const AMOUNT_PATTERN = /^\d+([.,]\d{1,2})?$/

export function isValidAmount(value: string): boolean {
  return AMOUNT_PATTERN.test(value.trim())
}

export function toNumber(value: string): number {
  return Number(value.trim().replace(",", "."))
}

function roundToCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

function recalculate(input: string, multiplier: number): string {
  if (input.trim() === "") return ""
  const amount = toNumber(input)
  return Number.isNaN(amount)
    ? ""
    : roundToCents(amount * multiplier).toFixed(2)
}

const vatMultiplier = (vatRate: VatRate) => 1 + Number(vatRate) / 100

// brutto = netto × (1 + VAT / 100)
export function grossFromNet(netInput: string, vatRate: VatRate): string {
  return recalculate(netInput, vatMultiplier(vatRate))
}

// netto = brutto / (1 + VAT / 100)
export function netFromGross(grossInput: string, vatRate: VatRate): string {
  return recalculate(grossInput, 1 / vatMultiplier(vatRate))
}
