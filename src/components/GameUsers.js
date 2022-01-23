import { List, Button, Paper } from '@mui/material';
import GameUser from "./GameUser"
import { useCallback, useEffect, useState } from "react"
import ActionModal from "./ActionModal"

const GameUsers = ({ users, balance, gameId }) => {
    const [firstUser, setFirstUser] = useState(null);
    const [secondUser, setSecondUser] = useState(null);
    const [operationType, setOperationType] = useState(null);
    const [userList, setUserList] = useState(users);
    const [bank, setBank] = useState(users.filter(user => user._id === "618cf6c471df340c3aa0f25c"))[0];

    const clearAll = useCallback(() => {
        setFirstUser(null);
        setSecondUser(null);
        setOperationType(null);
    }, [setFirstUser, setSecondUser, setOperationType]);

    const fastBankTransaction = useCallback(({ user, operationType }) => {
        console.log(user, operationType, "user, operationType")
        setFirstUser(user);
        setSecondUser(bank);
        setOperationType(operationType);
    }, [setFirstUser, setOperationType, setSecondUser, setFirstUser, firstUser]);

    const startAction = useCallback(({ user, operationType }) => {
        if (firstUser) {
            setSecondUser(user)
        } else {
            setFirstUser(user);
            setOperationType(operationType);
        }
    }, [setFirstUser, setOperationType, setSecondUser, setFirstUser, firstUser]);

    useEffect(() => {
        setUserList(...[userList.filter(user => user._id !== "618cf6c471df340c3aa0f25c")])
    }, [firstUser])

    if (!users?.length) {
        return (<div>No users</div>)
    }

    return (
        <>
            {firstUser && <Button onClick={() => setFirstUser(null)}>Cancel</Button>}
            <Paper elevation={3} >
                <List>
                    {userList.map((user, key) => <GameUser
                        firstUser={firstUser}
                        startAction={startAction}
                        key={user._id}
                        user={user}
                        balance={balance}
                        operationType={operationType}
                        gameId={gameId}
                        fastBankTransaction={fastBankTransaction}
                        lastItem={key === userList.length - 1}
                    />)}
                </List>
            </Paper>
            {firstUser && secondUser && <ActionModal
                firstUser={firstUser}
                secondUser={secondUser}
                operationType={operationType}
                clearAll={clearAll}
                gameId={gameId}
            />}
        </>
    );
}
export default GameUsers;