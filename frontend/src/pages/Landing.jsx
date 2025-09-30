import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Tilt from "react-parallax-tilt";

import heroImage from "../assets/logo.jpg"; 
import Logo from "../assets/icon.png";      
import microsoft from "../assets/microsoft.png";
import googlePlay from "../assets/google.png";

import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";

export const Landing = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(userFormData.email, userFormData.password);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen text-white pl-20 pr-20">
      
      <div className="md:flex md:w-1/2 items-center justify-center mb-6 lg:mb-0">
        <Tilt glareEnable={true} glareMaxOpacity={0.45} scale={1.05}>
          <img
            src={heroImage}
            alt="Hero"
            className="max-w-lg rounded-xl shadow-xl border border-gray-700 transform hover:rotate-2 transition-all duration-500"
          />
        </Tilt>
      </div>

      <div className="flex-1 max-w-md w-full p-6 rounded-xl border border-gray-500 shadow-lg">

        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            value={userFormData.email}
            onChange={handleChange}
            placeholder="Phone number, username, or email"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            value={userFormData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold transition-colors duration-300"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <div className="flex items-center justify-evenly space-x-4">
          <FaFacebook className="text-3xl cursor-pointer hover:text-blue-600" />
          <FaGoogle className="text-3xl cursor-pointer hover:text-red-500" />
          <FaApple className="text-3xl cursor-pointer hover:text-gray-400" />
        </div>

        <div
          onClick={() => navigate("/forgot-password")}
          className="block text-center text-sm text-gray-400 mt-4 hover:underline cursor-pointer"
        >
          Forget password?
        </div>

        <div className="mt-6 bg-[#251469e8] text-gray-400 rounded-lg p-4 text-center">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </div>

        <div className="mt-6 text-center">
          <p>Get the app.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <img
              src={googlePlay}
              alt="Google Play"
              className="w-28 md:w-32 h-10 cursor-pointer"
            />
            <img
              src={microsoft}
              alt="Microsoft Store"
              className="w-28 md:w-32 h-10 cursor-pointer"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
