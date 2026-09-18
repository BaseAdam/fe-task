import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { useFieldControl } from "@/hooks/useFieldControl.ts"

export function SwitchField({ label }: { label: string }) {
  const { field, handleBlur } = useFieldControl<boolean>()

  return (
    <Field orientation="horizontal">
      <Switch
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        onBlur={handleBlur}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  )
}
