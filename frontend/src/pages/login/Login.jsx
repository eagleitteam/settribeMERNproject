import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const { token, user, message } = res.data;

      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);


      toast.success(message || "Login successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 800);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card fade-in">

        <div className="login-header">
          <h4>Welcome Back 👋</h4>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Login As</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="1"> Hon. Collector</option>
              <option value="2">Organiser</option>
              <option value="3">HODs</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="text-end mb-3">
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
