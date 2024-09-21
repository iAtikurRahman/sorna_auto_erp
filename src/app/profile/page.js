'use client';
import React, { useState } from 'react';
import ErpHeader from '../_components/ErpHeader';

const UserProfile = () => {
  // Sample user data
  const [user, setUser] = useState({
    id: 1,
    name: 'Alice Smith',
    email: 'alice@example.com',
    role: 'Manager',
    status: 'Active',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {isEditing ? (
            <div>
              <h2 className="text-xl mb-2">Edit Profile</h2>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
                placeholder="Email"
              />
              <input
                type="text"
                name="role"
                value={updatedUser.role}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
                placeholder="Role"
              />
              <select
                name="status"
                value={updatedUser.status}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl mb-2">Profile Details</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
