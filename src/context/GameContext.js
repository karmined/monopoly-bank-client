import { createContext } from "react";

export const GameContext = createContext({
    gameId: null,
    game: null,
    balance: null,
    transactions: null,
    gameBalance: null,
    setGameId: () => {},
    updateGameBalance: () => {},
    addTransaction: () => {},
    getGameTransactions: () => {},
});