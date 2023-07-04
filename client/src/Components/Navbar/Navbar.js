import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../Context/actions/authAction";
import { useLocation } from "react-router-dom";

const withoutSidebarRoutes = ["user"];

const Navbar = () => {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(signOut(navigate));
  };

  if (withoutSidebarRoutes.some((item) => pathname.includes(item))) {
    return null;
  }

  return (
    <nav className="bg-gray-300 bg-opacity-10 fixed w-full shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-gradient text-[45px]">
            Factory
          </a>
          <div className="hidden md:block float-right">
            <div className="ml-10 space-x-4">
              <a
                href="/"
                className="text-gray-300 hover:bg-gray-400 hover:bg-opacity-40 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              {auth?.id ? (
                <>
                  <a
                    href={`/user/${auth.id}`}
                    className="text-gray-300 hover:bg-gray-400 hover:bg-opacity-40 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Profile
                  </a>
                  <button
                    onClick={logoutHandler}
                    className="text-gray-300 hover:bg-gray-400 hover:bg-opacity-40 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log-Out
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="text-gray-300 hover:bg-gray-400 hover:bg-opacity-40 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
