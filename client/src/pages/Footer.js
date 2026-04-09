import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <h3 className="footer-title">🎓 Student Management System</h3>

        <p className="footer-text">
          Manage students, attendance, and performance with ease.
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/about">About</a>
          <a href="/add-marks">Add Marks</a>
          <a href="/marks">View Marks</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} All Rights Reserved | Developed by You 💻
        </p>

      </div>
    </footer>
  );
}

export default Footer;