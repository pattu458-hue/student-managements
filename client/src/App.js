import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import AttendancePage from "./pages/AttendancePage";
import Register from "./pages/Register";

import { getStudents } from "./api";
import Footer from "./components/Footer";
import AddMarks from "./components/AddMarks";
import MarksPage from "./pages/MarksPage";


function App() {
  const [students, setStudents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        {!isLoggedIn ? (
          <>
            
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {/* Register route */}
            <Route path="/register" element={<Register />} />
            {/* Default fallback to login */}
            <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={<Home students={students} fetchStudents={fetchStudents} />}
            />
            <Route
              path="/dashboard"
              element={<DashboardPage students={students} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/attendance"
              element={<AttendancePage students={students} fetchStudents={fetchStudents} />}
            />
            <Route path="/add-marks" element={<AddMarks />} />
        <Route path="/marks" element={<MarksPage />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;