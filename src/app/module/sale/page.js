'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Sale = () => {
  // Sample data for sales
  const [sales, setSales] = useState([
    { id: 1, sale_name: 'Invoice #1001', customer: 'John Doe', amount: 5000, status: 'Completed' },
    { id: 2, sale_name: 'Invoice #1002', customer: 'Jane Smith', amount: 7000, status: 'Pending' },
    { id: 3, sale_name: 'Invoice #1003', customer: 'Michael Johnson', amount: 10000, status: 'Completed' },
    { id: 4, sale_name: 'Invoice #1004', customer: 'Emily Davis', amount: 4000, status: 'In Progress' },
    { id: 5, sale_name: 'Invoice #1005', customer: 'Chris Brown', amount: 8000, status: 'Pending' },
  ]);

  const [saleNameFilter, setSaleNameFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newSale, setNewSale] = useState({ sale_name: '', customer: '', amount: '', status: '' });
  const [editSaleId, setEditSaleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const filteredSales = sales.filter((sale) => {
    return (
      (saleNameFilter === '' || sale.sale_name.toLowerCase().includes(saleNameFilter.toLowerCase())) &&
      (customerFilter === '' || sale.customer.toLowerCase().includes(customerFilter.toLowerCase())) &&
      (amountFilter === '' || sale.amount.toString().includes(amountFilter)) &&
      (statusFilter === '' || sale.status === statusFilter)
    );
  });

  const handleAddSale = () => {
    setNewSale({ sale_name: '', customer: '', amount: '', status: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateSale = () => {
    if (editSaleId !== null) {
      setSales(sales.map(sale =>
        sale.id === editSaleId ? { ...newSale, id: sale.id } : sale
      ));
      setEditSaleId(null);
      setNewSale({ sale_name: '', customer: '', amount: '', status: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteSale = (id) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      setSales(sales.filter(sale => sale.id !== id));
    }
  };

  const handleEditSale = (sale) => {
    setNewSale(sale);
    setEditSaleId(sale.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleSaveSale = () => {
    if (isAdding) {
      setSales([...sales, { ...newSale, id: sales.length + 1 }]);
    } else {
      handleUpdateSale();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Sale Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="saleNameFilter"
              placeholder="Filter by Sale Name"
              onChange={(e) => setSaleNameFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="customerFilter"
              placeholder="Filter by Customer"
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="amountFilter"
              placeholder="Filter by Amount"
              onChange={(e) => setAmountFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <select name="statusFilter" onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <button onClick={handleAddSale} className="bg-blue-500 text-white px-4 py-2 rounded">Add Sale</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Sale Name</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{sale.sale_name}</td>
                <td className="py-2 px-4">{sale.customer}</td>
                <td className="py-2 px-4">{sale.amount}</td>
                <td className="py-2 px-4">{sale.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditSale(sale)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteSale(sale.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Sale' : 'Edit Sale'}</h2>
            <form>
              <input
                type="text"
                name="sale_name"
                placeholder="Sale Name"
                value={newSale.sale_name}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="customer"
                placeholder="Customer"
                value={newSale.customer}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={newSale.amount}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="status"
                value={newSale.status}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              >
                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSale}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isAdding ? 'Add' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sale;
