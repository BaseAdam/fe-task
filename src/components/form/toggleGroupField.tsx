import { useId } from "react"

import { Field, FieldError, FieldTitle } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggleGroup"
import { useFieldControl } from "@/hooks/useFieldControl.ts"

type ToggleGroupFieldProps = {
  label: string
  options: readonly string[]
}

const CHIP_CLASSES =
  "h-6 rounded-full bg-background px-2 text-sm text-muted-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/80 data-[state=on]:bg-primary"

export function ToggleGroupField({ label, options }: ToggleGroupFieldProps) {
  const { field, handleBlur, isInvalid, errorId, ariaProps } =
    useFieldControl<string[]>()
  const labelId = useId()

  return (
    <Field data-invalid={isInvalid}>
      <FieldTitle id={labelId}>{label}</FieldTitle>
      <ToggleGroup
        type="multiple"
        variant="outline"
        size="sm"
        className="flex-wrap"
        aria-labelledby={labelId}
        {...ariaProps}
        value={field.state.value}
        onValueChange={field.handleChange}
        onBlur={handleBlur}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option} value={option} className={CHIP_CLASSES}>
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {isInvalid && (
        <FieldError id={errorId} errors={field.state.meta.errors} />
      )}
    </Field>
  )
}
