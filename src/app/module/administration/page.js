'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Administration = () => {
  // Sample data for administrations
  const [administrators, setAdministrators] = useState([
    { id: 1, name: 'Alice Smith', role: 'Manager', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob Johnson', role: 'Admin', email: 'bob@example.com', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', role: 'Support', email: 'charlie@example.com', status: 'Active' },
    { id: 4, name: 'Dana White', role: 'HR', email: 'dana@example.com', status: 'Active' },
  ]);

  // States for filters and new admin form
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newAdmin, setNewAdmin] = useState({ name: '', role: '', email: '', status: '' });
  const [editAdminId, setEditAdminId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Filtered administrators based on filters
  const filteredAdministrators = administrators.filter((admin) => {
    return (
      (nameFilter === '' || admin.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (roleFilter === '' || admin.role === roleFilter) &&
      (statusFilter === '' || admin.status === statusFilter)
    );
  });

  const handleAddAdmin = () => {
    setNewAdmin({ name: '', role: '', email: '', status: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateAdmin = () => {
    if (editAdminId !== null) {
      setAdministrators(administrators.map(admin =>
        admin.id === editAdminId ? { ...newAdmin, id: admin.id } : admin
      ));
      setEditAdminId(null);
      setNewAdmin({ name: '', role: '', email: '', status: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this administrator?")) {
      setAdministrators(administrators.filter(admin => admin.id !== id));
    }
  };

  const handleEditAdmin = (admin) => {
    setNewAdmin(admin);
    setEditAdminId(admin.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleSaveAdmin = () => {
    if (isAdding) {
      setAdministrators([...administrators, { ...newAdmin, id: administrators.length + 1 }]);
    } else {
      handleUpdateAdmin();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Administration Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="nameFilter"
              placeholder="Filter by Name"
              onChange={(e) => setNameFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <select name="roleFilter" onChange={(e) => setRoleFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Role</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Support">Support</option>
              <option value="HR">HR</option>
            </select>
            <select name="statusFilter" onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button onClick={handleAddAdmin} className="bg-blue-500 text-white px-4 py-2 rounded">Add Administrator</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdministrators.map((admin, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{admin.name}</td>
                <td className="py-2 px-4">{admin.role}</td>
                <td className="py-2 px-4">{admin.email}</td>
                <td className="py-2 px-4">{admin.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditAdmin(admin)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteAdmin(admin.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Administrator' : 'Edit Administrator'}</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newAdmin.name}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={newAdmin.role}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="status"
                value={newAdmin.status}
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
                  onClick={handleSaveAdmin}
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

export default Administration;
