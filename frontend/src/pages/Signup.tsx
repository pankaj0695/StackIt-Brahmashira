import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import styles from "./Auth.module.css";

const Signup: React.FC = () => {
  const { register } = useUser();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
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
      const msg = await register(form);
      setMessage(msg);
      setForm({ name: "", username: "", email: "", password: "" });
      navigate("/");
    } catch (err: any) {
      setMessage(err.message || "Registration failed");
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
          <h2 className={styles["auth-title"]}>Create your StackIt account</h2>
          <div className={styles["auth-subtitle"]}>
            Sign up to join the community
          </div>
        </div>
        <form
          className={styles["auth-form"]}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label htmlFor="name" className={styles["auth-label"]}>
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className={styles["auth-input"]}
            autoFocus
          />
          <label htmlFor="username" className={styles["auth-label"]}>
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            required
            value={form.username}
            onChange={handleChange}
            className={styles["auth-input"]}
          />
          <label htmlFor="email" className={styles["auth-label"]}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className={styles["auth-input"]}
          />
          <button
            type="submit"
            className={styles["signup-btn"]}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {message && <div className={styles["auth-message"]}>{message}</div>}
        </form>
        <p className={styles["auth-link"]}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
