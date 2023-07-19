import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const ChartComponent = () => {
  // Sample data and options for the bar chart

  const { assSummary } = useSelector((state) => state.risk);

  const assessmentLables = assSummary.map((assessment) => {
    return assessment.categoryName;
  });

  const assessmentData = assSummary.map((assessment) => {
    return parseInt(assessment.weightageAverageScore);
  });

  const data = {
    labels: assessmentLables,
    datasets: [
      {
        label: 'Assessment Summary',
        data: assessmentData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div>
      <h2>Summary Chart</h2>
      <div>
        {/* Set a width and center the chart with some inline styles */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
