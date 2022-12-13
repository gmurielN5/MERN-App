import React, { useState } from "react"
import { Input, Button } from "reactstrap"
import { postTopic } from "../../../Services/TopicService"

export const Topics = () => {
  const [topic, setTopic] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    postTopic(topic)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <>
      <Input
        type="text"
        value={topic}
        name="topic"
        className="border border-dark"
        onChange={(event) => setTopic(event.target.value)}
      />
      <Button
        color="dark"
        className="my-2"
        typr="submit"
        onClick={handleSubmit}
      >
        Add
      </Button>
    </>
  )
}
