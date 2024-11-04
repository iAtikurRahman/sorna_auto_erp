'use client';
import React, { useEffect, useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';
import axios from 'axios';

const Administration = () => {
  const [administrators, setAdministrators] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newAdmin, setNewAdmin] = useState({ name: '', role: '', email: '', status: '', phone: '' });
  const [editAdminId, setEditAdminId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAdministrators = async (page) => {
    try {
      const response = await axios.get(`/api/auth/user`, { params: { page } });
      setAdministrators(response.data.members);
      setTotalPages(Math.ceil(response.data.totalCount / 10)); // Assuming totalCount is provided by the API
    } catch (error) {
      console.error('Error fetching administrators:', error);
    }
  };

  useEffect(() => {
    fetchAdministrators(currentPage);
  }, [currentPage]);

  const filteredAdministrators = administrators.filter((admin) => {
    return (
      (nameFilter === '' || admin.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (roleFilter === '' || admin.access_role === roleFilter) &&
      (statusFilter === '' || admin.status === statusFilter)
    );
  });

  const paginatedAdministrators = filteredAdministrators; // All filtered admins are shown because we're not slicing here

  const handleAddAdmin = () => {
    setNewAdmin({ name: '', role: '', email: '', status: '', phone: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateAdmin = async () => {
    if (editAdminId !== null) {
      try {
        await axios.put(`/api/auth/user/${editAdminId}`, newAdmin);
        setAdministrators((prev) =>
          prev.map((admin) => (admin.id === editAdminId ? { ...newAdmin, id: editAdminId } : admin))
        );
        setEditAdminId(null);
      } catch (error) {
        console.error('Error updating administrator:', error.response?.data || error.message);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteAdmin = async (id) => {
    if (window.confirm("Are you sure you want to delete this administrator?")) {
      try {
        await axios.delete(`/api/auth/user/${id}`);
        setAdministrators(administrators.filter((admin) => admin.id !== id));
      } catch (error) {
        console.error('Error deleting administrator:', error.response?.data || error.message);
      }
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

  const handleSaveAdmin = async () => {
    try {
      if (isAdding) {
        const response = await axios.post('/api/auth/user/', newAdmin);
        setAdministrators([...administrators, { ...newAdmin, id: response.data.userId }]);
      } else {
        await handleUpdateAdmin();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding/updating administrator:', error.response?.data || error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAdministrators.map((admin) => (
              <tr key={admin.id} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{admin.name}</td>
                <td className="py-2 px-4">{admin.access_role}</td>
                <td className="py-2 px-4">{admin.email}</td>
                <td className="py-2 px-4">{admin.phone}</td>
                <td className="py-2 px-4">{admin.is_active}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditAdmin(admin)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteAdmin(admin.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
          >
            Prev
          </button>
          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-2 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
          >
            Next
          </button>
        </div>

        {/* Modal for Adding/Editing Administrators */}
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
                  value={newAdmin.access_role}
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
                <input
                  type="text"
                  name="status"
                  placeholder="Status"
                  value={newAdmin.status}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mb-2"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={newAdmin.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mb-4"
                />
                <button type="button" onClick={handleSaveAdmin} className="bg-blue-500 text-white px-4 py-2 rounded">
                  {isAdding ? 'Add' : 'Update'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Administration;
