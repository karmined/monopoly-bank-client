import { useContext } from "react";
import { useHTTP } from '../hooks/http.hook';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { GameContext } from "../context/GameContext"

const Transaction = ({ item, users }) => {
    const fromUserLogin = users.filter(user => user._id === item.from)[0].login;
    const toUserLogin = users.filter(user => user._id === item.to)[0].login;

    return <TableRow key={item._id}>
        <TableCell>{item.amount}</TableCell>
        <TableCell>{fromUserLogin}</TableCell>
        <TableCell>{toUserLogin}</TableCell>
        <TableCell>{(new Date(item.createdAt)).toLocaleTimeString()}</TableCell>
    </TableRow>;
}

const TransactionsList = ({ gameId, users }) => {
    const { request, loading } = useHTTP();
    const {
        getGameTransactions,
        transactions
    } = useContext(GameContext)

    if (loading) return <div>Loading...</div>;

    if (!transactions || !transactions.length) {
        return <div>No transactions</div>;
    }

    return (
        <Paper elevation={3} >
            <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map(item =>
                                <Transaction key={item._id} item={item} users={users} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        </Paper>
    );
}

export default TransactionsList;