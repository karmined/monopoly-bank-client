import { Switch, Route, Redirect } from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { CreateGamePage } from "./pages/CreateGamePage"
import { GamesPage } from "./pages/GamesPage"
import { GamePage } from "./pages/GamePage"

export const useRoutes = isAuthenticated => {
    console.log(isAuthenticated, "isAuthenticated")
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/games" />
                </Route>
                <Route path="/create">
                    <CreateGamePage />
                </Route>
                <Route path="/game/:id">
                    <GamePage />
                </Route>
                <Route path="/games">
                    <GamesPage />
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="*">
                <AuthPage />
            </Route>
        </Switch>
    )
}