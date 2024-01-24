import { useState } from "react";

/* eslint-disable react/prop-types */
function PasswordFormModal({ isOpen, onClose, onSubmit, id }) {
  const [password, setPassword] = useState(null);
  // CONDITION BUAT MODAL
  if (!isOpen) return null;

  // START RETURN
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50"
          onClick={onClose}
        ></div>

        <div className="fixed bg-white w-2/6 h-2/6 rounded-3xl shadow-lg flex">
          <div className="p-10 w-full h-full mt-5">
            <p className="text-lg font-bold text-gray-800">Insert Password</p>
            <form onSubmit={(e) => onSubmit(e, password, id)}>
              <input
                type="password"
                className="border-none py-3 px-5 w-full rounded-2xl bg-gray-100 mt-5"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-1-6 px-4 py-3 mt-5 text-gray-800 border border-gray-500 font-medium bg-white hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block">
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordFormModal;
