import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("user/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again later.");
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500 ">
            Already a member?{" "}
            <Link className="text-black underline " to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
