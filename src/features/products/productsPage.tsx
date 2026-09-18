import { parseAsInteger, useQueryState } from "nuqs"

import { AddProductButton } from "./addProduct/addProductButton.tsx"
import { formatProductCount } from "@/utils/format.ts"
import { clampPage, getPageCount, getPageItems } from "@/utils/pagination.ts"
import { ProductCardsMobile } from "./productCardsMobile.tsx"
import { ProductsPagination } from "./productsPagination"
import { ProductsTable } from "./productsTable"
import { useProducts } from "@/hooks/useProducts.ts"

export function ProductsPage() {
  const { products, addProduct } = useProducts()
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const pageCount = getPageCount(products.length)
  const currentPage = clampPage(page, pageCount)
  const pageProducts = getPageItems(products, currentPage)

  return (
    <main className="min-h-svh bg-muted/50">
      <div className="mx-auto flex max-w-310 flex-col gap-4 px-4 py-6 md:gap-6 md:py-12">
        <header className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Produkty</h1>
            <p className="text-sm text-muted-foreground">
              {formatProductCount(products.length)} w katalogu
            </p>
          </div>
          <AddProductButton onProductAdded={addProduct} />
        </header>

        <section className="flex flex-col gap-6 md:gap-0 md:overflow-hidden md:rounded-lg md:border md:bg-card md:shadow-xs">
          <div className="hidden md:block">
            <ProductsTable products={pageProducts} />
          </div>
          <div className="md:hidden">
            <ProductCardsMobile products={pageProducts} />
          </div>
          <ProductsPagination
            currentPage={currentPage}
            pageCount={pageCount}
            productCount={products.length}
            onPageChange={(nextPage) => void setPage(nextPage)}
          />
        </section>
      </div>
    </main>
  )
}
