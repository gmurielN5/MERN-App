import React from "react"

import { Col, Input, Label } from "reactstrap"

const ImageUpload = ({ value, text, handleFileChange }) => {
  return (
    <Col className="d-flex justify-content-end align-items-start p-0">
      <Label for="file-upload" className="btn btn-light mt-2">
        {text}
      </Label>
      <Input
        type="file"
        value={value}
        name="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileChange}
        placeholder="upload image"
      />
    </Col>
  )
}

export default ImageUpload
