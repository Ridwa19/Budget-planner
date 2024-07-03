import React, { useState } from 'react';
import axios from 'axios';

const AddTransactionForm = ({ budgetId }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/transactions', {
                budgetId,
                amount,
                description
            }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            console.log(response.data);
            // Handle successful transaction creation, e.g., refresh transaction list
        } catch (error) {
            console.error(error.response.data);
            // Handle transaction creation error
        }
    };

    return (
        <div>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransactionForm;
