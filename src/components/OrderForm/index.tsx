import React, { FC, useState, FormEvent, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { formatPrice } from '../../utils/format'
import axios from "axios";
import PopUp from "../PopUp";
import style from './OrderForm.module.scss';

type TResp = {
    success: number,
    error?: string
}

const OrderForm: FC = () => {
    const { cart, isEmpty } = useAppSelector(state => state.cart);
    const [tel, setTel] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [errorMass, setErrorMass] = useState<string>('');
    const [fMass, setFMass] = useState<string>('');
    const telExp: RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g;
    const [popup, setPopup] = useState(false);


    const getInputNumbers = (num: string) => {
        return num.replace(/\D/g, '');
    }

    const inputHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        let num = getInputNumbers(target.value);
        let formatedNum = '';
        if (['7', '8', '9'].indexOf(num[0]) > -1) {
            if (num[0] === '9') num = '7' + num;
            let firstNum = (num[0] === '8') ? '8' : '+7';
            formatedNum = firstNum + ' ';
            if (num.length > 1) {
                formatedNum += `(${num.substring(1, 4)}`;
            }
            if (num.length >= 5) {
                formatedNum += `) ${num.substring(4, 7)}`;
            }
            if (num.length >= 8) {
                formatedNum += ` ${num.substring(7, 9)}`;
            }
            if (num.length >= 10) {
                formatedNum += `-${num.substring(9, 11)}`;
            }
        } else {
            setTel(`+${num.substring(0, 16)}`);
            return;
        }
        setTel(formatedNum);
        setError(false);
        setErrorMass('');
        setFMass('');
    }

    const inputClear = (e: KeyboardEvent) => {
        const key = e.key;
        if (key === 'Backspace' && getInputNumbers(tel).length === 1) {
            setTel('');
        }
        setError(false);
        setFMass('');
    }

    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (tel.length === 0) {
            setError(true);
            setErrorMass('Поле не должно быть пустым');
            return;
        }
        if (!telExp.test(tel)) {
            setError(true);
            setErrorMass('Неправильный номер');
            return;
        }

        type TRespCart = {
            id: number,
            quantity: number
        }

        let cartData: TRespCart[] = [];
        if (cart) {
            for (let i of cart) {
                cartData.push({ id: i.id, quantity: i.count })
            }
        }
        const data = {
            phone: tel.replace(/\D/g, ''),
            cart: cartData,
        }
        const resp = await axios.post('http://o-complex.com:1337/order', data);
        const rData: TResp = await resp.data;
        if (rData.success === 1) {
            setFMass('Заказ оформлен');
            setPopup(true);
        } else {
            if (rData.error) {
                setFMass(rData?.error);
                setPopup(true);
            }
        }

    }

    useEffect(() => {
        if (tel.length > 0) {
            localStorage.setItem('phone', tel);
        }
    }, [tel]);

    useEffect(() => {
        if (localStorage.getItem('phone')) {
            let num: string = localStorage.getItem('phone') as string;
            setTel(num);
        }
    }, []);

    return (
        <form onSubmit={formHandler} className={style.form}>
            {popup && <PopUp close={() => setPopup(false)} massege={fMass} />}
            <h2 className={style.title}>Добавленные товары</h2>
            {
                !isEmpty &&
                cart?.map((item, index) =>
                    <p className={style.item} key={index.toString()}>
                        <span className={style.name}>{item.title}</span>
                        <span className={style.pc}>
                            <span className={style.count}>x{item.count}</span>
                            <span className={style.price}>{formatPrice.format(item.price * item.count)}</span>
                        </span>
                    </p>
                )
            }
            <div className={style.inputs}>
                <div className={style.inputCon}>
                    <input
                        type="tel"
                        placeholder="+7 (___) ___ __-__"
                        onChange={inputHandler}
                        onKeyDown={inputClear}
                        value={tel}
                        className={style.input}
                        style={{
                            border: error ? `1px solid red` : 'none'
                        }}
                    />
                    {error && <div className={style.error}>{errorMass}</div>}
                </div>
                <button type="submit" className={style.button}>заказать</button>
            </div>
        </form>
    )
}

export default OrderForm;