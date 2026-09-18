import { useEffect, useState } from "react"
import { z } from "zod"

import { MOCK_PRODUCTS } from "@/mock/mockProducts.ts"
import {
  productSchema,
  type ProductSchema,
  type ProductDraft,
} from "@/types/productSchema.ts"

export const PRODUCTS_STORAGE_KEY = "productList"

function loadProducts(): ProductSchema[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY)
    if (stored === null) return MOCK_PRODUCTS

    const result = z.array(productSchema).safeParse(JSON.parse(stored))
    return result.success ? result.data : MOCK_PRODUCTS
  } catch {
    return MOCK_PRODUCTS
  }
}

export function useProducts() {
  const [products, setProducts] = useState(loadProducts)

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  function addProduct(draft: ProductDraft) {
    setProducts((current) => [
      ...current,
      { ...draft, id: crypto.randomUUID() },
    ])
  }

  return { products, addProduct }
}
