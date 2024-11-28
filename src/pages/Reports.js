// /client/src/pages/Reports.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setChartData({
            labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
            datasets: [
                {
                    label: 'Research Publications',
                    data: [100, 120, 130, 150, 170, 200],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Patents Filed',
                    data: [5, 7, 10, 12, 15, 18],
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                }
            ]
        });

        setLoading(false);
    }, []);

    return (
        <div>
            <h1>Reports</h1>
            {!loading ? (
                <>
                    <Bar data={chartData} />
                    <p>
                        This bar chart shows the number of research publications and patents filed by UNC Charlotte faculty and students each year from 2019 to 2024.
                    </p>
                </>
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default Reports;
