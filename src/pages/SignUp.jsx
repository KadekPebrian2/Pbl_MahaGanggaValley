// src/pages/SignUp.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Auth.css";

// Komponen Ikon
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 7L2 7"></path></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Sign Up dikirim");
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
          <span className="title-main">Sign Up</span>
          <span className="title-sub">to Maha Gangga Valley</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group-centered">
            <input type="email" id="email" placeholder="Email" required />
            <span className="input-icon-centered"><IconMail /></span>
          </div>
          <div className="form-group-centered">
            <input type="password" id="password" placeholder="Password" required />
            <span className="input-icon-centered"><IconLock /></span>
          </div>

          <button type="submit" className="auth-submit-button-centered">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="auth-switch-link-bottom">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}