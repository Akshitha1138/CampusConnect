import { useState } from "react";
import "./App.css";

function Header() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        padding: "16px",
        textAlign: "center",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(6px)",
        fontSize: "22px",
        fontWeight: "600",
        zIndex: 10,
      }}
    >
      CampusConnect
    </div>
  );
}

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
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = () => {
    setError("");

    if (!email || !password || !role) {
      setError("All fields are required");
      return;
    }

    if (!validEmail.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password too short");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLogin({ email, role });
    }, 1000);
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ textAlign: "center" }}>Login</h3>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={inputStyle}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={inputStyle}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select Role</option>
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
        <option value="Admin">Admin</option>
      </select>

      <button onClick={submit} style={buttonStyle}>
        {loading ? "Signing in..." : "Login"}
      </button>

      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: "center" }}>
        Welcome, {user.role}
      </h2>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Logged in as {user.email}
      </p>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={boxStyle}>Announcements</div>
        <div style={boxStyle}>Notifications</div>
      </div>

      <button
        onClick={onLogout}
        style={{ ...buttonStyle, marginTop: "25px", background: "#ff6b6b" }}
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Background>
      <Header />
      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <LoginForm onLogin={setUser} />
      )}
    </Background>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.92)",
  padding: "35px",
  borderRadius: "14px",
  width: "340px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  marginTop: "70px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
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

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginTop: "10px",
};

const boxStyle = {
  background: "#f4f4f4",
  padding: "12px",
  borderRadius: "8px",
  width: "48%",
  textAlign: "center",
};

export default App;
