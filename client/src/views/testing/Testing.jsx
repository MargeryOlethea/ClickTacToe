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
      <div className="h-screen w-screen p-10 flex justify-center items-center">
        <div className="h-5/6 w-5/6 shadow-lg rounded-2xl p-10">
          <p className="font-bold text-3xl mx-auto">Your Game</p>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 w-[450px] h-[450px] bg-white p-10">
              <Blocks value="X" />
              <Blocks />
              <Blocks value="O" />
              <Blocks />
              <Blocks value="O" />
              <Blocks value="X" />
              <Blocks value="O" />
              <Blocks />
              <Blocks value="X" />
            </div>
          </div>
        </div>
      </div>
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
