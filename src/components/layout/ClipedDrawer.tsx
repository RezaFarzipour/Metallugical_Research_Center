"use client";

import React, { useState } from "react";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { sidebarlinks } from "@/constants/data";
import { MdOutlineCancel } from "react-icons/md";

type ClipedDrawerProps = {
  children: React.ReactNode;
};

const ClipedDrawer = ({ children }: ClipedDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [idKeeper, setIdKeeper] = useState<number>();

  return (
    <div className="flex h-screen">
      {/* Sidebar - Hidden on mobile */}
      <div
        className={`fixed md:relative bg-default-50 flex flex-col items-center h-full py-8 px-4 w-[280px] z-50 transition-all duration-300 
    ${isOpen ? "right-0" : "-right-[300px]"} md:right-0 md:left-0`}
      >
        {/* Logo Section */}
        <div className="flex justify-between align-center text-center w-full">
          <h3 className="mb-9">logo section</h3>
          <div className="md:hidden block">
            <MdOutlineCancel size={"20px"} onClick={() => setIsOpen(false)} />
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col justify-between h-full w-full">
          <div className="w-full">
            {sidebarlinks.map((link, index) => (
              <div className="border-r-9" key={link.title}>
                <div
                  onClick={() => setIdKeeper(link.id)}
                  className={`flex justify-start w-full gap-3 py-4 px-2 rounded-md cursor-pointer transition-all duration-300 hover:${
                    link.hover
                  } ${index === idKeeper ? "bg-default-200 font-bold " : null}`}
                >
                  <span className="text-xl ">
                    <link.icon />
                  </span>
                  <p
                    className={`text-xl text-default-500 transition-all duration-300 hover:${link.hover}`}
                  >
                    {link.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* User Name Section */}
          <div>
            <p>نام کاربر</p>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content Section */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <div className="w-full bg-default-50 flex justify-between py-6 px-4 items-center shadow-md">
          {/* Menu Button (only in mobile) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiMenu />
          </button>

          <p>سلام کاربر | صبح بخیر</p>

          <div className="flex items-center gap-4 text-xl">
            <div className="cursor-pointer p-3 bg-white border-1 border-black-300 rounded-full">
              {" "}
              <FiShoppingCart size={"23px"} />
            </div>

            <div className=" cursor-pointer p-3 bg-white border-1 border-black-300 rounded-full">
              <CgProfile size={"23px"} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-grow bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default ClipedDrawer;
