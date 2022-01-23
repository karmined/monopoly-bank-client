import { IconButton, Typography, ButtonGroup, Button } from '@mui/material';
import { Loop, AccountBalance } from '@mui/icons-material';
import { useHTTP } from '../hooks/http.hook';

const GameUserBottomButtons = ({ activeOperation, user, gameId, fastBankTransaction }) => {
    const { request, loading, error } = useHTTP();

    const addLoop = async ({ user }) => {
        try {
            const result = await request("/api/transactions/create", "POST", {
                fromUserId: "618cf6c471df340c3aa0f25c",
                toUserId: user._id,
                amount: 200,
                gameId
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    const minusTaxes = async ({ user }) => {
        try {
            const result = await request("/api/transactions/create", "POST", {
                fromUserId: user._id,
                toUserId: "618cf6c471df340c3aa0f25c",
                amount: 50,
                gameId
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    if (activeOperation) return null;

    return (
        <div style={{ display: "flex", alignItem: "center", justifyContent: "space-between" }}>
            <IconButton disabled={loading} size="large" color="success" onClick={() => addLoop({ user })}>
                <Loop />
            </IconButton>
            <ButtonGroup variant="outlined" size="smal">
                <Button color="success" onClick={() => fastBankTransaction({ user, operationType: "add" })}>
                    <Typography style={{
                        fontSize: "20px",
                        fontWeight: 800,
                    }}>+</Typography>
                </Button>
                <Button disabled={true}>Bank</Button>
                <Button color="error" onClick={() => fastBankTransaction({ user, operationType: "minus" })}>
                    <Typography style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "black",
                    }}>-</Typography>
                </Button>
            </ButtonGroup>
            <IconButton disabled={loading} size="large" color="error" onClick={() => minusTaxes({ user })}>
                <AccountBalance />
            </IconButton>
        </div>
    )
}

export default GameUserBottomButtons;