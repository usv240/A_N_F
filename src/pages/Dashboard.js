// /client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const verifyToken = async () => {
            try {
                const config = { headers: { "x-auth-token": token } };
                await axios.get('/api/data/summary', config);  // Test the token to ensure access
            } catch (err) {
                console.error("Failed to verify token:", err);
                setError("Failed to verify access. Please log in again.");
                navigate('/login');
            }
        };

        verifyToken();
    }, [navigate]);

    return (
        <div className="dashboard">
            <h1 tabIndex="0">Dashboard</h1>

            <section aria-labelledby="news-summary">
                <h2 id="news-summary" tabIndex="0">News Summary</h2>
                <p aria-live="polite">
                    UNC Charlotte recently celebrated a record-breaking year in research achievements. This accomplishment reflects the university’s dedication to fostering innovation across various fields. Faculty, staff, and students have collectively contributed to an impressive volume of research, propelling UNC Charlotte into new academic and research heights. The university’s efforts are especially commendable in the areas of engineering, health sciences, and environmental studies, where numerous patents and research publications have set a benchmark for excellence. The sustained investment in research infrastructure, collaborative projects, and community engagement ensures that UNC Charlotte remains at the forefront of technological advancements and scientific inquiry. As the university continues to grow its research portfolio, it attracts talent and funding that further supports its mission of academic excellence and societal impact.
                </p>
                <p>
                    <strong>Reference:</strong> <a 
                        href="https://inside.charlotte.edu/2024/11/07/achievements-of-faculty-staff-and-students-recognized-as-charlotte-celebrates-a-record-year-for-research/?field_news_date_pub_value_1%5Bvalue%5D%5Bmonth%5D=1&field_news_date_pub_value_1%5Bvalue%5D%5Byear%5D=2015" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Read more about UNC Charlotte's record year in research achievements on their official news page"
                    >
                        Achievements of faculty, staff, and students recognized as Charlotte celebrates a record year for research
                    </a>
                </p>
            </section>

            <section aria-labelledby="tech-details">
                <h2 id="tech-details" tabIndex="0">Technical Aspects of the Project</h2>
                <p>
                    This project leverages the MERN stack, comprising MongoDB, Express.js, React.js, and Node.js, to create a full-stack single-page application. MongoDB serves as the NoSQL database, offering flexibility and scalability for managing unstructured data. Express.js acts as the backend framework, handling routing and middleware functions efficiently. React.js, the chosen frontend library, provides a dynamic and responsive user interface that communicates seamlessly with the backend through HTTP requests. Node.js serves as the runtime environment, powering the server-side functionality and API endpoint management.
                </p>
                <p>
                    Key features include secure user authentication through JSON Web Tokens (JWT), ensuring that only authorized users access protected resources. Data exchanges between the frontend and backend are facilitated by Axios, a promise-based HTTP client, making the application responsive and easy to update. The app is hosted on DigitalOcean, where NGINX serves as a reverse proxy for handling incoming requests and routing them to the appropriate server. Additionally, the project utilizes React Router for seamless navigation within the single-page architecture, contributing to a smooth and uninterrupted user experience. This setup supports scalability, reliability, and user engagement, especially suited for applications requiring robust interaction between user and data.
                </p>
            </section>

            {error && <p role="alert" aria-live="assertive" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        </div>
    );
};

export default Dashboard;
