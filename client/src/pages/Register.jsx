import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.removeItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center  min-h-screen px-5 bg-gray-500">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 shadow-lg rounded-xl"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="mb-4">
            <label className="font-bold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>

          <div className="mb-4">
            <p>
              Already have an account?
              <span className="mt-4 text-center text-gray-600 text-sm">
                {" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login here
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
