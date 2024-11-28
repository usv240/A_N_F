// /client/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    if (!isAuthenticated) return null;

    return (
        <nav aria-label="Main navigation">
            <div>
                <Link to="/dashboard" aria-label="Dashboard">Dashboard</Link>
                <Link to="/summary" aria-label="Summary">Summary</Link>
                <Link to="/reports" aria-label="Reports">Reports</Link>
            </div>
            <button onClick={handleLogout} aria-label="Logout">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
