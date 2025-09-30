import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icon.png";
import axios from "axios";

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

    try {
      setLoading(true);
      const res = await axios.post(
        `/api/user/forgot-password`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setSuccessMsg(res.data.message);
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white p-6">
      <div className="max-w-md w-full p-6 rounded-xl border border-gray-500 shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Email or Username"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#251469e8] hover:bg-blue-600 rounded-lg font-bold transition-colors duration-300"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
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
