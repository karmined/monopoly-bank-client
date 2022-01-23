import { FormControlLabel, FormGroup, Switch } from '@mui/material';

const GamesControls = ({ setFilterConfig, filterConfig }) => {
    const handleChange = (event) => {
        setFilterConfig({
            ...setFilterConfig,
            finished: event.target.checked
        });
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch
                    onChange={handleChange}
                    checked={filterConfig.finished} />}
                label="Finished"
            />
        </FormGroup>
    )
}

export default GamesControls;