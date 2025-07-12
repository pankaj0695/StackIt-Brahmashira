import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => (
  <div className="auth-container">
    <h2 className="auth-title">Login</h2>
    <form className="auth-form">
      <label htmlFor="email">Email</label>
      <input id="email" type="email" placeholder="Email" required />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" placeholder="Password" required />
      <button type="submit" className="login-btn">Login</button>
    </form>
    <p className="auth-link">
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </p>
  </div>
);

export default Login;