import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="header">
    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
      StackIt
    </Link>
    <div>
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
      <Link to="/signup">
        <button className="signup-btn">Sign Up</button>
      </Link>
    </div>
  </header>
);

export default Header;