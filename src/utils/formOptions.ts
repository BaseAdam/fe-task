import type { SelectOption } from "@/components/form/selectField"
import {
  CATEGORIES,
  CURRENCIES,
  MANUFACTURERS,
  VAT_RATES,
} from "@/types/productSchema.ts"

const toOptions = (values: readonly string[]): SelectOption[] =>
  values.map((value) => ({ value, label: value }))

export const MANUFACTURER_OPTIONS = toOptions(MANUFACTURERS)
export const CATEGORY_OPTIONS = toOptions(CATEGORIES)
export const CURRENCY_OPTIONS = toOptions(CURRENCIES)
export const VAT_RATE_OPTIONS: SelectOption[] = VAT_RATES.map((rate) => ({
  value: rate,
  label: `${rate}%`,
}))
