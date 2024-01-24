/* eslint-disable react/prop-types */
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

const ButtonDropDown = ({ onClick }) => {
  return (
    <>
      <Dropdown
        label={localStorage.username}
        dismissOnClick="false"
        className="text-slate-800 font-medium text-lg rounded-lg border-none max-md:text-xs"
        style={{
          color: "white",
          backgroundColor: "#f97316",
          padding: "0px 5px",
          fontWeight: "bold",
          borderRadius: "30px",
        }}
      >
        <Dropdown.Item>
          <Link to="/my-game">My Games</Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={onClick}>Log out</Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default ButtonDropDown;
