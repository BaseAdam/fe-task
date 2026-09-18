import { z } from "zod"

import {
  CATEGORIES,
  CURRENCIES,
  MANUFACTURERS,
  PRODUCT_FEATURES,
  VAT_RATES,
  type Category,
  type Currency,
  type Manufacturer,
  type ProductFeature,
  type VatRate,
} from "./productSchema.ts"
import { isValidAmount, toNumber } from "../utils/price.ts"

export type ProductFormValues = {
  basicInfo: {
    name: string
    sku: string
    description: string
    manufacturer: Manufacturer | ""
    category: Category | ""
    features: ProductFeature[]
  }
  pricing: {
    netPrice: string
    grossPrice: string
    vatRate: VatRate
    currency: Currency
  }
  availability: {
    isAvailable: boolean
    isLimited: boolean
    stockQuantity: string
    minCartQuantity: string
    maxCartQuantity: string
  }
}

export const productFormDefaults: ProductFormValues = {
  basicInfo: {
    name: "",
    sku: "",
    description: "",
    manufacturer: "",
    category: "",
    features: [],
  },
  pricing: { netPrice: "", grossPrice: "", vatRate: "23", currency: "PLN" },
  availability: {
    isAvailable: true,
    isLimited: false,
    stockQuantity: "",
    minCartQuantity: "1",
    maxCartQuantity: "10",
  },
}

const SKU_PATTERN = /^[a-zA-Z0-9]*$/
const INTEGER_PATTERN = /^\d+$/

const isInteger = (value: string) => INTEGER_PATTERN.test(value)

const amountInput = (requiredMessage: string) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .refine(
      (value) => value === "" || isValidAmount(value),
      "Podaj kwotę w formacie 1299.99"
    )
    .refine(
      (value) => !isValidAmount(value) || toNumber(value) > 0,
      "Kwota musi być większa od 0"
    )

const cartQuantityInput = (requiredMessage: string) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .refine(
      (value) => value === "" || isInteger(value),
      "Podaj liczbę całkowitą"
    )
    .refine(
      (value) => !isInteger(value) || Number(value) >= 1,
      "Ilość musi wynosić co najmniej 1"
    )

export const basicInfoSchema = z.object({
  name: z.string().trim().min(3, "Nazwa musi mieć co najmniej 3 znaki"),
  sku: z
    .string()
    .trim()
    .min(1, "Podaj SKU")
    .max(24, "SKU może mieć maksymalnie 24 znaki")
    .regex(SKU_PATTERN, "SKU może zawierać tylko litery i cyfry"),
  description: z.string().trim(),
  manufacturer: z.enum(MANUFACTURERS, { error: "Wybierz producenta z listy" }),
  category: z.enum(CATEGORIES, { error: "Wybierz kategorię z listy" }),
  features: z
    .array(z.enum(PRODUCT_FEATURES))
    .min(1, "Wybierz co najmniej jedną cechę"),
})

export const pricingSchema = z.object({
  netPrice: amountInput("Podaj cenę netto"),
  grossPrice: amountInput("Podaj cenę brutto"),
  vatRate: z.enum(VAT_RATES, { error: "Wybierz stawkę VAT" }),
  currency: z.enum(CURRENCIES, { error: "Wybierz walutę" }),
})

export const availabilitySchema = z
  .object({
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stockQuantity: z.string().trim(),
    minCartQuantity: cartQuantityInput("Podaj minimalną ilość"),
    maxCartQuantity: cartQuantityInput("Podaj maksymalną ilość"),
  })
  .superRefine((values, ctx) => {
    if (values.isLimited && !isInteger(values.stockQuantity)) {
      ctx.addIssue({
        code: "custom",
        path: ["stockQuantity"],
        message: "Podaj ilość na magazynie (liczba całkowita, min. 0)",
      })
    }

    const { minCartQuantity, maxCartQuantity } = values
    if (
      isInteger(minCartQuantity) &&
      isInteger(maxCartQuantity) &&
      Number(minCartQuantity) > Number(maxCartQuantity)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["minCartQuantity"],
        message: "Minimalna ilość nie może być większa niż maksymalna",
      })
      ctx.addIssue({
        code: "custom",
        path: ["maxCartQuantity"],
        message: "Maksymalna ilość nie może być mniejsza niż minimalna",
      })
    }
  })

export const productFormSchema = z.object({
  basicInfo: basicInfoSchema,
  pricing: pricingSchema,
  availability: availabilitySchema,
})

export type ValidProductForm = z.output<typeof productFormSchema>
