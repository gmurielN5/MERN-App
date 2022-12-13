import { Button } from "reactstrap"

export const FollowButton = ({ following, onClick }) => {
  return (
    <>
      {following ? (
        <Button color="light" onClick={onClick}>
          Unfollow
        </Button>
      ) : (
        <Button color="dark" onClick={onClick}>
          Follow
        </Button>
      )}
    </>
  )
}
