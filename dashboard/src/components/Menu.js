import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = ({ username }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      const frontendUrl =
        process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
      window.location.href = frontendUrl;
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : "ZU";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div style={{ position: "relative" }}>
          <div
            className="profile"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            <div className="avatar">{initials}</div>
            <p className="username">{username || "USERID"}</p>
          </div>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "4px",
                zIndex: 1000,
                minWidth: "140px",
                padding: "8px 0",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "8px 16px",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#df514c",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
