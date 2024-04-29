import React from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

function Expense() {
    const [data, setData] = React.useState({});
    const [array, setArray] = React.useState([]);
    const [updateIdx, setUpdateIdx] = React.useState();

    const handleChange = (e, type) => {
        setData({ ...data, [type]: e.target.value });
    };

    const handleClick = () => {
        setArray([...array, data]);
        setData({ reason: '', amount: '', credit: '' });
    };

    const deletehandleClick = (idx) => {
        const updatedArray = array.filter((_, index) => index !== idx);
        setArray(updatedArray);
    };

    const updateClick = (idx) => {
        setData(array[idx]);
        setUpdateIdx(idx);
    };

    const handleUpdateClick = () => {
        const updatedArray = [...array];
        updatedArray[updateIdx] = data;
        setArray(updatedArray);
        setData({ reason: '', amount: '', credit: '' });
        setUpdateIdx(undefined);
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" sx={{ bgcolor: '#45CFDD', color: '#6527BE', p: 2 }}>
                Expense Tracker
            </Typography>
            <div style={{ padding: '20px' }}>
                <TextField
                    label="Reason"
                    fullWidth
                    style={{marginBottom:"20px"}}
                    value={data.reason || ''}
                    onChange={(e) => handleChange(e, 'reason')}
                />
                <TextField
                    label="Amount"
                    fullWidth
                    style={{marginBottom:"20px"}}
                    value={data.amount || ''}
                    onChange={(e) => handleChange(e, 'amount')}
                />
                <TextField
                    label="Credit/Debit"
                    fullWidth
                    style={{marginBottom:"20px"}}
                    value={data.credit || ''}
                    onChange={(e) => handleChange(e, 'credit')}
                />
                <Button variant="outlined" onClick={handleClick} style={{ marginLeft: '10px', marginTop: '10px' }}>
                    Add Expense
                </Button>
                {updateIdx !== undefined && (
                    <Button variant="outlined" onClick={handleUpdateClick} style={{ marginLeft: '10px', marginTop: '10px' }}>
                        Update
                    </Button>
                )}
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reason</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Credit/Debit</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array.map((val, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{val.reason}</TableCell>
                                <TableCell>{val.amount}</TableCell>
                                <TableCell>{val.credit}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => deletehandleClick(idx)}>
                                        Delete
                                    </Button>
                                    <Button variant="outlined" onClick={() => updateClick(idx)} style={{ marginLeft: '10px' }}>
                                        Edit
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

export default Expense;
