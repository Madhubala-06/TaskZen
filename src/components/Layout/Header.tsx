import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header
      className={`flex   py-4 px-4   sm:mx-6 mx-4 lg:mx-10 my-4 rounded-md sm:px-4 font-[sans-serif] min-h-[70px] tracking-wide relative z-50 ${theme === "dark" ? "bg-neutral-900 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="flex justify-between gap-5 w-full">
        <a href="javascript:void(0)" className="flex gap-x-2">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="logo"
            className="w-10 h-10 rounded-md"
          />
          <span className="text-violet-500 my-auto">TASKZEN</span>
        </a>
      </div>
      <button onClick={toggleTheme} className="ml-4">
        {theme === "dark" ? (
          <Sun className="text-yellow-400" size={24} />
        ) : (
          <Moon className="text-violet-400" size={24} />
        )}
      </button>
    </header>
  );
};

export default Header;
