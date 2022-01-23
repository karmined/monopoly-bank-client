import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { useState } from "react"
import { useHTTP } from '../hooks/http.hook';

const RemoveGame = ({ game, setRefreshGames }) => {
    const [open, setOpen] = useState(false);
    const { loading, error, request } = useHTTP();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteGame = async () => {
        const result = await request(`/api/games/${game._id}`, "DELETE");
        if (result.deletedCount) {
            setRefreshGames(true)
            setOpen(false);
        }
    }

    return (
        <div>
            <Button color={"error"} onClick={handleClickOpen}>
                Remove
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm deleting?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Remove this game?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={loading} onClick={handleClose} color={"error"}>Cancel</Button>
                    <Button disabled={loading} onClick={deleteGame} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RemoveGame;