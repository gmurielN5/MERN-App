import React, { useState, useEffect } from "react"
import { Row, Col, Label, Button } from "reactstrap"

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly

const Editable = ({
  childRef,
  type,
  text,
  placeholder,
  label,
  children,
  edit,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false)
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus()
    }
  }, [isEditing, childRef])

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    const { key } = event
    const keys = ["Escape", "Tab"]
    const enterKey = "Enter"
    const allKeys = [...keys, enterKey] // All keys array

    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false)
    }
  }

  //Conditional to render col size
  let size = 10
  if (props.editbutton) {
    size = 12
  }

  return (
    <Row {...props}>
      {isEditing ? (
        <Col
          sm
          md={size}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
          {label ? <span className="pt-3 text-muted">{label}</span> : null}
        </Col>
      ) : (
        <Col
          sm
          md={size}
          className="d-flex flex-column"
          onClick={() => setEditing(true)}
        >
          <Label>{text || placeholder}</Label>
          {label ? <span className="pt-3 text-muted">{label}</span> : null}
        </Col>
      )}

      {edit ? null : (
        <Col className="text-end">
          {isEditing ? (
            <Button
              className="mt-2"
              color="light"
              onClick={(e) => {
                setEditing(false)
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              className="mt-2"
              color="light"
              onClick={(e) => {
                setEditing(true)
              }}
            >
              Edit
            </Button>
          )}
        </Col>
      )}
    </Row>
  )
}

export default Editable
