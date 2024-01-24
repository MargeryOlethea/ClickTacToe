/* eslint-disable react/prop-types */
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

const ButtonDropDown = ({ onClick }) => {
  return (
    <>
      <Dropdown
        label={`Hello ${localStorage.username}!`}
        dismissOnClick="false"
        className=" font-medium text-lg rounded-lg border-none max-md:text-xs"
        style={{
          color: "#1f2937",
          backgroundColor: "transparent",
          padding: "0px 5px",
          fontWeight: "bold",
          border: "1px solid",
          borderColor: "#6b7280",
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
