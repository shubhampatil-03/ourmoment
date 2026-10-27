
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const { token, userId, name, email } = response.data;

      if (!token) {
        toast.error("Login succeeded but no token was returned.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      toast.success(`Welcome, ${name}!`);
      navigate("/create-invitation");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (typeof error.response?.data === "string"
            ? error.response.data
            : "Login failed. Check your email and password.")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="brand auth-brand">
          <span className="brand-heart">♥</span> OurMoment
        </Link>

        <span className="eyebrow">WELCOME BACK</span>
        <h1>Let's continue your story.</h1>
        <p className="auth-description">
          Sign in to create and manage your invitations.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <button className="primary-button auth-submit" disabled={loading}>
            {loading ? "Signing in..." : "Log in ♡"}
          </button>
        </form>

        <p className="auth-switch">
          New to OurMoment? <Link to="/register">Create an account</Link>
        </p>

        <Link to="/" className="back-home">← Back to home</Link>
      </section>
    </main>
  );
}

export default Login;
