// /client/src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/register', formData);
            toast.success('Registration Successful! Redirecting to login...', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } catch (error) {
            toast.error('Registration Failed. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="container" aria-label="Registration Form">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <button type="submit">Register</button>
                
                {/* Login Button */}
                <button type="button" onClick={handleNavigateToLogin} style={{ marginTop: '10px' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Register;
