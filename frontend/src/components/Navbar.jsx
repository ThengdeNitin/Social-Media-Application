import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/icon.png";
import { IoIosLogOut, IoMdMenu, IoMdClose } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiHome2Line } from "react-icons/ri";

export const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePostClick = () => {
    navigate("/create-post");
    setMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/posts"); // or "/" depending on your posts route
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-3 bg-[#0c0620] text-white">
      {/* Logo + Hamburger */}
      <div className="w-full md:w-auto flex justify-between items-center">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="logo" className="w-12 md:w-14" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden"
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex md:items-center md:space-x-4">
        <button
          onClick={handlePostClick}
          className="flex items-center space-x-4 py-2 px-4 rounded-br-lg bg-blue-500 hover:bg-blue-600 font-bold text-white"
        >
          <span className="text-sm">Add new post</span>
          <IoAddCircleOutline className="text-xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-4 w-1/2">
          {/* Add Post */}
          <button
            onClick={handlePostClick}
            className="flex items-center hover:bg-gray-600 gap-2 py-2 px-4 rounded-lg font-bold text-white w-full justify-center"
          >
            <IoAddCircleOutline className="text-xl" />
            Add new post
          </button>

          {/* Profile */}
          {location.pathname !== "/profile" ? (
            <button
              onClick={handleProfileClick}
              className="flex items-center hover:bg-gray-600 gap-2 py-2 px-4 rounded-lg font-bold text-white w-full justify-center"
            >
              <CgProfile className="text-xl" />
              Profile
            </button>
          ) : (
            <button
              onClick={handleHomeClick}
              className="flex items-center hover:bg-gray-600 gap-2 py-2 px-4 rounded-lg font-bold text-white w-full justify-center"
            >
              <RiHome2Line className="text-xl" />
              Back to Posts
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            className="flex items-center hover:bg-gray-600 gap-2 py-2 px-4 rounded-lg font-bold text-white w-full justify-center"
          >
            <IoIosLogOut className="text-xl" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
