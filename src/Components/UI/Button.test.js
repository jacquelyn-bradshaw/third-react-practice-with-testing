import {render, screen} from "@testing-library/react"
import Button from "./Button"

describe("Button Component", () => {
  test("render button", () => {
    render(<Button/>)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })
})