import { Badge } from "@/components/ui/badge"
import type { ProductSchema } from "@/types/productSchema.ts"

type ProductStatusBadgeProps = Pick<
  ProductSchema,
  "isAvailable" | "stockQuantity"
>

export function ProductStatusBadge({
  isAvailable,
  stockQuantity,
}: ProductStatusBadgeProps) {
  return isAvailable && stockQuantity !== 0 ? (
    <Badge variant="success">Dostępny</Badge>
  ) : (
    <Badge variant="destructive">Niedostępny</Badge>
  )
}
