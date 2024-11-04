"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { FaWallet,FaBriefcase,FaAddressBook,FaBoxOpen,FaShoppingBasket,FaDollarSign,FaClipboardList,FaHandshake,FaTruck } from 'react-icons/fa';

// Register the components required for the charts
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const router = useRouter();
  // Check authentication token Admin or User
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token !== 'iamaAdminfrompc' && token !== 'iamaUserfrompc') {
      alert('Access Denied. Invalid token.');
      router.push('/');
  }

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
    labels: ["Today's Income", "Today's Cost", 'Others', 'Loss'],
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
      },
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
        {/* Conditionally render the Last 8 days income section */}
        {token === 'iamaAdminfrompc' && (
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
        )}

        {/* Navigation cards */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          <Card title="Account" icon={<FaWallet />} link='/module/account' color="from-orange-500 to-red-600" />
          <Card title="HR & Workers" icon={<FaBriefcase />} link='/module/administration' color="from-yellow-400 to-yellow-600" />
          <Card title="Customer" icon={<FaAddressBook />} link='/module/customer' color="from-blue-500 to-blue-600" />
          <Card title="Product" icon={<FaBoxOpen />} link='/module/product' color="from-purple-500 to-indigo-600" />
          <Card title="Purchase" icon={<FaShoppingBasket />} link='/module/purchase' color="from-green-500 to-teal-600" />
          <Card title="Sale" icon={<FaDollarSign />} link='/module/sale' color="from-pink-500 to-rose-600" />
          <Card title="Stock" icon={<FaClipboardList />} link='/module/stock' color="from-gray-500 to-gray-600" />
          <Card title="Supplier" icon={<FaHandshake />} link='/module/supplier' color="from-blue-500 to-orange-600" />
          <Card title="Transport" icon={<FaTruck />} link='/module/transportation' color="from-teal-500 to-cyan-600" />
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
