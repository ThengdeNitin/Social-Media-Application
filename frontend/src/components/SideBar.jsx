import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RiHome2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { MdOutlineHelpOutline } from "react-icons/md";

const SideBar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="flex bg-gradient-to-l from-[#3f2182] text-white max-h-[87vh] h-[90vh] bg-custom-gradient flex-col border-r border-gray-600 rounded gap-4 items-center justify-between -mt-2 w-44 p-2">
      <div className="flex flex-col gap-3 text-lg">
        <div
          onClick={() => navigate("/")}
          className="flex flex-row items-center gap-3 text-lg cursor-pointer hover:text-blue-400"
        >
          <RiHome2Line />
          <p>Home</p>
        </div>
        <div
          onClick={() => navigate("/")}
          className="flex flex-row items-center gap-3 text-lg cursor-pointer hover:text-blue-400"
        >
          <CgProfile />
          <p>Profile</p>
        </div>
        <div
          onClick={() => navigate("/")}
          className="flex flex-row items-center gap-3 text-lg cursor-pointer hover:text-blue-400"
        >
          <CiSettings />
          <p>Settings</p>
        </div>
      </div>

      <div>
        <div
          className="flex flex-row items-center gap-3 text-md cursor-pointer hover:text-blue-400"
          onClick={() => navigate("/")}
        >
          <MdOutlineHelpOutline />
          <p className="text-white">Help and Support</p>
        </div>

        <div
          onClick={handleLogoutClick}
          className="flex cursor-pointer flex-row items-center gap-3 mt-2 bg-red-500 rounded-lg px-5 p-1 text-white"
        >
          <p className="text-md">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
