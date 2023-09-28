import {render, screen} from "@testing-library/react"
import user from "@testing-library/user-event"
import AddUser from "./AddUser"

describe("Add User Component", () => {
  test("renders Add User form", () => {
    render(<AddUser/>)
    const nameInput = screen.getByRole("textbox", {name: /name/i})
    const ageInput = screen.getByRole("textbox", {name: /age/i})
    const button = screen.getByRole("button")
    const nameLabel = screen.getByText("Username")
    const ageLabel = screen.getByText("Age (Years)")
    expect(nameInput).toBeInTheDocument()
    expect(ageInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(nameLabel).toBeInTheDocument()
    expect(ageLabel).toBeInTheDocument()
  })
  test("it calls onAddUser when the form is submitted", () => {
    const mock = jest.fn()
    render(<AddUser onAddUser={mock}/> )
    
    const nameInput = screen.getByRole("textbox", {name: /name/i})
    const ageInput = screen.getByRole("textbox", {name: /age/i})
    
    user.click(nameInput)
    user.keyboard("Max")
    user.click(ageInput)
    user.keyboard("3")
    
    const button = screen.getByRole("button")
    user.click(button)

    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith({username: "Max", age: "3"})
  })

  test("empties the two inputs when form is submitted", () => {
    render(<AddUser onAddUser={() => {}}/>)
    const nameInput = screen.getByRole("textbox", {name: /name/i})
    const ageInput = screen.getByRole("textbox", {name: /age/i})
    
    user.click(nameInput)
    user.keyboard("Max")
    user.click(ageInput)
    user.keyboard("3")
    
    const button = screen.getByRole("button")
    user.click(button)

    expect(nameInput).toHaveValue("")
    expect(ageInput).toHaveValue("")
  })
})