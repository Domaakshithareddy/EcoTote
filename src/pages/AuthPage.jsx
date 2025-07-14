import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_USER = {
  email: "sparkathon@gmail.com",
  password: "sparkathon",
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (isLogin) {
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/"); // Redirect to AllProducts page
        }, 2000);
      } else {
        setMessage("Invalid credentials.");
      }
    } else {
      setMessage("Account created!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 ml-60 mt-16 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative">

        {/* Popup Modal */}
        {showPopup && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg shadow-md relative animate-fade-in">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-1 right-2 text-sm font-bold text-green-700 hover:text-green-900"
            >
            </button>
            <p className="text-center font-semibold">👋 Welcome back, User!</p>
          </div>
        )}

        {/* Auth Heading */}
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        {/* Error/Success Message */}
        {message && !showPopup && (
          <div className="text-center mb-4 text-sm text-red-600 font-medium">{message}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-green-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-green-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setShowPopup(false);
            }}
            className="text-green-700 hover:underline font-medium ml-1"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </div>

      {/* Tailwind animation keyframes (if not already present) */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
