import { CheckIcon } from "lucide-react"

import { cn } from "cn"

type Step = {
  id: string
  next: string | null
  title: string
  description: string
}

type FormStepperProps = {
  steps: readonly Step[]
  currentStepId: string
}

export function FormStepper({ steps, currentStepId }: FormStepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId)

  return (
    <ol className="flex justify-between gap-4 border-b py-3 max-sm:mx-4 sm:px-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = step.id === currentStepId

        return (
          <li
            key={step.id}
            aria-current={isCurrent ? "step" : undefined}
            className="flex flex-1 items-center gap-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  isCompleted || isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "border bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckIcon className="size-4" /> : index + 1}
              </span>
              <span className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    "text-sm font-medium",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {step.description}
                </span>
              </span>
            </div>
            {step.next !== null && (
              <span
                aria-hidden
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
