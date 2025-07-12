import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>
        StackIt
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {user ? (
          <>
            <span className="user-name">Hello, {user.name}</span>
            <button
              className="profile-icon-btn"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: 8,
                marginRight: 8,
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => navigate("/user")}
              title="Profile"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ borderRadius: "50%", background: "#eaf1ff" }}
              >
                <circle cx="17" cy="17" r="17" fill="#eaf1ff" />
                <ellipse cx="17" cy="14" rx="6.5" ry="6.5" fill="#2B47F4" />
                <ellipse cx="17" cy="25" rx="10" ry="5" fill="#3D82F3" />
              </svg>
            </button>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
