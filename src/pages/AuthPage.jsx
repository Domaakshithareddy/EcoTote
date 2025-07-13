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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (isLogin) {
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        setMessage("Logged in successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect to AllProducts page
        }, 1000);
      } else {
        setMessage("Invalid credentials.");
      }
    } else {
      setMessage("Account created!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 ml-60 mt-16 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        {message && (
          <div className="text-center mb-4 text-sm text-blue-600 font-medium">{message}</div>
        )}

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
            }}
            className="text-green-700 hover:underline font-medium ml-1"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
