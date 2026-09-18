import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NuqsAdapter } from "nuqs/adapters/react"
import { beforeEach, describe, expect, it } from "vitest"

import { App } from "@/App"

type User = ReturnType<typeof userEvent.setup>

function renderApp() {
  return render(
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  )
}

async function pickOption(user: User, label: string, option: string) {
  await user.click(screen.getByLabelText(label))
  await user.click(await screen.findByRole("option", { name: option }))
}

describe("adding a product", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("walks through all three steps and appends the product to the catalogue", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole("button", { name: "Dodaj produkt" }))
    const dialog = screen.getByRole("dialog")

    await user.type(screen.getByLabelText("Nazwa produktu"), "Testowy Laptop")
    await user.type(screen.getByLabelText("SKU produktu"), "TEST123")
    await pickOption(user, "Producent", "Apple")
    await pickOption(user, "Kategoria", "Komputery")
    await user.click(within(dialog).getByRole("button", { name: "Bluetooth" }))
    await user.click(within(dialog).getByRole("button", { name: "Dalej" }))

    // Gross is derived from the VAT rate, so step two only needs the net price.
    await user.type(screen.getByLabelText("Cena netto"), "100")
    expect(screen.getByLabelText("Cena brutto")).toHaveValue("123.00")
    await user.click(within(dialog).getByRole("button", { name: "Dalej" }))

    await user.click(
      within(dialog).getByRole("button", { name: "Zapisz produkt" })
    )

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(screen.getByText("6 produktów w katalogu")).toBeInTheDocument()

    // A page holds five items, so the sixth product lands on page two.
    await user.click(screen.getByRole("link", { name: "Dalej" }))

    const row = screen.getByRole("row", { name: /Testowy Laptop/ })
    expect(within(row).getByText("TEST123")).toBeInTheDocument()
    expect(within(row).getByText("Komputery")).toBeInTheDocument()
    expect(within(row).getByText("123,00 PLN")).toBeInTheDocument()
  })

  it("blocks the step while its required fields are empty", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole("button", { name: "Dodaj produkt" }))
    const dialog = screen.getByRole("dialog")
    await user.click(within(dialog).getByRole("button", { name: "Dalej" }))

    expect(
      await screen.findByText("Nazwa musi mieć co najmniej 3 znaki")
    ).toBeInTheDocument()
    expect(screen.getByText("Podaj SKU")).toBeInTheDocument()
    expect(screen.getByText("Wybierz producenta z listy")).toBeInTheDocument()

    // Still on the first step.
    expect(screen.getByLabelText("Nazwa produktu")).toBeInTheDocument()
  })
})
