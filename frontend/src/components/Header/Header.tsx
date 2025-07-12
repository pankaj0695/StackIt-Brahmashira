import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Header: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <header className="header">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>
        StackIt
      </Link>
      <div>
        {user ? (
          <>
            <span className="user-name">Hello, {user.name}</span>
            <button
              className="logout-btn"
              onClick={logout}
              style={{ marginLeft: 12 }}
            >
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
