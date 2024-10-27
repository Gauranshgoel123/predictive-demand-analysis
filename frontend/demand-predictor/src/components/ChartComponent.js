import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './ChartComponent.css'; // Import the CSS file

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ data }) => {
    // Prepare chart data
    const chartData = {
        labels: data.map(item => item.date), // Accessing the date field
        datasets: [
            {
                label: 'Demand Prediction',
                data: data.map(item => item.demand), // Accessing the demand field
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
                tension: 0.1, // Smooth line curve
            },
        ],
    };

    useEffect(() => {
        // Cleanup function to destroy chart instance if necessary
        return () => {
            const chartInstance = ChartJS.instances[0];
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    // Render loading state or no data available message if data is empty
    if (!data || data.length === 0) {
        return <div className="chart-container">No data available</div>;
    }

    return (
        <div className="chart-container">
            <h3 className="chart-header">Demand Prediction</h3>
            <div className="chart">
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default ChartComponent;
