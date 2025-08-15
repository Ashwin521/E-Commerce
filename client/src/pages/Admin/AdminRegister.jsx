import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/admin-register",
        formData
      );

      setSuccess(data.message || "Admin registered successfully!");
      setFormData({ name: "", email: "", password: "", role: "" }); 
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error registering admin. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center my-5">
      <form
        onSubmit={handleSubmit}
        className="border border-amber-400 rounded-2xl p-6 w-96 shadow-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Register as Admin
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="mb-4">
          <h4 className="font-bold mb-2">Enter your name</h4>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <h4 className="font-bold mb-2">Enter your email</h4>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <h4 className="font-bold mb-2">Enter your password</h4>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <h4 className="font-bold mb-2">Enter your role</h4>
          <input
            type="text"
            name="role"
            placeholder="Enter role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-white rounded-md py-2 px-4 w-full hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <Link to="/admin-login">
          <button className=" underline ml-32 hover:cursor-pointer hover:text-shadow-blue-600 text-shadow-blue-700">
            Login here
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AdminRegister;
