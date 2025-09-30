import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      setErrorMsg("Please select an avatar image");
      return;
    }

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", avatar);

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/user/register`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        alert("User registered successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-900">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg p-6 md:p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-600">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-6">
          Register
        </h2>

        {errorMsg && <p className="text-red-500 mb-4 text-sm sm:text-base">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-lg bg-white text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-lg bg-white text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-lg bg-white text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 sm:p-3 rounded-lg bg-white text-black text-sm sm:text-base focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 bg-[#251469e8] hover:bg-blue-600 rounded-lg font-bold text-sm sm:text-base transition-colors duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300 text-sm sm:text-base">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};
