import { List, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton, IconButton, Fade, Menu, MenuItem, FormControlLabel, Switch } from '@mui/material';
import { deepOrange, lime, grey } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { MoreVert } from '@mui/icons-material';
import { useState } from "react"
import RemoveGame from "../../components/RemoveGame"

const RenderGame = ({ game, setRefreshGames }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ListItem secondaryAction={<>
            <IconButton edge="end" aria-label="comments" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id={game._id}
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {/* <MenuItem onClick={handleClose}> */}
                <MenuItem>
                    <RemoveGame game={game} setRefreshGames={setRefreshGames} />
                </MenuItem>
            </Menu>
        </>
        }>
            <Link to={`/game/${game._id}`} style={{ textDecoration: 'none' }}>

                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar
                            sx={{ bgcolor: game.finished === true ? deepOrange[500] : lime[500] }}
                        >
                            {game.finished === true ? "OFF" : "ON"}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={game.name} secondary={game.users.length + " players"} />
                </ListItemButton>
            </Link>

        </ListItem>
    );
}

const RenderGames = ({ games, setRefreshGames }) => {
    if (!games.length) return <Typography>No games</Typography>;

    return (
        <List sx={{ width: '100%', bgcolor: grey[100] }}>
            {games.map(game => <RenderGame key={game._id} game={game} setRefreshGames={setRefreshGames} />)}
        </List>
    )
}

export default RenderGames;