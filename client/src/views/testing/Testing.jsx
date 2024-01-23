import { useState } from "react";
import PasswordFormModal from "../modals/PasswordFormModal";
import Blocks from "./Blocks";

function Testing() {
  // Conditioning for modal password
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };
  const closePasswordModal = () => setPasswordModalOpen(false);

  return (
    <>
      <div className="h-screen w-screen p-10 flex justify-center items-center">
        <button onClick={openPasswordModal}> buka password</button>
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
    </>
  );
}

export default Testing;
