import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useFieldControl } from "@/hooks/useFieldControl.ts"

type TextareaFieldProps = { label: string; placeholder?: string }

export function TextareaField({ label, placeholder }: TextareaFieldProps) {
  const { field, handleBlur, isInvalid, errorId, ariaProps } =
    useFieldControl<string>()

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        {...ariaProps}
      />
      {isInvalid && (
        <FieldError id={errorId} errors={field.state.meta.errors} />
      )}
    </Field>
  )
}
