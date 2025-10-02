import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RiHome2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { MdOutlineHelpOutline } from "react-icons/md";

const SideBar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-between items-center gap-4 p-2 w-44 max-h-screen md:h-[90vh] bg-gradient-to-l from-[#3f2182] to-[#13072e] text-white border-r border-gray-600 rounded -mt-2">
      {/* Top Links */}
      <div className="flex flex-col gap-3 text-lg">
        <div
          onClick={() => navigate("/")}
          className="flex flex-row items-center gap-3 cursor-pointer hover:text-blue-400"
        >
          <RiHome2Line />
          <p>Home</p>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="flex flex-row items-center gap-3 cursor-pointer hover:text-blue-400"
        >
          <CgProfile />
          <p>Profile</p>
        </div>
        <div
          onClick={() => navigate("/settings")}
          className="flex flex-row items-center gap-3 cursor-pointer hover:text-blue-400"
        >
          <CiSettings />
          <p>Settings</p>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="w-full">
        <div
          onClick={() => navigate("/help")}
          className="flex flex-row items-center gap-3 cursor-pointer hover:text-blue-400"
        >
          <MdOutlineHelpOutline />
          <p>Help and Support</p>
        </div>

        <div
          onClick={handleLogoutClick}
          className="flex flex-row items-center gap-3 mt-3 bg-red-500 rounded-lg px-5 py-1 cursor-pointer hover:bg-red-600 transition"
        >
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
