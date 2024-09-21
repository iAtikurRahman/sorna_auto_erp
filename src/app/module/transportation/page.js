'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Transportation = () => {
  // Sample data for transportation
  const [transportations, setTransportations] = useState([
    { id: 1, vehicleType: 'Truck', plateNumber: 'ABC-1234', driver: 'John Doe', status: 'Active' },
    { id: 2, vehicleType: 'Van', plateNumber: 'XYZ-5678', driver: 'Jane Smith', status: 'Inactive' },
    { id: 3, vehicleType: 'Bike', plateNumber: 'LMN-9101', driver: 'Alice Johnson', status: 'Active' },
    { id: 4, vehicleType: 'Truck', plateNumber: 'DEF-2345', driver: 'Bob Brown', status: 'Active' },
  ]);

  // States for filters and new transportation form
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('');
  const [plateNumberFilter, setPlateNumberFilter] = useState('');
  const [driverFilter, setDriverFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newTransportation, setNewTransportation] = useState({ vehicleType: '', plateNumber: '', driver: '', status: '' });
  const [editTransportationId, setEditTransportationId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Filtered transportations based on filters
  const filteredTransportations = transportations.filter((transportation) => {
    return (
      (vehicleTypeFilter === '' || transportation.vehicleType.toLowerCase().includes(vehicleTypeFilter.toLowerCase())) &&
      (plateNumberFilter === '' || transportation.plateNumber.toLowerCase().includes(plateNumberFilter.toLowerCase())) &&
      (driverFilter === '' || transportation.driver.toLowerCase().includes(driverFilter.toLowerCase())) &&
      (statusFilter === '' || transportation.status === statusFilter)
    );
  });

  const handleAddTransportation = () => {
    setNewTransportation({ vehicleType: '', plateNumber: '', driver: '', status: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateTransportation = () => {
    if (editTransportationId !== null) {
      setTransportations(transportations.map(transportation =>
        transportation.id === editTransportationId ? { ...newTransportation, id: transportation.id } : transportation
      ));
      setEditTransportationId(null);
      setNewTransportation({ vehicleType: '', plateNumber: '', driver: '', status: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteTransportation = (id) => {
    if (window.confirm("Are you sure you want to delete this transportation record?")) {
      setTransportations(transportations.filter(transportation => transportation.id !== id));
    }
  };

  const handleEditTransportation = (transportation) => {
    setNewTransportation(transportation);
    setEditTransportationId(transportation.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransportation({ ...newTransportation, [name]: value });
  };

  const handleSaveTransportation = () => {
    if (isAdding) {
      setTransportations([...transportations, { ...newTransportation, id: transportations.length + 1 }]);
    } else {
      handleUpdateTransportation();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Transportation Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="vehicleTypeFilter"
              placeholder="Filter by Vehicle Type"
              onChange={(e) => setVehicleTypeFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="plateNumberFilter"
              placeholder="Filter by Plate Number"
              onChange={(e) => setPlateNumberFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="driverFilter"
              placeholder="Filter by Driver"
              onChange={(e) => setDriverFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <select name="statusFilter" onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button onClick={handleAddTransportation} className="bg-blue-500 text-white px-4 py-2 rounded">Add Transportation</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Vehicle Type</th>
              <th className="py-2 px-4 text-left">Plate Number</th>
              <th className="py-2 px-4 text-left">Driver</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransportations.map((transportation, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{transportation.vehicleType}</td>
                <td className="py-2 px-4">{transportation.plateNumber}</td>
                <td className="py-2 px-4">{transportation.driver}</td>
                <td className="py-2 px-4">{transportation.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditTransportation(transportation)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteTransportation(transportation.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Transportation' : 'Edit Transportation'}</h2>
            <form>
              <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                value={newTransportation.vehicleType}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="plateNumber"
                placeholder="Plate Number"
                value={newTransportation.plateNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="driver"
                placeholder="Driver"
                value={newTransportation.driver}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="status"
                value={newTransportation.status}
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
                  onClick={handleSaveTransportation}
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

export default Transportation;
