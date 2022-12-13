import React from "react"
import { Container } from "reactstrap"
import Avatar from "../Avatar/Avatar"

export const User = ({ user, size }) => {
  return (
    <Container
      className={`p-0 ${
        size === "thumbnail"
          ? "d-flex align-items-center"
          : "d-flex flex-column"
      }`}
    >
      <>
        <Avatar user={user} size={size} />

        <h6 className={`${size === "thumbnail" ? "ps-2" : "heading pt-2"}`}>
          {user.username}
        </h6>
      </>
    </Container>
  )
}
