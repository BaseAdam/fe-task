import type { Currency, ProductSchema } from "../types/productSchema.ts"

const amountFormat = new Intl.NumberFormat("pl-PL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatPrice(amount: number, currency: Currency): string {
  return `${amountFormat.format(amount)} ${currency}`
}

export function formatStock({
  isLimited,
  stockQuantity,
}: Pick<ProductSchema, "isLimited" | "stockQuantity">): string {
  return isLimited && stockQuantity !== null ? String(stockQuantity) : "—"
}

const pluralRules = new Intl.PluralRules("pl-PL")

const PRODUCT_WORD: Record<Intl.LDMLPluralRule, string> = {
  zero: "produktów",
  one: "produkt",
  two: "produkty",
  few: "produkty",
  many: "produktów",
  other: "produktu",
}

export function formatProductCount(count: number): string {
  return `${count} ${PRODUCT_WORD[pluralRules.select(count)]}`
}
