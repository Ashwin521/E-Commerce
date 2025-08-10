import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex justify-center items-center  min-h-screen p-5">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div>
            <h2>Name</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <h2>Email</h2>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <h2>Password</h2>
            <input
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <h2>
              Already have an account? <a href="/login">Login here</a>
            </h2>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
