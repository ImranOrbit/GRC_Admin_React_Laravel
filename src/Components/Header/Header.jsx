import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdNotificationsActive, MdDarkMode } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import Swal from "sweetalert2";
import myImage from "../../image/Logo.png";

const Header = ({  toggleTheme, onLogout, profileName, profileImage  }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToMessages = () => navigate("/messages");
  const goToNotifications = () => navigate("/notifications");

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f16f22",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        Swal.fire("Logged out!", "You have been logged out.", "success").then(
          () => {
            navigate("/");
          }
        );
      }
    });
  };

  const handleGoToProfile = () => {
    navigate("/Profile"); // 🔹 Navigate to /profile route
  };

  return (
    <header
      // 🔧 Sticky Header styling added here
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-4 shadow-md font-poppins 
        ${
          document.documentElement.classList.contains("dark")
            ? "bg-[#001529] text-white"
            : "bg-white text-black"
        }`}
    >
      {/* Logo Section */}
      <div className="flex-1 flex items-center">
        <Link to="/" className="cursor-pointer">
          <img src={myImage} alt="Finwise Logo" className="w-32 h-auto" />
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 ml-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <MdDarkMode className="text-[#f16f22] dark:text-[#f7941d]" />
        </button>

        {/* Messages Icon */}
        <button
          onClick={goToMessages}
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <FaMessage className="text-[#f16f22] dark:text-[#f7941d]" />
        </button>

        {/* Notifications Icon */}
        <button
          onClick={goToNotifications}
          className="relative p-3 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <MdNotificationsActive className="text-[#f16f22] dark:text-[#f7941d]" />
        </button>

        {/* Profile Menu */}
        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleMenu}
          >
            <img
              src="/src/image/man-with-photo-camera-his-holidays.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-sm font-medium text-gray-700 dark:text-white">
                Chowdhury Imran
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Full Stack Developer
              </p>
            </div>
          </div>

        
          {isMenuOpen && (
            <div className="absolute bg-[#f16f22] shadow-lg rounded-lg p-7 mt-5 right-4">
              <ul>
                <li
                  className="p-2 text-white cursor-pointer"
                  onClick={handleGoToProfile} // 🔹 Add onClick handler
                >
                  My Profile
                </li>
                <li className="p-2 text-white cursor-pointer">Setting</li>
                <li
                  className="p-2 text-white cursor-pointer hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        

      </div>
    </header>
  );
};

export default Header;
