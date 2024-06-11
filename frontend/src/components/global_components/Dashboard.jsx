// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { fetchLineChartData, fetchBarChartData, fetchPieChartData } from '../../hooks/AdminDashboardHook'; // Adjust the path if necessary

Chart.register(...registerables);

const LineChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchLineChartData().then(setData);
  }, []);

  return <div className="chart"><Line data={data} /></div>;
};

const BarChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchBarChartData().then(setData);
  }, []);

  return <div className="chart"><Bar data={data} /></div>;
};

const PieChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchPieChartData().then(setData);
  }, []);

  return <div className="chart"><Pie data={data} /></div>;
};

export { LineChart, BarChart, PieChart };
