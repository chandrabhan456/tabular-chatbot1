// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData }) => {
  console.log("chartData", chartData); // Log to ensure data is being received

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
      },
      y: {
        grid: {
          display: false, // Remove horizontal grid lines
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
