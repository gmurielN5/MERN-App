import { Profile } from "../UserProfile/Profile"
export const SuggestedUsers = ({ users }) => {
  return (
    <>
      {users.map((user, i) => (
        <Profile key={i} author={user} />
      ))}
    </>
  )
}
