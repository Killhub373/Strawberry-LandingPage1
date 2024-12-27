import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ sidebar, setSidebar }) => {
  return (
    <div id="rumah" className="absolute top-0 left-0 w-full py-2 text-white z-20">
      <div data-aos="fade-down" className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold uppercase ">
            Straw<span className="font-normal ">Berry</span>
          </h1>
          <ul className="space-x-14 text-xl hidden lg:flex">
            <li>
              <a href="#rumah">Beranda</a>
            </li>
            <li>
              <a href="#products">Dimana Menemukannya</a>
            </li>
            <li>
              <a href="#contact">Kontak</a>
            </li>
          </ul>
          <div onClick={() => setSidebar(!sidebar)}>
            <GiHamburgerMenu className="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;