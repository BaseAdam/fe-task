import { createFormHookContexts } from "@tanstack/react-form"

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

export { fieldContext, formContext }

export function useFieldControl<TValue>() {
  const field = useFieldContext<TValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const errorId = `${field.name}-error`

  const handleBlur = () => {
    if (field.state.meta.isDirty) field.handleBlur()
  }

  return {
    field,
    handleBlur,
    isInvalid,
    errorId,
    ariaProps: {
      "aria-invalid": isInvalid,
      "aria-describedby": isInvalid ? errorId : undefined,
    },
  }
}
