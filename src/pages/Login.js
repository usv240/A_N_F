// /client/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
            console.log("Response data:", response.data); // Debugging response
    
            if (response.data.token) {
                console.log("Token received:", response.data.token); // Debug token
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
                toast.success("Login successful! Redirecting to dashboard...", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                console.error("No token in response:", response.data); // Debugging error
                toast.error("No token received, please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Login failed:", error); // Debugging error
            toast.error("Login failed, please check your credentials and try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    };
    
    
    

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleLogin} aria-label="Login Form">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                
                {/* Register Button */}
                <button type="button" onClick={handleNavigateToRegister} style={{ marginTop: '10px' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Login;
