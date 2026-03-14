import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Charts = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(16, 99, 144, 0.6)",
        borderColor: "rgba(16, 99, 144, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Charts;
