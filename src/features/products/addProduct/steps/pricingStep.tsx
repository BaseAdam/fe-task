import { useRef } from "react"

import { withForm } from "@/hooks/useAppForm.ts"
import { CURRENCY_OPTIONS, VAT_RATE_OPTIONS } from "@/utils/formOptions.ts"
import { grossFromNet, netFromGross } from "@/utils/price.ts"
import {
  pricingSchema,
  productFormDefaults,
} from "@/types/productFormSchema.ts"
import { StepLayout } from "../stepLayout"

type PriceField = "pricing.netPrice" | "pricing.grossPrice"

export const PricingStep = withForm({
  defaultValues: productFormDefaults,
  props: { onBack: () => {}, onNext: () => {} },
  render: function PricingStep({ form, onBack, onNext }) {
    const lastEditedPrice = useRef<PriceField>("pricing.netPrice")

    const setCalculatedPrice = (name: PriceField, value: string) =>
      form.setFieldValue(name, value, {
        dontRunListeners: true,
        dontUpdateMeta: true,
      })

    return (
      <form.FormGroup
        name="pricing"
        validators={{ onDynamic: pricingSchema }}
        onGroupSubmit={onNext}
      >
        {(group) => (
          <StepLayout onSubmit={group.handleSubmit} onBack={onBack}>
            <div className="grid gap-4 sm:grid-cols-2">
              <form.AppField
                name="pricing.netPrice"
                listeners={{
                  onChange: ({ value }) => {
                    lastEditedPrice.current = "pricing.netPrice"
                    const vatRate = form.getFieldValue("pricing.vatRate")
                    setCalculatedPrice(
                      "pricing.grossPrice",
                      grossFromNet(value, vatRate)
                    )
                  },
                }}
              >
                {(field) => (
                  <field.TextField
                    label="Cena netto"
                    placeholder="0.00"
                    inputMode="decimal"
                    autoFocus
                  />
                )}
              </form.AppField>
              <form.AppField
                name="pricing.grossPrice"
                listeners={{
                  onChange: ({ value }) => {
                    lastEditedPrice.current = "pricing.grossPrice"
                    const vatRate = form.getFieldValue("pricing.vatRate")
                    setCalculatedPrice(
                      "pricing.netPrice",
                      netFromGross(value, vatRate)
                    )
                  },
                }}
              >
                {(field) => (
                  <field.TextField
                    label="Cena brutto"
                    placeholder="0.00"
                    inputMode="decimal"
                  />
                )}
              </form.AppField>
              <form.AppField
                name="pricing.vatRate"
                listeners={{
                  onChange: ({ value: vatRate }) => {
                    if (lastEditedPrice.current === "pricing.netPrice") {
                      const net = form.getFieldValue("pricing.netPrice")
                      setCalculatedPrice(
                        "pricing.grossPrice",
                        grossFromNet(net, vatRate)
                      )
                    } else {
                      const gross = form.getFieldValue("pricing.grossPrice")
                      setCalculatedPrice(
                        "pricing.netPrice",
                        netFromGross(gross, vatRate)
                      )
                    }
                  },
                }}
              >
                {(field) => (
                  <field.SelectField
                    label="Stawka VAT"
                    options={VAT_RATE_OPTIONS}
                  />
                )}
              </form.AppField>
              <form.AppField name="pricing.currency">
                {(field) => (
                  <field.SelectField
                    label="Waluta"
                    options={CURRENCY_OPTIONS}
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
