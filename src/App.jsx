import { useState } from "react";
import "./App.css";

/* ================= HEADER ================= */
function Header() {
  return (
    <div style={headerStyle}>
      CampusConnect
    </div>
  );
}

/* ================= BACKGROUND ================= */
function Background({ children }) {
  return (
    <div style={backgroundStyle}>
      {children}
    </div>
  );
}

/* ================= LOGIN ================= */
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

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
    onLogin({ email, role });
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ textAlign: "center" }}>Login</h3>

      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />

      <select value={role} onChange={e => setRole(e.target.value)} style={inputStyle}>
        <option value="">Select Role</option>
        <option>Student</option>
        <option>Faculty</option>
      </select>

      <button onClick={submit} style={buttonStyle}>Login</button>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

function Dashboard({ user }) {
  return (
    <div style={cardStyle}>
      <h2 style={title}>Welcome</h2>
      <p style={subText}>{user.email}</p>
      <p style={subText}>{user.role}</p>
    </div>
  );
}

/* ================= CONNECT ================= */
function ConnectPage() {
  const [profiles, setProfiles] = useState([
    { name: "Arjun", interest: "Web Dev", status: "pending" },
    { name: "Meera", interest: "AI & ML", status: "pending" }
  ]);

  const update = (i, s) => {
    const copy = [...profiles];
    copy[i].status = s;
    setProfiles(copy);
  };

  return (
    <div style={cardStyle}>
      <h3 style={title}>Connect</h3>

      {profiles.map((p, i) => (
        <div key={i} style={profileCard}>
          <h4>{p.name}</h4>
          <small>{p.interest}</small>

          {p.status === "pending" && (
            <>
              <button style={miniBtn} onClick={() => update(i, "connected")}>Connect</button>
              <button style={miniBtnAlt} onClick={() => update(i, "skipped")}>Skip</button>
            </>
          )}

          {p.status === "connected" && <p style={{ color: "#4caf50" }}>✔ Connected</p>}
          {p.status === "skipped" && <p style={{ color: "#ff6b6b" }}>✖ Skipped</p>}
        </div>
      ))}
    </div>
  );
}

/* ================= PROFILE ================= */
function ProfilePage({ user }) {
  return (
    <div style={cardStyle}>
      <h3 style={title}>My Profile</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Bio: Learning. Growing. Connecting.</p>
    </div>
  );
}

/* ================= MESSAGES ================= */
function MessagesPage() {
  return (
    <div style={cardStyle}>
      <h3 style={title}>Messages</h3>
      <p style={subText}>No messages yet 🌙</p>
    </div>
  );
}

/* ================= BOTTOM NAV ================= */
function BottomNav({ setPage, page }) {
  return (
    <div style={bottomNav}>
      <button style={navBtn(page === "messages")} onClick={() => setPage("messages")}>💬</button>
      <button style={navBtn(page === "connect")} onClick={() => setPage("connect")}>🤝</button>
      <button style={navBtn(page === "profile")} onClick={() => setPage("profile")}>👤</button>
    </div>
  );
}

/* ================= APP ================= */
function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  return (
    <Background>
      <Header />

      {page === "login" && <LoginForm onLogin={(u) => { setUser(u); setPage("dashboard"); }} />}
      {page === "dashboard" && <Dashboard user={user} />}
      {page === "connect" && <ConnectPage />}
      {page === "profile" && <ProfilePage user={user} />}
      {page === "messages" && <MessagesPage />}

      {user && page !== "login" && <BottomNav setPage={setPage} page={page} />}
    </Background>
  );
}

/* ================= STYLES ================= */
const backgroundStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #14102c, #2a1d5f)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: "70px"
};

const headerStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  textAlign: "center",
  padding: "14px",
  background: "#1e1a3c",
  color: "#f3eaff",
  fontSize: "20px",
  zIndex: 10
};

const bottomNav = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  background: "#1e1a3c",
  padding: "10px 0"
};

const navBtn = active => ({
  background: active ? "#6c63ff" : "transparent",
  border: "none",
  fontSize: "22px",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: "12px"
});

const cardStyle = {
  background: "#221b4a",
  padding: "28px",
  borderRadius: "16px",
  width: "320px",
  color: "#f0ebff",
  marginTop: "60px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
};

const title = { textAlign: "center" };
const subText = { textAlign: "center", opacity: 0.8 };
const inputStyle = { width: "100%", padding: "10px", margin: "8px 0", background: "#2f2769", color: "#fff", border: "none", borderRadius: "8px" };
const buttonStyle = { width: "100%", padding: "10px", background: "#6c63ff", border: "none", borderRadius: "8px", color: "#fff" };
const errorStyle = { color: "#ff7a7a", textAlign: "center" };
const profileCard = { background: "#2b245c", padding: "12px", borderRadius: "12px", marginTop: "10px", textAlign: "center" };
const miniBtn = { margin: "6px", padding: "6px 14px", background: "#6c63ff", border: "none", color: "#fff", borderRadius: "8px" };
const miniBtnAlt = { ...miniBtn, background: "#444" };

export default App;
