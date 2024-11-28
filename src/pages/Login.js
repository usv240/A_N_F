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

    try {
        console.log("Sending POST request to login endpoint with email and password");
        const response = await axios.post('http://137.184.155.248:3000/api/users/login', { email, password });

        console.log("Response received from backend:", response); // Log the full response object

        if (response.data) {
            console.log("Response data:", response.data); // Log the data inside the response

            // Skip token validation
            localStorage.setItem('token', response.data.token || "dummy-token"); // Use dummy token if token is missing
            setIsAuthenticated(true);

            toast.success("Login successful! Redirecting to dashboard...", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
            });

            console.log("Navigating to /dashboard after delay");
            setTimeout(() => navigate('/dashboard'), 2000);
        } else {
            console.error("Response data is empty or undefined");
            toast.error("Unexpected error occurred, please try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    } catch (error) {
        console.error("Error during login request:", error); // Log general error
        if (error.response) {
            console.error("Error response from backend:", error.response); // Log backend error details
            console.error("Error response status:", error.response.status);
            console.error("Error response data:", error.response.data);
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
