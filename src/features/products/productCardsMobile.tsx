import { formatPrice, formatStock } from "@/utils/format.ts"
import type { ProductSchema } from "@/types/productSchema.ts"
import { ProductStatusBadge } from "./productStatusBadge"

export function ProductCardsMobile({
  products,
}: {
  products: readonly ProductSchema[]
}) {
  return (
    <ul aria-label="Lista produktów" className="flex flex-col gap-2">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col gap-2 rounded-xl border bg-card p-3"
        >
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex min-w-0 flex-col gap-1">
              <h2 className="text-base font-medium">{product.name}</h2>
              <p className="text-xs text-muted-foreground">{product.sku}</p>
            </div>
            <ProductStatusBadge
              isAvailable={product.isAvailable}
              stockQuantity={product.stockQuantity}
            />
          </div>
          <dl className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-3">
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground">Kategoria</dt>
              <dd className="text-sm">{product.category}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground">Cena brutto</dt>
              <dd className="text-sm font-medium">
                {formatPrice(product.grossPrice, product.currency)}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground">Magazyn</dt>
              <dd className="text-sm">{formatStock(product)}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}
