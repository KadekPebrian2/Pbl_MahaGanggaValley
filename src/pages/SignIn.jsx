// src/pages/SignIn.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Auth.css";

// Komponen Ikon
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Sign In dikirim");
  };

  return (
    <div className="auth-full-screen-wrapper">
      <div className="auth-background-image"></div>
      <button className="auth-back-btn" onClick={() => navigate("/")} aria-label="Kembali">
        <IconArrowLeft />
      </button>

      <div className="auth-center-form-container">
        {/* === PERBAIKAN: Judul dipecah jadi 2 baris === */}
        <div className="auth-title-block">
          <span className="title-main">Sign In</span>
          <span className="title-sub">to Maha Gangga Valley</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group-centered">
            <input type="text" id="username" placeholder="Username" required />
            <span className="input-icon-centered"><IconUser /></span>
          </div>
          <div className="form-group-centered">
            <input type="password" id="password" placeholder="Password" required />
            <span className="input-icon-centered"><IconLock /></span>
          </div>

          <button type="submit" className="auth-submit-button-centered">
            SIGN IN
          </button>

          <div className="auth-options-centered">
            <label className="remember-me-checkbox">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>

        <p className="auth-switch-link-bottom">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}