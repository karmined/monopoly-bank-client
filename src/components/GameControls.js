import { FormControlLabel, Checkbox } from '@mui/material';
import { useState } from "react";
import { useHTTP } from '../hooks/http.hook';

const GameControls = ({ game }) => {
    console.log(game)
    const [checked, setChecked] = useState(game.finished);
    const { loading, error, request } = useHTTP();

    const handleChange = (event) => {
        setChecked(event.target.checked);
        request(`/api/games/${game._id}/update`, "POST", {
            finished: event.target.checked
        });
    };


    return (
        <FormControlLabel disabled={loading}
            control={<Checkbox onChange={handleChange} checked={checked} />}
            label="Finish game"
        />
    )
}

export default GameControls;