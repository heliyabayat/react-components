import React, { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { useEffect } from "react";

export default function ModalPage() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="relative">
      <Button onClick={handleModal} primary>
        open modal
      </Button>
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          actionBar={
            <Button onClick={handleCloseModal} primary>
              close
            </Button>
          }
        >
          <p>text conhsihfoisj </p>
        </Modal>
      )}
    </div>
  );
}
