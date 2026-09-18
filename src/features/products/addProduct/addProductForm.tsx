import { revalidateLogic, type ValidationLogicFn } from "@tanstack/react-form"

import { useAppForm } from "@/hooks/useAppForm.ts"
import {
  productFormDefaults,
  productFormSchema,
} from "@/types/productFormSchema.ts"
import type { ProductDraft } from "@/types/productSchema.ts"
import { toProductDraft } from "@/utils/productDraft.ts"
import { FormStepper } from "./formStepper"
import { AvailabilityStep } from "./steps/availabilityStep"
import { BasicInfoStep } from "./steps/basicInfoStep"
import { PricingStep } from "./steps/pricingStep"
import {
  AVAILABILITY_STEP,
  INFO_STEP,
  PRICE_STEP,
  STEPS,
  useStepFlow,
} from "@/hooks/useStepFlow.ts"

const validateOnBlurThenLive: ValidationLogicFn = (props) => {
  // The step's Zod schema sits on its FormGroup and those calls arrive without
  // a field name, so the switch has to watch the group rather than one field.
  const stepShowsError = props.group ? !props.group.state.meta.isValid : false

  return revalidateLogic({
    mode: stepShowsError ? "change" : "blur",
    modeAfterSubmission: "change",
  })(props)
}

type AddProductFormProps = {
  onSubmit: (product: ProductDraft) => void
}

export function AddProductForm({ onSubmit }: AddProductFormProps) {
  const { currentStepId, goToNextStep, goToPreviousStep } = useStepFlow()

  const form = useAppForm({
    defaultValues: productFormDefaults,
    validationLogic: validateOnBlurThenLive,
    onSubmit: ({ value }) => {
      onSubmit(toProductDraft(productFormSchema.parse(value)))
    },
  })

  return (
    <>
      <FormStepper steps={STEPS} currentStepId={currentStepId} />
      {currentStepId === INFO_STEP && (
        <BasicInfoStep form={form} onNext={goToNextStep} />
      )}
      {currentStepId === PRICE_STEP && (
        <PricingStep
          form={form}
          onBack={goToPreviousStep}
          onNext={goToNextStep}
        />
      )}
      {currentStepId === AVAILABILITY_STEP && (
        <AvailabilityStep
          form={form}
          onBack={goToPreviousStep}
          onNext={form.handleSubmit}
        />
      )}
    </>
  )
}
