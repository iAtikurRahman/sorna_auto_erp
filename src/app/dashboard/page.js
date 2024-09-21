"use client";
import React from 'react';
import Link from 'next/link'; // Import the Link component
import ErpHeader from '../_components/ErpHeader';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { FaUsers, FaUserTie, FaShoppingCart, FaChartLine, FaWarehouse, FaMoneyCheckAlt } from 'react-icons/fa';

// Register the components required for the charts
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const barData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8'],
    datasets: [
      {
        label: '', // We don't want to show the label inside the chart
        data: [5000, 7000, 8000, 6000, 12000, 10000, 9000, 8500],
        backgroundColor: '#60A5FA',
        borderRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: ['Today\'s Income', 'Today\'s Cost', 'Others', 'Loss'],
    datasets: [
      {
        data: [52.5, 12.9, 6.15, 28.45],
        backgroundColor: ['#3B82F6', '#10B981', '#F97316', '#EF4444'],
      },
    ],
  };

  // Custom options for the Bar chart
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend inside the Bar chart
      }
    },
  };

  // Custom options for the Pie chart
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Moves legend below the chart
        labels: {
          boxWidth: 20,
          padding: 20,
          generateLabels: (chart) => {
            const data = chart.data.datasets[0].data;
            const labels = chart.data.labels;
            return labels.map((label, index) => ({
              text: `${label} (${data[index]}%)`, // Format to show percentage
              fillStyle: chart.data.datasets[0].backgroundColor[index],
            }));
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ErpHeader />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Last 8 days income section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Last 8 days income</h2>
          <div className="flex justify-between">
            <div className="w-2/3">
              <Bar data={barData} options={barOptions} />
            </div>
            <div className="w-2/5 h-64">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          <Card title="Account" icon={<FaUsers />} link='/module/account' color="from-orange-400 to-red-500" />
          <Card title="HR & Workers" icon={<FaUserTie />} link='/module/administration' color="from-blue-400 to-blue-500" />
          <Card title="Customer" icon={<FaShoppingCart />} link='/module/customer' color="from-purple-400 to-purple-500" />
          <Card title="Supplier" icon={<FaChartLine />} link='/module/supplier' color="from-green-400 to-green-500" />
          <Card title="Stock" icon={<FaWarehouse />} link='/module/stock' color="from-indigo-400 to-indigo-500" />
          <Card title="Purchase" icon={<FaMoneyCheckAlt />} link='/module/purchase' color="from-gray-400 to-gray-500" />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, icon, link, color }) => (
  <Link href={link} className={`p-6 rounded-lg shadow-lg text-white bg-gradient-to-r ${color} flex flex-col justify-center items-center`}>
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
  </Link>
);

export default Dashboard;
