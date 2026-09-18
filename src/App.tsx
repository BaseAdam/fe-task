import { Toaster } from "@/components/ui/sonner"
import { ProductsPage } from "@/features/products/productsPage"

export function App() {
  return (
    <>
      <ProductsPage />
      <Toaster position="bottom-right" />
    </>
  )
}
