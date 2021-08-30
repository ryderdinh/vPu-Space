import React from "react";
import { Button, Modal } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "utilities/constants";

export default function ConfirmModal({ title, content, show, onAction }) {
  return (
    <Modal
      show={show}
      onHide={() => {
        onAction(MODAL_ACTION_CLOSE);
      }}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => onAction(MODAL_ACTION_CONFIRM)}
        >
          Confirm
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onAction(MODAL_ACTION_CLOSE);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
