import { toNumber } from "@/utils/price.ts"
import type { ValidProductForm } from "@/types/productFormSchema.ts"
import type { ProductDraft } from "@/types/productSchema.ts"

export function toProductDraft({
  basicInfo,
  pricing,
  availability,
}: ValidProductForm): ProductDraft {
  return {
    ...basicInfo,
    netPrice: toNumber(pricing.netPrice),
    grossPrice: toNumber(pricing.grossPrice),
    vatRate: pricing.vatRate,
    currency: pricing.currency,
    isAvailable: availability.isAvailable,
    isLimited: availability.isLimited,
    stockQuantity: availability.isLimited
      ? Number(availability.stockQuantity)
      : null,
    minCartQuantity: Number(availability.minCartQuantity),
    maxCartQuantity: Number(availability.maxCartQuantity),
  }
}
