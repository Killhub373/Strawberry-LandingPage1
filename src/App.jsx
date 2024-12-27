import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./components/Hero";
import Masakan from "./components/Masakan";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Testimonial from "./components/Testimonial";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductTable from "./components/ProductTable";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen justify-center items-center bg-fuji">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin setAdminAuthenticated={setAdminAuthenticated} />} />
          <Route path="/admin" element={isAdminAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" />} />
          <Route path="/home" element={isAuthenticated ? (
            <>
              <Hero />
              <Masakan />
              <Product />
              <ProductTable />
              <Testimonial />
              <Footer />
            </>
          ) : (
            <Navigate to="/login" />
          )} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
