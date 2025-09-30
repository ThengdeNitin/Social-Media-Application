import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icon.png";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    newPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!backendUrl) {
      setErrorMsg("Backend URL is not configured. Check your .env file.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        setSuccessMsg(res.data.message);
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      } else {
        setErrorMsg(res.data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white px-4 sm:px-6 lg:px-20 py-6 bg-gray-900">
      <div className="w-full max-w-md sm:max-w-lg p-4 sm:p-6 md:p-8 rounded-xl border border-gray-500 shadow-lg bg-gray-800">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Forgot Password</h2>

        {errorMsg && <p className="text-red-500 mb-4 text-sm sm:text-base">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mb-4 text-sm sm:text-base">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Email or Username"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#251469e8] hover:bg-blue-600 rounded-lg font-bold text-sm sm:text-base transition-colors duration-300"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm sm:text-base">
          Remember your password?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};
