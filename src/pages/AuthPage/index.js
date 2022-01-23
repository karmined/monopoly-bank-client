import { TextField, Button, Typography, Container } from '@mui/material';
import { useState, useEffect, useContext } from "react"
import { AuthContext } from '../../context/AuthContext';
import { useHTTP } from '../../hooks/http.hook';
import { Login, PersonAdd } from '@mui/icons-material';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({
        login: "",
        password: "",
    });
    const { loading, request, error, clearError } = useHTTP();

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const registerHandler = async () => {
        clearError();
        try {
            const data = await request("/api/auth/register", "POST", { ...form })
        } catch (e) {
            console.log(e.message, "registerHandler error");
        }
    };

    const loginHandler = async () => {
        clearError();
        try {
            const data = await request("/api/auth/login", "POST", { ...form });
            auth.login(data.token, data.userId);
        } catch (e) {
            console.log(e.message, "loginHandler error");
        }
    };

    return (
        <div>
            <Typography style={{ marginBottom: "15px" }} variant="h2" align="center">Login page</Typography>
            <Container maxWidth="sm">
                <TextField onChange={changeHandler} name="login" label="Login" size="small" style={{ marginBottom: "15px" }} fullWidth={true} />
                <TextField onChange={changeHandler} name="password" label="Password" size="small" style={{ marginBottom: "15px" }} fullWidth={true} type="password" />
                {error && <Typography variant="h6" color="red" style={{ marginBottom: "15px" }} align="center" >{error}</Typography>}
                <Button startIcon={<Login />} disabled={loading} onClick={loginHandler} style={{ marginBottom: "15px" }} size={"large"} fullWidth={true} variant="contained">Login</Button>
                <Button startIcon={<PersonAdd />} disabled={loading} onClick={registerHandler} style={{ marginBottom: "15px" }} size={"large"} fullWidth={true} variant="outlined">Register</Button>
            </Container>
        </div>
    );
}