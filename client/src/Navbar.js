import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Check login from localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    window.location.reload(); // refresh UI
  };

  return (
    <nav className="navbar">

      {/* 🔵 LOGO */}
      <div className="logo">🎓 StudentMS</div>

      {/* 🔗 NAV LINKS */}
      <div className="nav-links">
        {isLoggedIn && (
          <>
             <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/dashboard" >Dashboard</Link>
      <Link to="/attendance">Attendance</Link>
      <Link to="/add-marks">Add Marks</Link>
      <Link to="/marks">View Marks</Link>
          </>
        )}
      </div>

      {/* 👉 RIGHT SIDE */}
      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;