import React, { useState } from "react";
import { forgotPasswordApi } from "../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await forgotPasswordApi({ email });
      setMessage(res.message || "Reset link sent if email exists.");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Forgot password</h2>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full p-3 border rounded"
        />
        <button className="w-full bg-amber-600 text-white py-3 rounded">
          Send reset link
        </button>
      </form>
    </div>
  );
}
