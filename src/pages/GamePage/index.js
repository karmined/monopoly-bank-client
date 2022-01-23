import { Typography, Container, Grid } from '@mui/material';
import { useHTTP } from '../../hooks/http.hook';
import { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import GameUsers from "../../components/GameUsers"
import TransactionsList from "../../components/TransactionsList"
import Cube from "../../components/Cube"
import { GameContext } from "../../context/GameContext"
import GameControls from '../../components/GameControls';


export const GamePage = () => {
    const { token } = useContext(AuthContext);
    const {
        setGameId,
        game,
        gameId: gameIdFromContext,
        gameBalance,
        updateGameBalance,
        addTransaction,
        transactions
    } = useContext(GameContext);
    const [checkConnect, setCheckConnect] = useState(false);

    const gameId = useParams().id;

    useEffect(() => {
        const subscribe = async () => {
            const eventSource = new EventSource("http://localhost:4000/api/update");
            const eventCheckSource = new EventSource("http://localhost:4000/api/update/check");

            eventSource.onmessage = (event) => {
                if (JSON.parse(event.data).check) {
                    eventCheckSource.close();
                    return;
                }
                updateGameBalance(JSON.parse(event.data).balance)
                addTransaction(JSON.parse(event.data).transaction)
            }
            if (!checkConnect) {
                eventCheckSource.onopen = () => {
                    setCheckConnect(true);
                };
            }
        }

        subscribe();
    }, []);

    useEffect(() => {
        setGameId(gameId);
    }, [gameId])

    if (!game) return (
        <p>No game</p>
    )

    return (
        <>
            <Typography style={{ marginBottom: "15px" }} variant="h5" align="center">{game.name}</Typography>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={5}>
                        {game && <GameControls game={game} />}
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {game && <GameUsers users={game.users} balance={gameBalance} gameId={gameId} />}
                    </Grid>
                    <Grid item xs={5}>
                        {game && <TransactionsList gameId={gameId} users={game.users} />}
                    </Grid>
                    <Grid item xs={3}>
                        <Cube />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}