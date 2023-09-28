import Card from "./UI/Card"

import styles from "./UsersList.module.css"

const UsersList = (props) => {
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => (
          <li key={Math.random().toString()}>
            {user.username} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default UsersList
