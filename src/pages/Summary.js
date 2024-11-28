// /client/src/pages/Summary.js
import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Summary = () => {
    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: []
    });
    const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLineChartData({
            labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
            datasets: [
                {
                    label: 'Research Funding (in Millions)',
                    data: [50, 55, 60, 70, 85, 100],
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                    tension: 0.1,
                }
            ]
        });

        setPieChartData({
            labels: ["Engineering", "Health Sciences", "Education", "Business", "Arts & Sciences"],
            datasets: [
                {
                    label: 'Funding Distribution by Department',
                    data: [40, 25, 15, 10, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1,
                }
            ]
        });

        setLoading(false);
    }, []);

    return (
        <div className="container">
            <h1>Summary</h1>
            <div className="charts-container">
                {/* Line Chart */}
                <div className="chart-item">
                    <h2>Research Funding Growth</h2>
                    {!loading ? (
                        <Line data={lineChartData} aria-label="Line chart of research funding over the years" />
                    ) : (
                        <p>Loading line chart...</p>
                    )}
                    <p>
                        This chart illustrates the growth of research funding at UNC Charlotte over the past six years, showcasing the university's commitment to advancing innovation and faculty development.
                    </p>
                </div>

                {/* Pie Chart */}
                <div className="chart-item">
                    <h2>Funding Distribution by Department</h2>
                    {!loading ? (
                        <Pie data={pieChartData} aria-label="Pie chart showing funding distribution by department" />
                    ) : (
                        <p>Loading pie chart...</p>
                    )}
                    <p>
                        This pie chart provides an overview of how research funding is allocated across various departments at UNC Charlotte.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Summary;
