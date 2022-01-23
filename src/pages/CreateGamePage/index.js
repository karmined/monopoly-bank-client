import { TextField, Button, Typography, Container } from '@mui/material';
import { useHTTP } from '../../hooks/http.hook';
import { useEffect, useState } from "react";
import { Add } from '@mui/icons-material';
import RenderUsers from "./RenderUsers"
import { useSelections } from 'ahooks';
import { grey } from '@mui/material/colors';
import { useHistory } from "react-router-dom"

export const CreateGamePage = () => {
    const history = useHistory();
    const { loading, request, error, clearError } = useHTTP();
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: (new Date()).toLocaleString(),
        startMoney: 1500
    });
    const {
        selected,
        isSelected,
        toggle,
    } = useSelections(users);

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await request("/api/user/");
            setUsers(data);
        }

        getUsers();
    }, [request]);

    const sendRequest = async () => {
        const result = await request("/api/games/create", "POST", { ...form, users: selected.map(user => user._id) });
        history.push(`/game/${result.game._id}`)
        console.log(result);
    }


    return (
        <div>
            <Typography style={{ marginBottom: "15px" }} variant="h5" align="center">Create game</Typography>
            <Container maxWidth="sm" sx={{ bgcolor: grey[100], padding: "25px 0" }}>
                <TextField onChange={changeHandler} value={form.name} name="name" label="Name" size="small" style={{ marginBottom: "15px" }} fullWidth={true} />
                <TextField onChange={changeHandler} value={form.startMoney} name="startMoney" label="Start money" type="number" size="small" style={{ marginBottom: "15px" }} fullWidth={true} />
                <Typography style={{ marginBottom: "15px" }} variant="h6" align="center">Add users</Typography>
                <RenderUsers users={users} selected={selected} isSelected={isSelected} toggle={toggle} />
                <Button onClick={sendRequest} startIcon={<Add />} disabled={loading} style={{ marginTop: "15px" }} size={"large"} fullWidth={true} variant="contained">Create</Button>
            </Container>
        </div>
    );
}