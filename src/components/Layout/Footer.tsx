import React from "react";
interface FooterProps {
  theme: "light" | "dark"; 
}
const Footer: React.FC<FooterProps> = ({ theme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={` dark:bg-gray-800 shadow-md mt-auto ${theme == "dark" ? "bg-black" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} To-Do Dashboard. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center items-center mt-2">
          <a
            href="#"
            className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 mx-2"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 mx-2"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 mx-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
