import { TextField, Button, Typography, Container, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { Add, Check } from '@mui/icons-material';


const RenderUser = ({ user, toggle, isSelected }) => {
    return (
        <FormControlLabel
            control={<Checkbox checked={isSelected(user)} icon={<Add />} checkedIcon={<Check />} />}
            label={user.login}
            onClick={() => toggle(user)}
        />
    )
}

const RenderUsers = ({ users, toggle, isSelected, selected }) => {


    if (!users.length) return <Typography>No users</Typography>;

    return (
        <>
            <Typography variant={"body1"}>Selected: {selected.length}</Typography>
            <FormGroup>
                {users.filter(item => item._id !== "618cf6c471df340c3aa0f25c").map(user => <RenderUser key={user._id} user={user} toggle={toggle} isSelected={isSelected} />)}
            </FormGroup>
        </>
    )
}

export default RenderUsers;