import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFieldControl } from "@/hooks/useFieldControl.ts"

export type SelectOption = { value: string; label: string }

type SelectFieldProps = {
  label: string
  placeholder?: string
  options: readonly SelectOption[]
}

export function SelectField({ label, placeholder, options }: SelectFieldProps) {
  const { field, handleBlur, isInvalid, errorId, ariaProps } =
    useFieldControl<string>()

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={field.handleChange}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleBlur()
        }}
      >
        <SelectTrigger id={field.name} className="w-full" {...ariaProps}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid && (
        <FieldError id={errorId} errors={field.state.meta.errors} />
      )}
    </Field>
  )
}
