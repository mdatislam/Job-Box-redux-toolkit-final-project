import React from 'react';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {
  const { pathname } = useLocation();
  //console.log(import.meta.env)
  return (
    <div>
      <Navbar />
      <div
        className={` ${pathname === "/" ? "max-w-[1600px] px-5" : "max-w-7xl"
          } max-w-[1600px] mx-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Main;