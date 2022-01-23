import { Button, Typography } from '@mui/material';
import { useState, useEffect } from "react"
import CubeImg from "./CubeImg"

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Cube = () => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [showImg, setShowImg] = useState(false);

    const handleClick = () => {
        setValue1(getRandomInt(1, 6));
        setValue2(getRandomInt(1, 6));
        setShowImg(true);
    }

    useEffect(() => {
        if (!showImg) return;
        const timeout = setTimeout(() => {
            setShowImg(false);
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [showImg, setShowImg]);

    return (
        <>
            <Button variant={"outlined"} style={{ marginBottom: "25px" }} onClick={handleClick}>Generate</Button>
            {!showImg && <div style={{ display: "flex" }}>
                {/* <Typography component={"span"} variant={"h3"} style={{ marginRight: "25px" }}>{value1}</Typography>
                <Typography component={"span"} variant={"h3"}>{value2}</Typography> */}
                <CubeImg number={value1} />
                <CubeImg number={value2} />
            </div>}
            {showImg &&
                <img src={"https://www.gifki.org/data/media/710/igralnaya-kost-animatsionnaya-kartinka-0079.gif"} />
            }
        </>
    )
}

export default Cube;