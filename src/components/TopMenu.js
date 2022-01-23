import { Button, Stack, Box, Container } from '@mui/material';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { FormatListBulleted, Add, Logout } from '@mui/icons-material';

const TopMenu = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        auth.logout();
    };

    return (
        <Box sx={{
            margin: "15px 0",
            display: "flex",
            justifyContent: "center"
        }}>
            <Stack spacing={2} direction="row">
                <Link to="/games" style={{ textDecoration: 'none' }}>
                    <Button startIcon={<FormatListBulleted />} variant="outlined">Games list</Button>
                </Link>
                <Link to="/create" style={{ textDecoration: 'none' }}>
                    <Button startIcon={<Add />} variant="outlined">Create game</Button>
                </Link>
                <Button startIcon={<Logout />} onClick={logoutHandler} variant="outlined">Logout</Button>
            </Stack>
        </Box>);
};

export default TopMenu;