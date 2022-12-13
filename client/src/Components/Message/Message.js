import React from "react"
import { Alert } from "reactstrap"

const getStyle = ({ message, error }) => {
  let color = ""
  if (message.msgError || error) color = "danger"
  else color = "light border-dark"
  return color
}
const Message = ({ message, error }) => {
  if (!message) {
    return null
  }
  return (
    <>
      {error && message?.length === 0 ? null : (
        <Alert
          color={getStyle({ message, error })}
          className="text-center font-weight-bold shadow"
        >
          {message.msgBody || message}
        </Alert>
      )}
    </>
  )
}

export default Message
