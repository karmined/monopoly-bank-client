import { useHTTP } from '../../hooks/http.hook';
import { Typography, Container } from '@mui/material';
import { useEffect, useState } from "react";
import RenderGames from "./RenderGames"
import GamesControls from "../../components/GamesControls"

export const GamesPage = () => {
    const { loading, request, error, clearError } = useHTTP();
    const [refreshGames, setRefreshGames] = useState(true);
    const [games, setGames] = useState([]);
    const [filterConfig, setFilterConfig] = useState({
        finished: false
    });
    const [sourceGames, setSourceGames] = useState([]);

    useEffect(() => {
        console.log(sourceGames, "sourceGames")
        setGames(sourceGames.filter(game => game.finished === filterConfig.finished));
    }, [filterConfig, sourceGames]);

    useEffect(() => {
        const getGames = async () => {
            const data = await request("/api/games/");
            setSourceGames(data);
            setRefreshGames(false);
        }

        if (!sourceGames || refreshGames) {
            getGames();
        }
    }, [request, refreshGames]);

    return (
        <>
            <Typography style={{ marginBottom: "15px" }} variant="h5" align="center">Games list</Typography>
            <Container maxWidth="sm">
                <GamesControls setFilterConfig={setFilterConfig} filterConfig={filterConfig} />
                <RenderGames games={games} setRefreshGames={setRefreshGames} />
            </Container>
        </>
    );
}