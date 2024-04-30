import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Select, MenuItem, Chip, Alert } from '@mui/material';
import axios from 'axios';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function Expense2() {
    const [data, setData] = useState({ type: '', amount: '' });
    const [array, setArray] = useState([]);
    const [updateIdx, setUpdateIdx] = useState(undefined);
    const [balance,setBalance]=useState()
    const [alert,setAlert] = useState({open:false,message:"",severnity:""})

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/expense/getRecord');
            setArray(response.data.fullRecord);
            setBalance(response.data.balance)
            console.log("show--------",response.data)
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async () => {
        try {
            const expenseData = {
                type: data.type,
                amount: parseInt(data.amount) // Convert amount to integer
            };
            const response = await axios.post('http://localhost:5000/expense/newEntry', expenseData);
            fetchExpenses(); // Refresh expenses after adding
            setData({ type: '', amount: '' });

            //For alert
            console.log("add--------",response.data)
            if(response.data.isSuccess == true){
                setAlert({open:true,message:response.data.message,severnity:"success"})
            }
            else{
                setAlert({open:true,message:response.data.message,severnity:"error"})
            }
            // console.log(response.data);

        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };
    // console.log("Alert----",alert)

    const deleteExpense = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/expense/deleteEntry?id=${id}`);
            fetchExpenses(); // Refresh expenses after deletion
            console.log(response.data);
            console.log("delete--------",response.data)
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const updateExpense = async () => {
        try {
            const expenseData = {
                type: data.type,
                amount: parseInt(data.amount) // Convert amount to integer
            };
            const response = await axios.put(`http://localhost:5000/expense/updateEntry?id=${updateIdx}`, expenseData);
            fetchExpenses(); // Refresh expenses after update
            setData({ type: '', amount: '' });
            setUpdateIdx(undefined);
            console.log(response.data);
            console.log("update--------",response.data)

            //For alert
            console.log("add--------",response.data)
            if(response.data.isSuccess == true){
                setAlert({open:true,message:response.data.message,severnity:"success"})
            }
            else{
                setAlert({open:true,message:response.data.message,severnity:"error"})
            }

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

    const updateClick = (idx) => {
        const selectedEntry = array[idx];
        setData({ type: selectedEntry.type, amount: selectedEntry.amount.toString() });
        setUpdateIdx(selectedEntry.id);
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" sx={{ bgcolor: '#45CFDD', py: 2, mb: 2 }}>
                Expense Tracker
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Select
                    value={data.type}
                    onChange={(e) => handleChange(e, 'type')}
                    fullWidth
                    sx={{
                        bgcolor: 'white',
                        borderRadius: '5px',
                        minWidth: '150px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        '&:focus': {
                            bgcolor: 'white', // Change focus color
                        },
                    }}
                >
                    <MenuItem value="credit">Credit</MenuItem>
                    <MenuItem value="debit">Debit</MenuItem>
                </Select>
                <TextField
                    label="Amount"
                    fullWidth
                    value={data.amount}
                    onChange={(e) => handleChange(e, 'amount')}
                    style={{ marginLeft: '10px' }}
                />
                {updateIdx === undefined ? (
                    <Button variant="outlined" onClick={addExpense} style={{ marginLeft: '10px' }}>
                        Add Expense
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={handleUpdateClick} style={{ marginLeft: '10px' }}>
                        Update Expense
                    </Button>
                )}
            </div>
            {/* <Button style={{marginBottom:"10px"}}>Balance = {balance} </Button> */}
            <Chip avatar={<AccountBalanceWalletIcon fontSize="small"/>} color='primary'  label={`Balance = ${balance} Rs`} style={{marginBottom:"10px"}} variant="Chip Filled" />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Entry ID</TableCell>
                            <TableCell align='center'>Type</TableCell>
                            <TableCell align='center'>Amount</TableCell>
                            <TableCell align='center'>Actions</TableCell> 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array.map((entry, idx) => (
                            <TableRow key={entry.id}>
                                <TableCell align='center'>{entry.id}</TableCell>
                                <TableCell align='center'>{entry.type}</TableCell>
                                <TableCell align='center'>{parseInt(entry.amount)}</TableCell> {/* Display as integer */}
                                <TableCell align='center'>
                                    <Button variant="outlined" onClick={() => deleteExpense(entry.id)}>
                                        Delete
                                    </Button>
                                    <Button variant="outlined" onClick={() => updateClick(idx)} style={{ marginLeft: '10px' }}>
                                        Update
                                    </Button>
                                 
                             
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {alert.open && (
          <Alert
            onClose={() => setAlert({ ...alert, open: false })}
            severity={alert.severnity}
            sx={{ zIndex: 9999 }}
          >
            {alert.message}
          </Alert>
        )}

        </Container>
    );
}

export default Expense2;
