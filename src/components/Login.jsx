import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/style.css"; 

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    document.body.classList.add('login-register-background');


    return () => {
      document.body.classList.remove('login-register-background');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2026/api/user/login", {
        email: email,
        password: password,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil Login!",
        showConfirmButton: false,
        timer: 1500,
      });

      setIsAuthenticated(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Periksa kembali email dan password Anda",
      });
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-xs bg-white p-8 rounded shadow-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
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
          <button className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Login
          </button>
        </div>
      </form>
      <p className="text-center">
        Belum punya akun? <a href="/register" className="text-blue-500">Register</a>
      </p>
    </div>
  );
};

export default Login;
