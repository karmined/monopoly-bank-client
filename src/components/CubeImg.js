import { styled } from '@mui/system';
import "./Cube.css"

const Dot = () => {
    return <li className="dice__point"></li>;
}

const getClassName = (number) => {
    const base = "dice dice_";
    switch (number) {
        case 1:
            return base + "one";
            break;
        case 2:
            return base + "two";
            break;
        case 3:
            return base + "three";
            break;
        case 4:
            return base + "four";
            break;
        case 5:
            return base + "five";
            break;
        case 6:
            return base + "six";
            break;
    }
}

const CubeImg = ({ number }) => {
    const array = Array.from(Array(number));
    const classNameWrap = getClassName(number);

    return <ul className={classNameWrap}>
        {array.map((item, key) => <Dot key={key} />)}
    </ul>
}

export default CubeImg;