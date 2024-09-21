'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Customer = () => {
  // Sample data for customers
  const [customers, setCustomers] = useState([
    { id: 1, customer_type: 'Retail', area: 'Gulshan', product: 'Electronics', credit: 20000, debit: 5000 },
    { id: 2, customer_type: 'Wholesale', area: 'Banani', product: 'Clothing', credit: 30000, debit: 10000 },
    { id: 3, customer_type: 'Online', area: 'Dhanmondi', product: 'Furniture', credit: 15000, debit: 2000 },
    { id: 4, customer_type: 'Retail', area: 'Uttara', product: 'Electronics', credit: 40000, debit: 12000 },
    { id: 5, customer_type: 'Wholesale', area: 'Mirpur', product: 'Food', credit: 35000, debit: 5000 },
    { id: 6, customer_type: 'Retail', area: 'Mohammadpur', product: 'Clothing', credit: 25000, debit: 8000 },
    { id: 7, customer_type: 'Online', area: 'Bashundhara', product: 'Electronics', credit: 20000, debit: 4000 },
    { id: 8, customer_type: 'Wholesale', area: 'Tejgaon', product: 'Food', credit: 30000, debit: 10000 },
    { id: 9, customer_type: 'Retail', area: 'Gulshan', product: 'Furniture', credit: 45000, debit: 15000 },
    { id: 10, customer_type: 'Online', area: 'Banani', product: 'Clothing', credit: 22000, debit: 6000 },
  ]);

  const [customerTypeFilter, setCustomerTypeFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [creditFilter, setCreditFilter] = useState('');
  const [debitFilter, setDebitFilter] = useState('');
  const [newCustomer, setNewCustomer] = useState({ customer_type: '', area: '', product: '', credit: '', debit: '' });
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    return (
      (customerTypeFilter === '' || customer.customer_type === customerTypeFilter) &&
      (areaFilter === '' || customer.area === areaFilter) &&
      (productFilter === '' || customer.product === productFilter) &&
      (creditFilter === '' || customer.credit.toString().includes(creditFilter)) &&
      (debitFilter === '' || customer.debit.toString().includes(debitFilter))
    );
  });

  const handleAddCustomer = () => {
    setNewCustomer({ customer_type: '', area: '', product: '', credit: '', debit: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateCustomer = () => {
    if (editCustomerId !== null) {
      setCustomers(customers.map(customer =>
        customer.id === editCustomerId ? { ...newCustomer, id: customer.id } : customer
      ));
      setEditCustomerId(null);
      setNewCustomer({ customer_type: '', area: '', product: '', credit: '', debit: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const handleEditCustomer = (customer) => {
    setNewCustomer(customer);
    setEditCustomerId(customer.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSaveCustomer = () => {
    if (isAdding) {
      setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }]);
    } else {
      handleUpdateCustomer();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <select name="customerTypeFilter" onChange={(e) => setCustomerTypeFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Customer Type</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Online">Online</option>
            </select>
            <select name="areaFilter" onChange={(e) => setAreaFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Area</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Banani">Banani</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Uttara">Uttara</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Mohammadpur">Mohammadpur</option>
              <option value="Bashundhara">Bashundhara</option>
              <option value="Tejgaon">Tejgaon</option>
            </select>
            <select name="productFilter" onChange={(e) => setProductFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Product</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Food">Food</option>
            </select>
            <input
              type="text"
              name="creditFilter"
              placeholder="Filter by Credit"
              onChange={(e) => setCreditFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="debitFilter"
              placeholder="Filter by Debit"
              onChange={(e) => setDebitFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <button onClick={handleAddCustomer} className="bg-blue-500 text-white px-4 py-2 rounded">Add Customer</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Customer Type</th>
              <th className="py-2 px-4 text-left">Area</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Credit</th>
              <th className="py-2 px-4 text-left">Debit</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{customer.customer_type}</td>
                <td className="py-2 px-4">{customer.area}</td>
                <td className="py-2 px-4">{customer.product}</td>
                <td className="py-2 px-4">{customer.credit}</td>
                <td className="py-2 px-4">{customer.debit}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditCustomer(customer)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteCustomer(customer.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Customer' : 'Edit Customer'}</h2>
            <form>
              <input
                type="text"
                name="customer_type"
                placeholder="Customer Type"
                value={newCustomer.customer_type}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={newCustomer.area}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="product"
                placeholder="Product"
                value={newCustomer.product}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="number"
                name="credit"
                placeholder="Credit"
                value={newCustomer.credit}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="number"
                name="debit"
                placeholder="Debit"
                value={newCustomer.debit}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
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
                  onClick={handleSaveCustomer}
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

export default Customer;
