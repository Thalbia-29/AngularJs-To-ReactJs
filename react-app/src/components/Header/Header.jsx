import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'username') setUsername(e.newValue || '');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="brand">Med Assist</div>
      <h2>Welcome, {username ? ` ${username}` : ''}</h2>
      <nav>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}
