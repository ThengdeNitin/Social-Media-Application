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
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen text-white px-4 sm:px-6 lg:px-20 py-6 bg-gray-900">

      {/* Hero Image */}
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
        <Tilt glareEnable={true} glareMaxOpacity={0.45} scale={1.05}>
          <img
            src={heroImage}
            alt="Hero"
            className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl shadow-xl border border-gray-700 transform hover:rotate-2 transition-all duration-500"
          />
        </Tilt>
      </div>

      {/* Login/Register Form */}
      <div className="flex-1 w-full max-w-md sm:max-w-lg p-4 sm:p-6 md:p-8 rounded-xl border border-gray-500 shadow-lg bg-gray-800">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            value={userFormData.email}
            onChange={handleChange}
            placeholder="Phone number, username, or email"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />

          <input
            type="password"
            name="password"
            value={userFormData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold transition-colors duration-300 text-sm sm:text-base"
          >
            Log In
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-gray-400 text-sm sm:text-base">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-6 text-2xl sm:text-3xl mb-4">
          <FaFacebook className="cursor-pointer hover:text-blue-600" />
          <FaGoogle className="cursor-pointer hover:text-red-500" />
          <FaApple className="cursor-pointer hover:text-gray-400" />
        </div>

        {/* Forgot Password */}
        <div
          onClick={() => navigate("/forgot-password")}
          className="text-center text-sm sm:text-base text-gray-400 hover:underline cursor-pointer mb-4"
        >
          Forgot password?
        </div>

        {/* Sign Up */}
        <div className="mt-4 bg-[#251469e8] text-gray-400 rounded-lg p-4 text-center text-sm sm:text-base">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </div>

        {/* Get the App */}
        <div className="mt-6 text-center">
          <p className="text-sm sm:text-base">Get the app.</p>
          <div className="flex justify-center flex-wrap gap-4 mt-4">
            <img
              src={googlePlay}
              alt="Google Play"
              className="w-24 sm:w-28 md:w-32 h-10 cursor-pointer"
            />
            <img
              src={microsoft}
              alt="Microsoft Store"
              className="w-24 sm:w-28 md:w-32 h-10 cursor-pointer"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
