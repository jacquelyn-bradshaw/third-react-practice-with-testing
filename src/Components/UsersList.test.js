import {render, screen} from "@testing-library/react"
import UsersList from "./UsersList"

function renderComponent() {
  const users = [
    {username: "Max", age: "3"},
    {username: "Bob", age: "5"}
  ]
  render(<UsersList users={users}/>)

  return {users}
}

describe("UsersList Component", () => {
  test("render one row per user", () => {
    renderComponent()
    const rows = screen.getAllByRole("listitem")
    expect(rows).toHaveLength(2)
  })

  test("render the username and age of each user", () => {
    const {users} = renderComponent()

    for (let user of users) {
      const row = screen.getByText(`${user.username} (${user.age} years old)`)
      expect(row).toBeInTheDocument()
    }
  })
})
