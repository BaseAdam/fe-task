import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { useFieldControl } from "@/hooks/useFieldControl.ts"

export function CheckboxField({ label }: { label: string }) {
  const { field, handleBlur } = useFieldControl<boolean>()

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
        onBlur={handleBlur}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  )
}
