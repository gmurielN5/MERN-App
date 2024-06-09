import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  // Row,
  // Col,
} from 'reactstrap';
import { ListTopics } from '../ListTopics/ListTopics';
import { Tags } from 'react-bootstrap-icons';
export const AddTopic = ({ topics }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button color="light" onClick={toggle}>
        <label className="px-4">Add a Topic</label>
        <Tags size={24} />
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <Container className="h-100 my-5 d-flex flex-column">
          <ModalHeader toggle={toggle}>Add a topic</ModalHeader>

          <ModalBody className="w-50 d-flex flex-column justify-content-center m-auto">
            <ListTopics topics={topics} />
          </ModalBody>

          <ModalFooter>
            <Button
              color="dark"
              type="button"
              className="mx-2"
              onClick={toggle}
            >
              Add
            </Button>
            <Button
              color="dark"
              type="button"
              className="mx-2"
              onClick={toggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Container>
      </Modal>
    </>
  );
};

export default AddTopic;
