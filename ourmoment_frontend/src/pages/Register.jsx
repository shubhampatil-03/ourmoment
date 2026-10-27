
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    if (form.password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (typeof error.response?.data === "string"
            ? error.response.data
            : "Registration failed. Please check your details.")
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

        <span className="eyebrow">A NEW CHAPTER BEGINS</span>
        <h1>Create your account</h1>
        <p className="auth-description">
          Make a little space for the moments that matter.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={100}
            autoComplete="name"
          />

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
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            autoComplete="new-password"
          />

          <button className="primary-button auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account ♡"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <Link to="/" className="back-home">← Back to home</Link>
      </section>
    </main>
  );
}

export default Register;
