import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPrice, formatStock } from "@/utils/format.ts"
import type { ProductSchema } from "@/types/productSchema.ts"
import { ProductStatusBadge } from "./productStatusBadge"

export function ProductsTable({
  products,
}: {
  products: readonly ProductSchema[]
}) {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[29%]">Nazwa</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Kategoria</TableHead>
          <TableHead>Cena brutto</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Magazyn</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {product.sku}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {product.category}
            </TableCell>
            <TableCell className="font-medium">
              {formatPrice(product.grossPrice, product.currency)}
            </TableCell>
            <TableCell>
              <ProductStatusBadge
                isAvailable={product.isAvailable}
                stockQuantity={product.stockQuantity}
              />
            </TableCell>
            <TableCell>{formatStock(product)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
