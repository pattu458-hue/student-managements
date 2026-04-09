import React, { useState } from "react";
import { loginUser } from "../api";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });

      if (res.data.success) {
        alert("Login successful!");
        localStorage.setItem("isLoggedIn", "true"); // ✅ save login state
        setIsLoggedIn(true); // ✅ update state
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;