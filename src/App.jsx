import { useState } from "react";
import "./App.css";

function Background({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/vite.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = () => {
    setError("");
    setSuccess("");

    if (!email || !password || !role) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSuccess(`Welcome ${role}`);
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        padding: "35px",
        borderRadius: "14px",
        width: "320px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>CampusConnect</h1>
      <h3 style={{ textAlign: "center" }}>Login</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ ...inputStyle, width: "100%" }}
      >
        <option value="">Select Role</option>
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
        <option value="Admin">Admin</option>
      </select>

      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}

      {success && (
        <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
          {success}
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <Background>
      <LoginForm />
    </Background>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#6c63ff",
  color: "#fff",
  cursor: "pointer",
};

export default App;
