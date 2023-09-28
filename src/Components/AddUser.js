import { useState } from "react"

import Button from "./UI/Button"
import Card from "./UI/Card"
import ErrorModal from "./UI/ErrorModal"

import styles from "./AddUser.module.css"

const initialInput = {
  username: "",
  age: ""
}

const AddUser = ({onAddUser}) => {
  const [userInput, setUserInput] = useState(initialInput)
  const [error, setError] = useState()

  const inputChangeHandler = (input, value) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value
      }
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (userInput.username.trim().length === 0 || userInput.age.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a name and age"
      })
      return
    }
    if (+userInput.age < 0) {
      setError({
        title: "Invalid age",
        message: "Please enter an age greater than or equal to 0"
      })
      return
    }
    onAddUser(userInput)
    setUserInput(initialInput)
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={userInput.username}
            onChange={(event) =>
              inputChangeHandler("username", event.target.value)
            }
            id="username"
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="numeric"
            pattern="[0-9]*"
            value={userInput.age}
            onChange={(event) => 
              inputChangeHandler("age", event.target.value)
            }
            id="age"
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  )
}

export default AddUser
