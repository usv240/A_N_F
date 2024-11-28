// /client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import { Helmet } from 'react-helmet';
import './styles.css'; // Import the CSS file

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    return (
        <Router>
            <Helmet>
                <title>A78</title> {/* Set the app title here */}
            </Helmet>
            <ScrollToTop />
            {isAuthenticated && (
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            )}
            <div className="container">
                <Routes>
                    <Route
                        path="/login"
                        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} isAuthenticated={isAuthenticated} />} />
                    <Route path="/summary" element={<ProtectedRoute component={Summary} isAuthenticated={isAuthenticated} />} />
                    <Route path="/reports" element={<ProtectedRoute component={Reports} isAuthenticated={isAuthenticated} />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
