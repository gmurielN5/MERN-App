import React from "react"
import { useSpring, animated } from "react-spring"
import { Container, Row, Col } from "reactstrap"

const Loading = ({ loading }) => {
  const props = useSpring({
    from: { opacity: 0, color: "#019ac5" },
    to: [
      { opacity: 1, color: "#22D7F2" },
      { opacity: 1, color: "#F24D2E" },
      { opacity: 0.5, color: "#30A631" },
      { opacity: 0.8, color: "#3AF23C" },
    ],
    loop:true,
  })

  if (!loading) {
    return null
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center position-relative vh-100"
    >
      <Row>
        <Col>
          <animated.div style={props}>
            <h2>Loading</h2>
          </animated.div>
        </Col>
      </Row>
    </Container>
  )
}

export default Loading
