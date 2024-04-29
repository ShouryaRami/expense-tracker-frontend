import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';

function Expense2() {
    const [data, setData] = useState({ type: '', amount: '' });
    const [array, setArray] = useState([]);
    const [updateIdx, setUpdateIdx] = useState(undefined);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/expense/getRecord');
            setArray(response.data.fullRecord);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async () => {
        try {
            const response = await axios.post('http://localhost:3000/expense/newEntry', data);
            fetchExpenses(); // Refresh expenses after adding
            setData({ type: '', amount: '' });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/expense/deleteEntry?id=${id}`);
            fetchExpenses(); // Refresh expenses after deletion
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const updateExpense = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/expense/updateEntry?id=${updateIdx}`, data);
            fetchExpenses(); // Refresh expenses after update
            setData({ type: '', amount: '' });
            setUpdateIdx(undefined);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleChange = (e, type) => {
        setData({ ...data, [type]: e.target.value });
    };

    const handleUpdateClick = () => {
        updateExpense();
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" sx={{ bgcolor: '#45CFDD', color: '#6527BE', p: 2 }}>
                Expense Tracker
            </Typography>
            <div style={{ padding: '20px' }}>
                <TextField
                    label="Type (credit/debit)"
                    fullWidth
                    value={data.type}
                    onChange={(e) => handleChange(e, 'type')}
                />
                <TextField
                    label="Amount"
                    fullWidth
                    value={data.amount}
                    onChange={(e) => handleChange(e, 'amount')}
                />
                <Button variant="outlined" onClick={addExpense} style={{ marginLeft: '10px', marginTop: '10px' }}>
                    Add Expense
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Entry ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>{entry.id}</TableCell>
                                <TableCell>{entry.type}</TableCell>
                                <TableCell>{entry.amount}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => deleteExpense(entry.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Expense2;
