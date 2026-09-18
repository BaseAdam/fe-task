import type { ReactNode } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"

type StepLayoutProps = {
  children: ReactNode
  onSubmit: () => void
  onBack?: () => void
  isLastStep?: boolean
}

export function StepLayout({
  children,
  onSubmit,
  onBack,
  isLastStep = false,
}: StepLayoutProps) {
  return (
    <form
      noValidate
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
        {children}
      </div>
      <DialogFooter className="mx-0 mb-0 flex-row">
        {onBack && (
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            <ArrowLeftIcon data-icon="inline-start" />
            Wstecz
          </Button>
        )}
        <Button type="submit" size="lg" className="ml-auto">
          {isLastStep ? (
            "Zapisz produkt"
          ) : (
            <>
              Dalej
              <ArrowRightIcon data-icon="inline-end" />
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
