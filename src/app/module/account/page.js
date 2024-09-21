'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Account = () => {
  // Sample data for accounts
  const [accounts, setAccounts] = useState([
    { id: 1, accountName: 'Main Account', accountNumber: 'ACC-001', balance: 50000, status: 'Active' },
    { id: 2, accountName: 'Savings Account', accountNumber: 'ACC-002', balance: 15000, status: 'Active' },
    { id: 3, accountName: 'Business Account', accountNumber: 'ACC-003', balance: 25000, status: 'Inactive' },
    { id: 4, accountName: 'Expense Account', accountNumber: 'ACC-004', balance: 1000, status: 'Active' },
  ]);

  // States for filters and new account form
  const [accountNameFilter, setAccountNameFilter] = useState('');
  const [accountNumberFilter, setAccountNumberFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newAccount, setNewAccount] = useState({ accountName: '', accountNumber: '', balance: '', status: '' });
  const [editAccountId, setEditAccountId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Filtered accounts based on filters
  const filteredAccounts = accounts.filter((account) => {
    return (
      (accountNameFilter === '' || account.accountName.toLowerCase().includes(accountNameFilter.toLowerCase())) &&
      (accountNumberFilter === '' || account.accountNumber.toLowerCase().includes(accountNumberFilter.toLowerCase())) &&
      (statusFilter === '' || account.status === statusFilter)
    );
  });

  const handleAddAccount = () => {
    setNewAccount({ accountName: '', accountNumber: '', balance: '', status: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateAccount = () => {
    if (editAccountId !== null) {
      setAccounts(accounts.map(account =>
        account.id === editAccountId ? { ...newAccount, id: account.id } : account
      ));
      setEditAccountId(null);
      setNewAccount({ accountName: '', accountNumber: '', balance: '', status: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteAccount = (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      setAccounts(accounts.filter(account => account.id !== id));
    }
  };

  const handleEditAccount = (account) => {
    setNewAccount(account);
    setEditAccountId(account.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSaveAccount = () => {
    if (isAdding) {
      setAccounts([...accounts, { ...newAccount, id: accounts.length + 1 }]);
    } else {
      handleUpdateAccount();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Account Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="accountNameFilter"
              placeholder="Filter by Account Name"
              onChange={(e) => setAccountNameFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="accountNumberFilter"
              placeholder="Filter by Account Number"
              onChange={(e) => setAccountNumberFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <select name="statusFilter" onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button onClick={handleAddAccount} className="bg-blue-500 text-white px-4 py-2 rounded">Add Account</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Account Name</th>
              <th className="py-2 px-4 text-left">Account Number</th>
              <th className="py-2 px-4 text-left">Balance</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{account.accountName}</td>
                <td className="py-2 px-4">{account.accountNumber}</td>
                <td className="py-2 px-4">{account.balance}</td>
                <td className="py-2 px-4">{account.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditAccount(account)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteAccount(account.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Account' : 'Edit Account'}</h2>
            <form>
              <input
                type="text"
                name="accountName"
                placeholder="Account Name"
                value={newAccount.accountName}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={newAccount.accountNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="number"
                name="balance"
                placeholder="Balance"
                value={newAccount.balance}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="status"
                value={newAccount.status}
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
                  onClick={handleSaveAccount}
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

export default Account;
