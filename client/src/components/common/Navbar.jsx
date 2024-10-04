import { useState } from "react";
import { Link } from "react-router-dom";
import appLogo from "../../assets/appLogo.png";
import { useSelector } from "react-redux";
import { getUserProfileInfo } from "../../reducer/userSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInfo = useSelector(getUserProfileInfo);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-blue-500">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <div>
          <img src={appLogo} alt="appLogo" className="w-full h-14" />
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="navbar-burger flex items-center text-blue-600 p-3"
            aria-expanded={isMenuOpen}
            aria-controls="navbar-menu"
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          {/* Menu items */}
          <li>
            <Link to="/">
              <div className="text-sm text-gray-400 hover:text-gray-500">
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link to="/posts">
              <div className="text-sm text-gray-400 hover:text-gray-500 ">
                Posts
              </div>
            </Link>
          </li>
          <li>
            <Link to="/connect">
              <div className="text-sm text-gray-400 hover:text-gray-500">
                Connect
              </div>
            </Link>
          </li>
        </ul>
        {userInfo ? (
          <Link to="/UserPage">
            <img
              src={userInfo.profilePicURL}
              alt="userImage"
              className="w-full h-10 rounded-3xl"
            />
          </Link>
        ) : (
          <Link to="/signIn">
            <div className="hidden lg:inline-block py-2 px-6 bg-pink-500 active:bg-pink-600 text-sm text-white font-bold rounded-xl transition duration-200">
              Sign up
            </div>
          </Link>
        )}
      </nav>
      <div
        id="navbar-menu"
        className={`navbar-menu relative z-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none">
              <svg className="h-12" alt="logo" viewBox="0 0 10240 10240">
                <path xmlns="http://www.w3.org/2000/svg"></path>
              </svg>
            </a>
          </div>
          {userInfo ? (
            <Link to="/UserPage">
              <img
                src={userInfo.profilePicURL}
                alt="userImage"
                className="w-full h-10 rounded-3xl"
              />
            </Link>
          ) : (
            <Link to="/signIn">
              <div className="hidden lg:inline-block py-2 px-6 bg-pink-500 active:bg-pink-600 text-sm text-white font-bold rounded-xl transition duration-200">
                Sign up
              </div>
            </Link>
          )}
          <ul>
            {/* Mobile menu items */}
            <li>
              <Link to="/">
                <div className="text-sm text-gray-400 hover:text-gray-500">
                  Home
                </div>
              </Link>
            </li>
            <li>
              <Link to="/posts">
                <div className="text-sm text-blue-600 font-bold">Posts</div>
              </Link>
            </li>
            <li>
              <Link to="/connect"> 
                <div className="text-sm text-gray-400 hover:text-gray-500">
                  Connect
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
