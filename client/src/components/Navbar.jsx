import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeStyles = {
    color: "white",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/");
    toast("Logout!");
  };

  return (
    <>
      <div className="flex py-4 justify-between items-center">
        <span className="flex justify-center items-center p-2 bg-gray-700 text-xs text-white rounded-sm">
          MERN-BLOG
        </span>

        {isAuth && (
          <ul className="flex gap-8">
            <li>
              <NavLink
                to={"/"}
                href="/"
                className="text-xs text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Main
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/posts"}
                href="/"
                className="text-xs text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/new"}
                href="/"
                className="text-xs text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Add Post
              </NavLink>
            </li>
          </ul>
        )}

        <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
          {isAuth ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </>
  );
};
