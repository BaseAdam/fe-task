import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ProductDraft } from "@/types/productSchema.ts"
import { AddProductForm } from "./addProductForm"

type AddProductButtonProps = {
  onProductAdded: (product: ProductDraft) => void
}

export function AddProductButton({ onProductAdded }: AddProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (product: ProductDraft) => {
    onProductAdded(product)
    setIsOpen(false)
    toast.success("Produkt został dodany")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <PlusIcon data-icon="inline-start" />
          Dodaj produkt
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 p-0 max-sm:inset-0 max-sm:h-dvh max-sm:max-h-none max-sm:max-w-none max-sm:translate-none max-sm:rounded-none sm:max-w-180">
        <DialogHeader className="border-b py-6 max-sm:mx-4 sm:px-4">
          <DialogTitle>Dodaj nowy produkt</DialogTitle>
          <DialogDescription className="sr-only">
            Formularz dodawania produktu w trzech krokach
          </DialogDescription>
        </DialogHeader>
        <AddProductForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
