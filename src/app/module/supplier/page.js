'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Supplier = () => {
  // Sample data for suppliers
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Tech Supplier', contact: '123-456-7890', email: 'contact@techsupplier.com', status: 'Active' },
    { id: 2, name: 'Mobile Mart', contact: '987-654-3210', email: 'info@mobilemart.com', status: 'Inactive' },
    { id: 3, name: 'Furniture House', contact: '555-123-4567', email: 'support@furniturehouse.com', status: 'Active' },
    { id: 4, name: 'Accessory World', contact: '444-987-6543', email: 'sales@accessoryworld.com', status: 'Active' },
  ]);

  // States for filters and new supplier form
  const [nameFilter, setNameFilter] = useState('');
  const [contactFilter, setContactFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', email: '', status: '' });
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Filtered suppliers based on filters
  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      (nameFilter === '' || supplier.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (contactFilter === '' || supplier.contact.includes(contactFilter)) &&
      (emailFilter === '' || supplier.email.toLowerCase().includes(emailFilter.toLowerCase())) &&
      (statusFilter === '' || supplier.status === statusFilter)
    );
  });

  const handleAddSupplier = () => {
    setNewSupplier({ name: '', contact: '', email: '', status: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateSupplier = () => {
    if (editSupplierId !== null) {
      setSuppliers(suppliers.map(supplier =>
        supplier.id === editSupplierId ? { ...newSupplier, id: supplier.id } : supplier
      ));
      setEditSupplierId(null);
      setNewSupplier({ name: '', contact: '', email: '', status: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteSupplier = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };

  const handleEditSupplier = (supplier) => {
    setNewSupplier(supplier);
    setEditSupplierId(supplier.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleSaveSupplier = () => {
    if (isAdding) {
      setSuppliers([...suppliers, { ...newSupplier, id: suppliers.length + 1 }]);
    } else {
      handleUpdateSupplier();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="nameFilter"
              placeholder="Filter by Supplier Name"
              onChange={(e) => setNameFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="contactFilter"
              placeholder="Filter by Contact"
              onChange={(e) => setContactFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="emailFilter"
              placeholder="Filter by Email"
              onChange={(e) => setEmailFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <select name="statusFilter" onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button onClick={handleAddSupplier} className="bg-blue-500 text-white px-4 py-2 rounded">Add Supplier</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Supplier Name</th>
              <th className="py-2 px-4 text-left">Contact</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{supplier.name}</td>
                <td className="py-2 px-4">{supplier.contact}</td>
                <td className="py-2 px-4">{supplier.email}</td>
                <td className="py-2 px-4">{supplier.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditSupplier(supplier)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteSupplier(supplier.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Supplier' : 'Edit Supplier'}</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Supplier Name"
                value={newSupplier.name}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={newSupplier.contact}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newSupplier.email}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="status"
                value={newSupplier.status}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                  onClick={handleSaveSupplier}
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

export default Supplier;
