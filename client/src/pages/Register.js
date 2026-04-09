import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("sherlin");
  const [password, setPassword] = useState("1234");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5001/register", {
        username,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
