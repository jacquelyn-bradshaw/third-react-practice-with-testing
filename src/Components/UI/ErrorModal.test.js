import {render, screen} from "@testing-library/react"
import ErrorModal from "./ErrorModal"

describe("ErrorModal Component", () => {
  test("render ErrorModal", () => {
    render(<ErrorModal/>)
    const heading = screen.getByRole("heading")
    const paragraph = screen.getByTestId("message")
    const button = screen.getByRole("button")
    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test("render error message", () => {
    render(<ErrorModal title="Invalid Input" message="Please enter a name and age" />)
    expect(screen.getByText("Invalid Input")).toBeInTheDocument()
    expect(screen.getByText("Please enter a name and age")).toBeInTheDocument()    
  })
})
