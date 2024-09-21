'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Purchase = () => {
  // Sample data for purchases
  const [purchases, setPurchases] = useState([
    { id: 1, purchase_name: 'Order #1001', supplier: 'ABC Corp', amount: 5000, status: 'Completed' },
    { id: 2, purchase_name: 'Order #1002', supplier: 'XYZ Pvt Ltd', amount: 3000, status: 'Pending' },
    { id: 3, purchase_name: 'Order #1003', supplier: 'Global Suppliers', amount: 12000, status: 'Completed' },
    { id: 4, purchase_name: 'Order #1004', supplier: 'ElectroHub', amount: 8000, status: 'In Progress' },
    { id: 5, purchase_name: 'Order #1005', supplier: 'Tech Solutions', amount: 6000, status: 'Pending' },
  ]);

  const [purchaseNameFilter, setPurchaseNameFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newPurchase, setNewPurchase] = useState({ purchase_name: '', supplier: '', amount: '', status: '' });
  const [editPurchaseId, setEditPurchaseId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const filteredPurchases = purchases.filter((purchase) => {
    return (
      (purchaseNameFilter === '' || purchase.purchase_name.toLowerCase().includes(purchaseNameFilter.toLowerCase())) &&
      (supplierFilter === '' || purchase.supplier.toLowerCase().includes(supplierFilter.toLowerCase())) &&
      (amountFilter === '' || purchase.amount.toString().includes(amountFilter)) &&
      (statusFilter === '' || purchase.status === statusFilter)
    );
  });

  const handleAddPurchase = () => {
    setNewPurchase({ purchase_name: '', supplier: '', amount: '', status: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdatePurchase = () => {
    if (editPurchaseId !== null) {
      setPurchases(purchases.map(purchase =>
        purchase.id === editPurchaseId ? { ...newPurchase, id: purchase.id } : purchase
      ));
      setEditPurchaseId(null);
      setNewPurchase({ purchase_name: '', supplier: '', amount: '', status: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeletePurchase = (id) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      setPurchases(purchases.filter(purchase => purchase.id !== id));
    }
  };

  const handleEditPurchase = (purchase) => {
    setNewPurchase(purchase);
    setEditPurchaseId(purchase.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase({ ...newPurchase, [name]: value });
  };

  const handleSavePurchase = () => {
    if (isAdding) {
      setPurchases([...purchases, { ...newPurchase, id: purchases.length + 1 }]);
    } else {
      handleUpdatePurchase();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Purchase Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="purchaseNameFilter"
              placeholder="Filter by Purchase Name"
              onChange={(e) => setPurchaseNameFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="supplierFilter"
              placeholder="Filter by Supplier"
              onChange={(e) => setSupplierFilter(e.target.value)}
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
          <button onClick={handleAddPurchase} className="bg-blue-500 text-white px-4 py-2 rounded">Add Purchase</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Purchase Name</th>
              <th className="py-2 px-4 text-left">Supplier</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((purchase, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{purchase.purchase_name}</td>
                <td className="py-2 px-4">{purchase.supplier}</td>
                <td className="py-2 px-4">{purchase.amount}</td>
                <td className="py-2 px-4">{purchase.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditPurchase(purchase)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeletePurchase(purchase.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Purchase' : 'Edit Purchase'}</h2>
            <form>
              <input
                type="text"
                name="purchase_name"
                placeholder="Purchase Name"
                value={newPurchase.purchase_name}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="supplier"
                placeholder="Supplier"
                value={newPurchase.supplier}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={newPurchase.amount}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="status"
                value={newPurchase.status}
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
                  onClick={handleSavePurchase}
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

export default Purchase;
