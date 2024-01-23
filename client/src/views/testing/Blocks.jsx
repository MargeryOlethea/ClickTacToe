/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons";

function Blocks({ value }) {
  return (
    <>
      <button
        className={`h-[110px] w-[110px] shadow-inner rounded-xl bg-gray-100 font-black text-3xl hover:scale-105 transition duration-500 ease-in-out ${
          value === "X" ? "text-red-700" : "text-blue-700"
        }`}
      >
        {value === "X" && <FontAwesomeIcon icon={faTimes} size="xl" />}
        {value === "O" && <FontAwesomeIcon icon={farCircle} size="lg" />}
      </button>
    </>
  );
}

export default Blocks;
