import { useState } from "react"

export const INFO_STEP = "infoStep"
export const PRICE_STEP = "priceStep"
export const AVAILABILITY_STEP = "availabilityStep"

export type StepId =
  typeof INFO_STEP | typeof PRICE_STEP | typeof AVAILABILITY_STEP

type Step = {
  id: StepId
  next: StepId | null
  title: string
  description: string
}

export const STEPS = [
  {
    id: INFO_STEP,
    next: PRICE_STEP,
    title: "Informacje",
    description: "Dane podstawowe",
  },
  {
    id: PRICE_STEP,
    next: AVAILABILITY_STEP,
    title: "Cena",
    description: "Dane cenowe",
  },
  {
    id: AVAILABILITY_STEP,
    next: null,
    title: "Dostępność",
    description: "Stany magazynowe",
  },
] as const satisfies readonly Step[]

export function useStepFlow() {
  const [currentStepId, setCurrentStepId] = useState<StepId>(INFO_STEP)

  const goToNextStep = () => {
    const nextStepId = STEPS.find((step) => step.id === currentStepId)?.next
    if (nextStepId) setCurrentStepId(nextStepId)
  }

  const goToPreviousStep = () => {
    const previousStep = STEPS.find((step) => step.next === currentStepId)
    if (previousStep) setCurrentStepId(previousStep.id)
  }

  return { currentStepId, goToNextStep, goToPreviousStep }
}
