import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom"
import { Container, CssBaseline } from '@mui/material';
import { useAuth } from "./hooks/auth.hook";
import { useGame } from "./hooks/game.hook";
import { AuthContext } from "./context/AuthContext";
import { GameContext } from "./context/GameContext";
import TopMenu from "./components/TopMenu";

function App() {
  const { login, logout, token, userId } = useAuth();
  const { setGameId, gameId, gameBalance, game, updateGameBalance, addTransaction, transactions, getGameTransactions } = useGame();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuthenticated }}>
      <GameContext.Provider value={{ setGameId, gameId, gameBalance, game, updateGameBalance, addTransaction, transactions, getGameTransactions }}>
        <BrowserRouter>
          <CssBaseline />
          <Container>
            {isAuthenticated && <TopMenu />}
            {routes}
          </Container>
        </BrowserRouter>
      </GameContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
