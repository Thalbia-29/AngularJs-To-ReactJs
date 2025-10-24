import React, { useState } from 'react';
import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({ username: '', password: '', rePassword: '' });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState({ username: false, password: false, rePassword: false });
    
    const navigate = useNavigate();


    const isValid = () => user.username.trim() !== '' && user.password !== '' && user.rePassword !== '';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((u) => ({ ...u, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!isValid()) return;

        // Step 1: Check password match
        if (user.password !== user.rePassword) {
            setMessage("❌ Passwords do not match!");
            return;
        }

        setMessage("🔄 Registering...");

        try {
            // Step 2: Call Register API
           const response = await fetch("https://localhost:7023/api/auth/register", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: user.username, password: user.password }),
			});

            // Step 3: Handle success
            console.log("Registration successful:", response.data);
            setMessage("✅ Successfully registered! Redirecting to login...");

            // Redirect after short delay
            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (error) {
            console.log("Setting error message for invalid login");
            console.error('Login failed', error);
            console.error("Login or secure call failed:", error);

            setMessage("❌ Registration Failed!");
        } finally {
            setUser({ username: '', password: '' });
            setTouched({ username: false, password: false });
            setSubmitted(false);
        }
    };

    return (
        <div>
            <form name="form" className="form-signin" onSubmit={handleRegister}>
                <h1 className="form-signin-heading text-muted">Register</h1>
                <br />
                <br />

                <div className="form-group">
                    {/* <h4 className="form-signin-fields text-muted">User Name</h4> */}
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={user.username}
                        placeholder='Enter your Username'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ width: '350px' }}
                        required
                        autoFocus
                    />

                    {/* <h4 className="form-signin-fields text-muted">Password</h4> */}
                    <input
                        type="password"
                        className="form-control"
                        name="rePassword"
                        placeholder='Enter your password'
                        value={user.rePassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ width: '350px' }}
                        required
                    />

                    {/* <h4 className="form-signin-fields text-muted">Re-enter Password</h4> */}
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder='Re-enter your password'
                        value={user.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ width: '350px' }}
                        required
                    />

                </div>

                <br />

                <button
                    className="btn btn-lg btn-primary btn-block"
                    disabled={!isValid()}
                    style={{ width: '250px' }}
                    type="submit"
                >
                    Register
                </button>

                {/* <button
              type="submit"
              style={{
                padding: "10px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background 0.2s",
                marginTop: "10px",
              }}
            >
              Sign Up
            </button> */}


                <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <span>Already have an account? </span>
                    <Link
                        to="/login"
                        style={{ color: "#007bff", textDecoration: "underline" }}
                    >
                        Login
                    </Link>
                </div>

                {message && (
                    <p style={{ marginTop: "20px", marginLeft: "20px", textAlign: 'center',fontWeight: "bold" }}>{message}</p>
                )}

            </form>
        </div>
    );
}

export default Register;
