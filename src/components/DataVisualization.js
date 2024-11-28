// /client/src/components/DataVisualization.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const DataVisualization = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/api/data/user-stats');
            setStats(res.data);
        };
        fetchData();
    }, []);

    const data = {
        labels: ['Total Users'],
        datasets: [{
            label: 'User Stats',
            data: [stats.totalUsers || 0],
            backgroundColor: 'rgba(75,192,192,1)',
        }]
    };

    return (
        <div className="container" aria-labelledby="chart-heading">
            <h2 id="chart-heading" tabIndex="0">User Statistics</h2>
            <Bar data={data} aria-label="Bar chart displaying user statistics" />
        </div>
    );
};

export default DataVisualization;
