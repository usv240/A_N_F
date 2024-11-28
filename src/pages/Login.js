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
        console.log("Login form submitted"); // Debug start of function
        
        console.log("Current email:", email); // Check the current state of email
        console.log("Current password:", password); // Check the current state of password
    
        try {
            console.log("Preparing POST request to login endpoint...");
            const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
    
            console.log("POST request sent. Waiting for response...");
            console.log("Response received from backend:", response); // Log the full response object
    
            if (response && response.data) {
                console.log("Response data exists:", response.data); // Log the data inside the response
            } else {
                console.error("No response data received");
            }
    
            if (response.data && response.data.token) {
                console.log("Token received from backend:", response.data.token); // Log the token received
    
                console.log("Storing token in localStorage...");
                localStorage.setItem('token', response.data.token);
    
                console.log("Updating authentication state to true...");
                setIsAuthenticated(true);
    
                console.log("Triggering success toast...");
                toast.success("Login successful! Redirecting to dashboard...", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
    
                console.log("Navigating to /dashboard after 2-second delay...");
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                console.error("No token received in the response data");
                toast.error("No token received, please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Error occurred during login attempt:", error); // Log the error object
            if (error.response) {
                console.error("Backend responded with an error:", error.response); // Log backend error details
                console.error("Response status:", error.response.status);
                console.error("Response data:", error.response.data);
            } else {
                console.error("No response from backend or other error occurred");
            }
    
            toast.error("Login failed, please check your credentials and try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    
        console.log("End of handleLogin function"); // Mark end of function
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
