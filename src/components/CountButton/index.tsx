import React, { FC, useState, ChangeEvent } from "react";
import style from './Button.module.scss';

type TProps = {
    count: number,
    addCount: () => void,
    remCount: () => void,
    setCount: (a: number) => void
}

const CountButton: FC<TProps> = (props) => {
    const { count, addCount, remCount, setCount } = props;

    const setCountInput = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const num = +target.value.replace(/\D/g, '');
        setCount(num);
    }

    return (
        <div className={style.countButton}>
            <div className={style.butMin} onClick={remCount}>-</div>
            <input type="text" value={count} onChange={setCountInput} className={style.input}/>
            <div className={style.butAdd} onClick={addCount}>+</div>
        </div>
    )
}

export default CountButton;