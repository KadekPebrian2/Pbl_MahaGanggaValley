import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import "../../../css/Auth.css"; 

// Ikon Tambahan (User Badge untuk Nama)
const IconBadge = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="auth-full-screen-wrapper">
            <Head title="Register" />
            <div className="auth-background-image"></div>
            
            <Link href="/" className="auth-back-btn" aria-label="Kembali">
                <IconArrowLeft />
            </Link>

            <div className="auth-center-form-container">
                <div className="auth-title-block">
                    <span className="title-main">Sign Up</span>
                    <span className="title-sub">Join Maha Gangga Valley</span>
                </div>

                <form onSubmit={submit}>
                    {/* Input Nama */}
                    <div className="form-group-centered">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required 
                        />
                        <span className="input-icon-centered"><IconBadge /></span>
                        {errors.name && <div style={{color: '#fca5a5', fontSize: '12px', textAlign: 'left', marginTop: '5px', marginLeft: '10px'}}>{errors.name}</div>}
                    </div>

                    {/* Input Email */}
                    <div className="form-group-centered">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required 
                        />
                        <span className="input-icon-centered"><IconMail /></span>
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

                    {/* Input Konfirmasi Password */}
                    <div className="form-group-centered">
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required 
                        />
                        <span className="input-icon-centered"><IconLock /></span>
                        {errors.password_confirmation && <div style={{color: '#fca5a5', fontSize: '12px', textAlign: 'left', marginTop: '5px', marginLeft: '10px'}}>{errors.password_confirmation}</div>}
                    </div>

                    <button type="submit" className="auth-submit-button-centered" disabled={processing}>
                        {processing ? 'REGISTERING...' : 'SIGN UP'}
                    </button>
                </form>

                <p className="auth-switch-link-bottom">
                    Already have an account? <Link href={route('login')}>Sign In</Link>
                </p>
            </div>
        </div>
    );
}