import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => (
  <div className="auth-container">
    <h2 className="auth-title">Sign Up</h2>
    <form className="auth-form">
      <label htmlFor="username">Username</label>
      <input id="username" type="text" placeholder="Username" required />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" placeholder="Email" required />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" placeholder="Password" required />
      <button type="submit" className="signup-btn">Sign Up</button>
    </form>
    <p className="auth-link">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
);

export default Signup;