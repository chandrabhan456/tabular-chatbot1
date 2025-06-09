// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(ArcElement, Title, Tooltip, Legend);

const PieChart = ({ chartData }) => {
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
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
