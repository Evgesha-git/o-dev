import React, { FC } from "react";
import style from './PopUp.module.scss';

type TProps = {
    close: () => void,
    massege: string
}

const PopUp: FC<TProps> = (props) => {
    const {close, massege} = props;

    return (
        <div className={style.popupItem}>
            <div className={style.container}>
                <h2 className={style.title}>{massege}</h2>
                <button className={style.button} onClick={close}>хорошо</button>
            </div>
        </div>
    )
}

export default PopUp;