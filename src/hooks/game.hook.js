import { useState, useCallback, useEffect } from "react";
import { useHTTP } from './http.hook';

export const useGame = () => {
    const [transactions, setTransactions] = useState([]);
    const [id, setId] = useState(null);
    const [game, setGame] = useState(null);
    const [gameBalance, setGameBalance] = useState(null);
    const { request, loading } = useHTTP();

    useEffect(() => {
        getGame();
        getGameTransactions();
    }, [id]);

    const getGameTransactions = useCallback(async () => {
        if (!id) return;
        try {
            const result = await request(`/api/transactions/${id}`, "GET");
            setTransactions(result.transactions);
        } catch (e) {
            console.log(e, "TransactionsList")
        }
    }, [id]);

    const addTransaction = useCallback((data) => {
        setTransactions((prev) => [data, ...prev]);
    }, [transactions]);

    const setGameId = useCallback((id) => {
        setId(id)
    }, []);

    const updateGameBalance = useCallback((data) => {
        setGameBalance(data);
    }, [setGameBalance]);

    const getGame = useCallback(async () => {
        if (!id) return;
        try {
            const result = await request(`/api/games/${id}`, "GET");
            if (result) {
                setGameBalance(result.balance);
                setGame(result);
            }
        } catch (e) {

        }
    }, [id]);

    return { transactions, setGameId, gameId: id, gameBalance, game, updateGameBalance, addTransaction, getGameTransactions }
}