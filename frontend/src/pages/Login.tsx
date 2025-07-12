import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import styles from "./Auth.module.css";

const Login: React.FC = () => {
  const { login } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const msg = await login(form);
      setMessage(msg);
      setForm({ email: "", password: "" });
      navigate("/");
    } catch (err: any) {
      setMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["auth-bg"]}>
      <div className={styles["auth-card"]}>
        <div className={styles["auth-logo"]}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" rx="12" fill="#2B47F4" />
            <path
              d="M14 22H30"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M22 14V30"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <h2 className={styles["auth-title"]}>Welcome Back</h2>
          <div className={styles["auth-subtitle"]}>
            Sign in to your StackIt account
          </div>
        </div>
        <form className={styles["auth-form"]} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles["auth-label"]}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={form.email}
            onChange={handleChange}
            className={styles["auth-input"]}
          />
          <label htmlFor="password" className={styles["auth-label"]}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            value={form.password}
            onChange={handleChange}
            className={styles["auth-input"]}
          />
          <button
            type="submit"
            className={styles["primary-btn"]}
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
          {message && <div className={styles["auth-message"]}>{message}</div>}
        </form>
        <p className={styles["auth-link"]}>
          New to StackIt? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
