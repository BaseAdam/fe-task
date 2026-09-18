import { withForm } from "@/hooks/useAppForm.ts"
import { PRODUCT_FEATURES } from "@/types/productSchema.ts"
import { CATEGORY_OPTIONS, MANUFACTURER_OPTIONS } from "@/utils/formOptions.ts"
import {
  basicInfoSchema,
  productFormDefaults,
} from "@/types/productFormSchema.ts"
import { StepLayout } from "../stepLayout"

export const BasicInfoStep = withForm({
  defaultValues: productFormDefaults,
  props: { onNext: () => {} },
  render: function BasicInfoStep({ form, onNext }) {
    return (
      <form.FormGroup
        name="basicInfo"
        validators={{ onDynamic: basicInfoSchema }}
        onGroupSubmit={onNext}
      >
        {(group) => (
          <StepLayout onSubmit={group.handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <form.AppField name="basicInfo.name">
                {(field) => (
                  <field.TextField
                    label="Nazwa produktu"
                    placeholder="np. MacBook Pro 14"
                    autoFocus
                  />
                )}
              </form.AppField>
              <form.AppField name="basicInfo.sku">
                {(field) => (
                  <field.TextField
                    label="SKU produktu"
                    placeholder="np. MBP14M3PRO"
                  />
                )}
              </form.AppField>
            </div>
            <form.AppField name="basicInfo.description">
              {(field) => (
                <field.TextareaField
                  label="Opis"
                  placeholder="Krótki opis produktu"
                />
              )}
            </form.AppField>
            <div className="grid gap-4 sm:grid-cols-2">
              <form.AppField name="basicInfo.manufacturer">
                {(field) => (
                  <field.SelectField
                    label="Producent"
                    placeholder="Wybierz producenta"
                    options={MANUFACTURER_OPTIONS}
                  />
                )}
              </form.AppField>
              <form.AppField name="basicInfo.category">
                {(field) => (
                  <field.SelectField
                    label="Kategoria"
                    placeholder="Wybierz kategorię"
                    options={CATEGORY_OPTIONS}
                  />
                )}
              </form.AppField>
            </div>
            <form.AppField name="basicInfo.features">
              {(field) => (
                <field.ToggleGroupField
                  label="Cechy produktu"
                  options={PRODUCT_FEATURES}
                />
              )}
            </form.AppField>
          </StepLayout>
        )}
      </form.FormGroup>
    )
  },
})
