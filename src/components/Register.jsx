import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/style.css"; 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    document.body.classList.add('login-register-background');

    
    return () => {
      document.body.classList.remove('login-register-background');
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2026/api/user/register", {
        email: email,
        password: password,
        name: name,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil Register!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register Gagal",
        text: "Periksa kembali email dan password Anda",
      });
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-xs bg-white p-8 rounded shadow-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-primary hover:primaryDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Register
          </button>
        </div>
      </form>
      <p className="text-center">
        Sudah punya akun? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
  );
};

export default Register;
