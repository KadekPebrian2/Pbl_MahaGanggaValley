import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// Import CSS teman kamu
import "../../../css/Auth.css";

// === Komponen Ikon (Sama persis) ===
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

export default function Login({ status, canResetPassword }) {
    // 1. Pakai useForm dari Inertia (Jantungnya Laravel)
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        // Kirim data ke rute 'login' Laravel
        post(route('login'));
    };

    return (
        <div className="auth-full-screen-wrapper">
            <Head title="Log in" />
            
            <div className="auth-background-image"></div>
            
            {/* Tombol Kembali (Pakai Link Inertia) */}
            <Link href="/" className="auth-back-btn" aria-label="Kembali">
                <IconArrowLeft />
            </Link>

            <div className="auth-center-form-container">
                <div className="auth-title-block">
                    <span className="title-main">Sign In</span>
                    <span className="title-sub">to Maha Gangga Valley</span>
                </div>

                {status && <div style={{color: '#86efac', marginBottom: '15px'}}>{status}</div>}

                <form onSubmit={submit}>
                    {/* Input Email (Ganti username jadi email agar cocok dgn Laravel) */}
                    <div className="form-group-centered">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required 
                        />
                        <span className="input-icon-centered"><IconUser /></span>
                        {/* Pesan Error */}
                        {errors.email && <div style={{color: '#fca5a5', fontSize: '12px', textAlign: 'left', marginTop: '5px', marginLeft: '10px'}}>{errors.email}</div>}
                    </div>
                    
                    {/* Input Password */}
                    <div className="form-group-centered">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required 
                        />
                        <span className="input-icon-centered"><IconLock /></span>
                        {errors.password && <div style={{color: '#fca5a5', fontSize: '12px', textAlign: 'left', marginTop: '5px', marginLeft: '10px'}}>{errors.password}</div>}
                    </div>

                    <button type="submit" className="auth-submit-button-centered" disabled={processing}>
                        {processing ? 'LOGGING IN...' : 'SIGN IN'}
                    </button>

                    <div className="auth-options-centered">
                        <label className="remember-me-checkbox">
                            <input 
                                type="checkbox" 
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span>Remember Me</span>
                        </label>
                        {/* Link Forgot Password (Opsional) */}
                        {canResetPassword && (
                            <Link href={route('password.request')}>Forgot Password</Link>
                        )}
                    </div>
                </form>

                <p className="auth-switch-link-bottom">
                    Don't have an account? <Link href={route('register')}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
}