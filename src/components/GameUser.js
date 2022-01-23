import { ListItem, IconButton, Divider, Typography, Switch } from '@mui/material';
import { Remove, Add } from '@mui/icons-material';
import { useHTTP } from '../hooks/http.hook';
import GameUserBottomButtons from "./GameUserBottomButtons"
import { useState } from "react"

const showStartIcon = ({ activeOperation, currentUser, operationType }) => {
    if (!activeOperation) return <Add />;

    if (currentUser || operationType === "add") return "";
    return <Add />;
}

const showEndIcon = ({ activeOperation, currentUser, operationType }) => {
    if (!activeOperation) return <Remove />;

    if (currentUser || operationType === "minus") return "";
    return <Remove />;
}

const GameUser = ({ user, balance, startAction, firstUser, operationType, gameId, fastBankTransaction, lastItem }) => {
    console.log(user, "user")
    const { loading, error, request } = useHTTP();
    const userBalance = balance.filter(item => item._id === user._id)[0]?.balance || 0;
    const userActive = balance.filter(item => item._id === user._id)[0]?.active;
    const [checked, setChecked] = useState(userActive);

    const activeOperation = !!firstUser;
    const currentUser = firstUser?._id === user._id;

    const startIcon = showStartIcon({ activeOperation, currentUser, operationType });
    const endIcon = showEndIcon({ activeOperation, currentUser, operationType });

    const handleChange = async (event) => {
        console.log(event.target.checked, "event.target.checked")
        setChecked(event.target.checked);

        const result = await request(`/api/games/${gameId}/update`, "POST", {
            balance: [
                ...balance.filter(u => u._id !== user._id),
                {
                    balance: userBalance,
                    active: event.target.checked,
                    _id: user._id,
                }
            ]
        });
    };

    return (
        <>
            <ListItem>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <div style={{ display: "flex", alignItem: "center", justifyContent: checked ? "space-between" : "center" }}>
                        {checked && <IconButton size="large" color="success" onClick={() => startAction({ user, operationType: "add" })}>
                            {startIcon}
                        </IconButton>}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography style={{
                                fontSize: "20px",
                                fontWeight: 500,
                                color: "rgb(112 112 112)",
                            }} align={"center"}>
                                {user.login} <Switch checked={checked}
                                    onChange={handleChange} />
                            </Typography>
                            {checked && <Typography style={{
                                fontSize: "20px",
                                fontWeight: 800,
                                color: "black",
                            }} align={"center"}>
                                {user._id === "618cf6c471df340c3aa0f25c" ? "" : userBalance}
                            </Typography>}
                        </div>
                        {checked && <IconButton size="large" color="error" onClick={() => startAction({ user, operationType: "minus" })}>
                            {endIcon}
                        </IconButton>}
                    </div>
                    {checked && <GameUserBottomButtons
                        activeOperation={activeOperation}
                        user={user} gameId={gameId}
                        fastBankTransaction={fastBankTransaction}
                    />}
                </div>
            </ListItem>
            {!lastItem && <Divider />}
        </>
    )
}

export default GameUser;