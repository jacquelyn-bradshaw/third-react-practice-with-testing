import {render, screen} from "@testing-library/react"
import user from "@testing-library/user-event"
import AddUser from "./AddUser"

describe("AddUser Component", () => {
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

  test("errorModal to show if no username or age given", () => {
    render(<AddUser/> )
      
    const button = screen.getByRole("button")
    user.click(button)

    expect(screen.getByText("Invalid Input")).toBeInTheDocument()
    expect(screen.getByText("Please enter a name and age")).toBeInTheDocument() 
  })

  test("errorModal to show if no username given", () => {
    render(<AddUser/> )
      
    const ageInput = screen.getByRole("textbox", {name: /age/i})
    user.click(ageInput)
    user.keyboard("3")
    
    const button = screen.getByRole("button")
    user.click(button)

    expect(screen.getByText("Invalid Input")).toBeInTheDocument()
    expect(screen.getByText("Please enter a name and age")).toBeInTheDocument() 
  })

  test("errorModal to show if no age given", () => {
    render(<AddUser/> )
      
    const nameInput = screen.getByRole("textbox", {name: /name/i})
    user.click(nameInput)
    user.keyboard("Max")
    
    const button = screen.getByRole("button")
    user.click(button)

    expect(screen.getByText("Invalid Input")).toBeInTheDocument()
    expect(screen.getByText("Please enter a name and age")).toBeInTheDocument() 
  })

  test("close ErrorModal when Okay button clicked", () => {
    render(<AddUser/> )
      
    const addUserButton = screen.getByRole("button", {name: /add user/i})
    user.click(addUserButton)

    expect(screen.getByText("Invalid Input")).toBeInTheDocument()
    expect(screen.getByText("Please enter a name and age")).toBeInTheDocument()

    const errorModalButton = screen.getByRole('button', { name: /okay/i })
    user.click(errorModalButton)

    expect(screen.queryByText("Invalid Input")).toBeNull()
    expect(screen.queryByText("Please enter a name and age")).toBeNull()
  })
})
