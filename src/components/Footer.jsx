import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import footerLogo from "../assets/orgu.png";

const Footer = () => {
  return (
    <div  data-aos="fade-up" data-aos-duration="300" id="about" className="bg-primaryDark">
      <section className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 py-5">
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 text-white">
              <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
              STRAWBERRY
            </h1>
            <p className="text-white">
              StrawBerry, buah yang lezat, menyehatkan, dan menyenangkan
            </p>
            <br />
            <div id="contact" className="flex items-center gap-3 text-white">
              <FaLocationArrow />
              <p>Semarang</p>
            </div>
            <div className="flex items-center gap-3 mt-3 text-white">
              <FaMobileAlt />
              <p>+62 127-6879-0065</p>
            </div>
            <div className="flex items-center gap-3 mt-6 text-white">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="https://id.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-3xl" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div className="">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-white">
                  
                </h1>

              </div>
            </div>
            <div className="">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-white">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3 text-white">
                  <li className="cursor-pointer">Home</li>
                  <li className="cursor-pointer">About</li>
                  <li className="cursor-pointer">Services</li>
                  <li className="cursor-pointer">Login</li>
                </ul>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-white">
                  Links
                </h1>
                <ul className="flex flex-col gap-3 text-white">
                  <li className="cursor-pointer">Home</li>
                  <li className="cursor-pointer">About</li>
                  <li className="cursor-pointer">Services</li>
                  <li className="cursor-pointer">Login</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center py-10 border-t-2 border-gray-300/50 text-white">
            &copy; 2024 All rights reserved || Made with VSCode by Linggo
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
