import React, { useState } from 'react';
import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LogIn({ onSubmit }) {
	const [user, setUser] = useState({ username: '', password: '' });
	const [touched, setTouched] = useState({ username: false, password: false });
	const [submitted, setSubmitted] = useState(false);
	const [isHoveredLogin, setIsHoveredLogin] = useState(false);

	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((u) => ({ ...u, [name]: value }));
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((t) => ({ ...t, [name]: true }));
	};

	const isValid = () => user.username.trim() !== '' && user.password !== '';


	const showError = (field) => submitted || touched[field];

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (!isValid()) return;

		try {
			const resp = await fetch('https://localhost:7023/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: user.username, password: user.password }),
			});

			if (!resp.ok) throw new Error(`Login failed (${resp.status})`);
			const data = await resp.json();
			const token = data?.accessToken || data?.token || null;

			if (!token) throw new Error('Token not returned from login API');

			localStorage.setItem('token', token);
			localStorage.setItem('username', user.username || '');
			console.log('Login successful, token and username stored');
			navigate('/templates');

		} catch (error) {
			console.log("Setting error message for invalid login");
			console.error('Login failed', error);
			console.error("Login or secure call failed:", error);

			setMessage("❌ Invalid login or access denied!");
		} finally {
			setUser({ username: '', password: '' });
			setTouched({ username: false, password: false });
			setSubmitted(false);
		}
	};

	return (
		<div>
			<form name="form" className="form-signin" onSubmit={handleLogin}>
				<h1 className="form-signin-heading text-muted">Sign In</h1>
				<br />
				<br />

				<div className="form-groups">
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
						name="password"
						placeholder='Enter your password'
						value={user.password}
						onChange={handleChange}
						onBlur={handleBlur}
						style={{ width: '350px' }}
						required
					/>

				</div>

				<br />
				<button
					className="btns btn-lg btn-primary btn-block"
					disabled={!isValid()}
					style={{ width: '250px' }}
					type="submit"
				>
					Sign In
				</button>

				<div style={{ marginTop: "16px", textAlign: "center" }}>
					<span>Don't have an account? </span>
					<Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>Sign up</Link>
				</div>
				{message && <p style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center" }}>{message}</p>}
			</form>


		</div>
	);
}
