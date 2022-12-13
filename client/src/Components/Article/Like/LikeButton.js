import { Button } from "reactstrap"

import { HandThumbsUp } from "react-bootstrap-icons"

export const LikeButton = ({ like, onClick }) => {
  return (
    <>
      {like ? (
        <Button color="link" className="border border-0 p-0" onClick={onClick}>
          <HandThumbsUp size={28} color="black" />
        </Button>
      ) : (
        <Button color="link" className="border border-0 p-0" onClick={onClick}>
          <HandThumbsUp size={28} color="grey" />
        </Button>
      )}
    </>
  )
}
