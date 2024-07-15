import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ManageTransactions = () => {
  const { transactions, deleteTransaction, editTransaction } = useContext(TransactionContext);
  const [editMode, setEditMode] = useState(false);
  const [editTransactionData, setEditTransactionData] = useState({
    id: '',
    category: '',
    amount: '',
    type: 'expense',
    date: new Date(),
    description: ''
  });

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const handleEdit = (transaction) => {
    setEditMode(true);
    setEditTransactionData(transaction);
  };

  const handleChange = (e) => {
    setEditTransactionData({
      ...editTransactionData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setEditTransactionData({
      ...editTransactionData,
      date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTransaction(editTransactionData);
    setEditMode(false);
    resetForm();
  };

  const resetForm = () => {
    setEditTransactionData({
      id: '',
      category: '',
      amount: '',
      type: 'expense',
      date: new Date(),
      description: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Transactions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transactions.map(transaction => (
          <div key={transaction.id} className="bg-white rounded-lg shadow-md p-6">
            {editMode && editTransactionData.id === transaction.id ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={editTransactionData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={editTransactionData.amount}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <DatePicker
                      id="date"
                      name="date"
                      selected={editTransactionData.date}
                      onChange={handleDateChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      dateFormat="yyyy-MM-dd"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={editTransactionData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{transaction.category}</h3>
                  <p className="text-xl font-bold text-gray-800">${transaction.amount}</p>
                  <p className="text-sm text-gray-500">Date: {transaction.date.toDateString()}</p>
                  <p className="text-sm text-gray-500">Description: {transaction.description}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="text-sm text-red-600 hover:text-red-700 mr-2"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTransactions;
