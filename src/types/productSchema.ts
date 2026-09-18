import { z } from "zod"

export const MANUFACTURERS = [
  "Apple",
  "Samsung",
  "Sony",
  "Bosch",
  "Xiaomi",
  "LG",
] as const

export const CATEGORIES = [
  "Komputery",
  "Telefony",
  "RTV",
  "AGD",
  "Akcesoria",
] as const

export const PRODUCT_FEATURES = [
  "Bluetooth",
  "Wi-Fi",
  "USB-C",
  "Wodoodporny",
  "Bezprzewodowy",
  "Ekologiczny",
  "Premium",
] as const

export const VAT_RATES = ["23", "8", "5", "0"] as const

export const CURRENCIES = ["PLN", "EUR", "USD"] as const

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  description: z.string(),
  manufacturer: z.enum(MANUFACTURERS),
  category: z.enum(CATEGORIES),
  features: z.array(z.enum(PRODUCT_FEATURES)),
  netPrice: z.number(),
  grossPrice: z.number(),
  vatRate: z.enum(VAT_RATES),
  currency: z.enum(CURRENCIES),
  isAvailable: z.boolean(),
  isLimited: z.boolean(),
  stockQuantity: z.number().nullable(),
  minCartQuantity: z.number(),
  maxCartQuantity: z.number(),
})

export type ProductSchema = z.infer<typeof productSchema>
export type ProductDraft = Omit<ProductSchema, "id">
export type Manufacturer = ProductSchema["manufacturer"]
export type Category = ProductSchema["category"]
export type ProductFeature = ProductSchema["features"][number]
export type VatRate = ProductSchema["vatRate"]
export type Currency = ProductSchema["currency"]
