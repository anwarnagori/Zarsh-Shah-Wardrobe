import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../services/authService";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await resetPasswordApi(token, { password });
      setMessage(res.message || "Password reset success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Reset password</h2>
      {message && (
        <div className="bg-green-100 text-green-800 p-2 mb-3 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          type="password"
          className="w-full p-3 border rounded"
        />
        <button className="w-full bg-amber-600 text-white py-3 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
