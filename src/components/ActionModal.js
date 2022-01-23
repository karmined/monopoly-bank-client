import { Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, OutlinedInput, InputAdornment, ButtonGroup, Button } from '@mui/material';
import { useState, useRef, useEffect } from "react"
import { useHTTP } from '../hooks/http.hook';
import { ArrowRightAlt } from '@mui/icons-material';

const ActionModal = ({ firstUser, secondUser, operationType, clearAll, gameId }) => {
    const [open, setOpen] = useState(true);
    const [amount, setAmount] = useState(0);
    const { request, loading, error } = useHTTP();
    const inputRef = useRef();

    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRef.current.focus();
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const handleAddSumm = (event) => {
        setAmount(amount + parseInt(event.target.value));
        inputRef.current.focus();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearAll();
    };

    const handleChange = (event) => {
        setAmount(event.target.value.replace(/\D/, ''));
    }

    const send = async () => {
        const bodyParams = {
            fromUserId: firstUser._id,
            toUserId: secondUser._id,
            amount,
            gameId,
        };
        if (operationType === "add") {
            bodyParams.fromUserId = secondUser._id;
            bodyParams.toUserId = firstUser._id;
        }
        try {
            const result = await request("/api/transactions/create", "POST", bodyParams);
        } catch (e) {
            console.log(e.message)
        }
        clearAll();
    }

    const keyPress = (e) => {
        if (e.key === 'Enter') send();
    }

    const descTrans = operationType === "add"
        ? <Typography style={{ display: "flex" }} variant={"h5"}>{secondUser.login} <ArrowRightAlt fontSize="large" /> {firstUser.login}</Typography>
        : <Typography style={{ display: "flex" }} variant={"h5"}>{firstUser.login} <ArrowRightAlt fontSize="large" /> {secondUser.login}</Typography>;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">
                {"Enter the amount"}
            </DialogTitle>
            <DialogContent>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    {descTrans}
                    <FormControl onChange={handleChange} fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            inputRef={inputRef}
                            onFocus={event => {
                                event.target.select();
                            }}
                            id="outlined-adornment-amount"
                            value={amount}
                            onKeyPress={keyPress}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                    <ButtonGroup size={"large"}>
                        <Button value={1} onClick={handleAddSumm}>+1</Button>
                        <Button value={5} onClick={handleAddSumm}>+5</Button>
                        <Button value={10} onClick={handleAddSumm}>+10</Button>
                        <Button value={20} onClick={handleAddSumm}>+20</Button>
                        <Button value={50} onClick={handleAddSumm}>+50</Button>
                        <Button value={100} onClick={handleAddSumm}>+100</Button>
                    </ButtonGroup>
                    {error && <p>{error}</p>}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={send} disabled={!amount}>
                    {loading ? "LOADING..." : "OK"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ActionModal;