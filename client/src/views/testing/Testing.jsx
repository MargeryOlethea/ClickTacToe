import { useState } from "react";
import PasswordFormModal from "../modals/PasswordFormModal";
import Blocks from "./Blocks";
import CreateRoomModal from "../modals/CreateRoomModal";

function Testing() {
  // // PASSWORD MODAL
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };
  const closePasswordModal = () => setPasswordModalOpen(false);

  // CREATE ROOM MODAL
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);

  const openCreateRoomModal = () => {
    setCreateRoomModalOpen(true);
  };
  const closeCreateRoomModal = () => setCreateRoomModalOpen(false);
  console.log(isCreateRoomModalOpen);

  return (
    <>
      <button className="m-10 border p-5" onClick={openPasswordModal}>
        {" "}
        buka password
      </button>
      <button className="m-10 border p-5" onClick={openCreateRoomModal}>
        {" "}
        buka create room
      </button>
      <div className="h-screen w-screen p-10 flex justify-center items-center"></div>
      <PasswordFormModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
      />

      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={closeCreateRoomModal}
      />
    </>
  );
}

export default Testing;
