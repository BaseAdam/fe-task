import type { ComponentProps } from "react"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFieldControl } from "@/hooks/useFieldControl.ts"

type TextFieldProps = { label: string } & Pick<
  ComponentProps<typeof Input>,
  "placeholder" | "inputMode" | "autoFocus"
>

export function TextField({ label, ...inputProps }: TextFieldProps) {
  const { field, handleBlur, isInvalid, errorId, ariaProps } =
    useFieldControl<string>()

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        {...ariaProps}
        {...inputProps}
      />
      {isInvalid && (
        <FieldError id={errorId} errors={field.state.meta.errors} />
      )}
    </Field>
  )
}
