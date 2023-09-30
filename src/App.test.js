import {render, screen} from "@testing-library/react"
import user from "@testing-library/user-event"
import App from "./App"

describe("Whole App", () => {
  test("can receive a new user and show it in a list", () => {
    render(<App/>)

    const nameInput = screen.getByRole("textbox", {name: /name/i})
    const ageInput = screen.getByRole("textbox", {name: /age/i})
    const button = screen.getByRole("button")

    user.click(nameInput)
    user.keyboard("Max")
    user.click(ageInput)
    user.keyboard("3")
    
    user.click(button)

    const row = screen.getByText("Max (3 years old)")
    expect(row).toBeInTheDocument()
  })
})
