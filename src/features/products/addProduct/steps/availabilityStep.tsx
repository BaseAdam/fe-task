import { withForm } from "@/hooks/useAppForm.ts"
import { Separator } from "@/components/ui/separator"
import {
  availabilitySchema,
  productFormDefaults,
} from "@/types/productFormSchema.ts"
import { StepLayout } from "../stepLayout"

export const AvailabilityStep = withForm({
  defaultValues: productFormDefaults,
  props: { onBack: () => {}, onNext: () => {} },
  render: function AvailabilityStep({ form, onBack, onNext }) {
    return (
      <form.FormGroup
        name="availability"
        validators={{ onDynamic: availabilitySchema }}
        onGroupSubmit={onNext}
      >
        {(group) => (
          <StepLayout onSubmit={group.handleSubmit} onBack={onBack} isLastStep>
            <form.AppField name="availability.isAvailable">
              {(field) => <field.SwitchField label="Produkt jest dostępny" />}
            </form.AppField>
            <Separator />
            <form.AppField name="availability.isLimited">
              {(field) => <field.CheckboxField label="Produkt limitowany" />}
            </form.AppField>
            <form.Subscribe
              selector={(state) => state.values.availability.isLimited}
            >
              {(isLimited) =>
                isLimited && (
                  <div className="grid animate-in gap-4 duration-200 fade-in slide-in-from-top-1 sm:grid-cols-2">
                    <form.AppField name="availability.stockQuantity">
                      {(field) => (
                        <field.TextField
                          label="Ilość na magazynie"
                          placeholder="np. 25"
                          inputMode="numeric"
                          autoFocus
                        />
                      )}
                    </form.AppField>
                  </div>
                )
              }
            </form.Subscribe>
            <Separator />
            <h3 className="text-sm font-medium">Limity koszyka</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <form.AppField name="availability.minCartQuantity">
                {(field) => (
                  <field.TextField
                    label="Minimalna ilość"
                    inputMode="numeric"
                  />
                )}
              </form.AppField>
              <form.AppField name="availability.maxCartQuantity">
                {(field) => (
                  <field.TextField
                    label="Maksymalna ilość"
                    inputMode="numeric"
                  />
                )}
              </form.AppField>
            </div>
          </StepLayout>
        )}
      </form.FormGroup>
    )
  },
})
