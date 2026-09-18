import { createFormHook } from "@tanstack/react-form"

import { CheckboxField } from "@/components/form/checkboxField"
import { SelectField } from "@/components/form/selectField"
import { SwitchField } from "@/components/form/switchField"
import { TextareaField } from "@/components/form/textareaField"
import { TextField } from "@/components/form/textField"
import { ToggleGroupField } from "@/components/form/toggleGroupField"
import { fieldContext, formContext } from "@/hooks/useFieldControl.ts"

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
    ToggleGroupField,
    CheckboxField,
    SwitchField,
  },
  formComponents: {},
})
