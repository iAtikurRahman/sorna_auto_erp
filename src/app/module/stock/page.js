'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Stock = () => {
  // Sample data for stock
  const [stocks, setStocks] = useState([
    { id: 1, product_name: 'Laptop', quantity: 50, supplier: 'Tech Supplier', status: 'Available' },
    { id: 2, product_name: 'Smartphone', quantity: 30, supplier: 'Mobile Mart', status: 'Low' },
    { id: 3, product_name: 'Desk Chair', quantity: 20, supplier: 'Furniture House', status: 'Out of Stock' },
    { id: 4, product_name: 'Monitor', quantity: 40, supplier: 'Tech Supplier', status: 'Available' },
    { id: 5, product_name: 'Keyboard', quantity: 10, supplier: 'Accessory World', status: 'Low' },
  ]);

  const [productNameFilter, setProductNameFilter] = useState('');
  const [quantityFilter, setQuantityFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newStock, setNewStock] = useState({ product_name: '', quantity: '', supplier: '', status: '' });
  const [editStockId, setEditStockId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const filteredStocks = stocks.filter((stock) => {
    return (
      (productNameFilter === '' || stock.product_name.toLowerCase().includes(productNameFilter.toLowerCase())) &&
      (quantityFilter === '' || stock.quantity.toString().includes(quantityFilter)) &&
      (supplierFilter === '' || stock.supplier.toLowerCase().includes(supplierFilter.toLowerCase())) &&
      (statusFilter === '' || stock.status === statusFilter)
    );
  });

  const handleAddStock = () => {
    setNewStock({ product_name: '', quantity: '', supplier: '', status: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateStock = () => {
    if (editStockId !== null) {
      setStocks(stocks.map(stock =>
        stock.id === editStockId ? { ...newStock, id: stock.id } : stock
      ));
      setEditStockId(null);
      setNewStock({ product_name: '', quantity: '', supplier: '', status: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteStock = (id) => {
    if (window.confirm("Are you sure you want to delete this stock entry?")) {
      setStocks(stocks.filter(stock => stock.id !== id));
    }
  };

  const handleEditStock = (stock) => {
    setNewStock(stock);
    setEditStockId(stock.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleSaveStock = () => {
    if (isAdding) {
      setStocks([...stocks, { ...newStock, id: stocks.length + 1 }]);
    } else {
      handleUpdateStock();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="productNameFilter"
              placeholder="Filter by Product Name"
              onChange={(e) => setProductNameFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="quantityFilter"
              placeholder="Filter by Quantity"
              onChange={(e) => setQuantityFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="supplierFilter"
              placeholder="Filter by Supplier"
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <select name="statusFilter" onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Status</option>
              <option value="Available">Available</option>
              <option value="Low">Low</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <button onClick={handleAddStock} className="bg-blue-500 text-white px-4 py-2 rounded">Add Stock</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Supplier</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{stock.product_name}</td>
                <td className="py-2 px-4">{stock.quantity}</td>
                <td className="py-2 px-4">{stock.supplier}</td>
                <td className="py-2 px-4">{stock.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditStock(stock)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteStock(stock.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Stock' : 'Edit Stock'}</h2>
            <form>
              <input
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={newStock.product_name}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newStock.quantity}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="supplier"
                placeholder="Supplier"
                value={newStock.supplier}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="status"
                value={newStock.status}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Low">Low</option>
                <option value="Out of Stock">Out of Stock</option>
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
                  onClick={handleSaveStock}
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

export default Stock;
