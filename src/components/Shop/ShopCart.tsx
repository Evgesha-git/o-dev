import React, { FC, useEffect, useState } from "react";
import { TCart } from "../../store/reducers/cartReducer";
import { formatPrice } from '../../utils/format'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TProduct } from "../../types/shopTypes";
import CountButton from "../CountButton";
import { cartSlice } from "../../store/reducers/cartReducer";
import style from './Shop.module.scss';

type TProps = {
    item: TProduct
}

const ShopCart: FC<TProps> = (props) => {
    const { item } = props;
    const { cart } = useAppSelector(state => state.cart);
    const [isCart, setIsCart] = useState<boolean>(false);
    const [cartItem, setCartItem] = useState<TCart>();
    const dispatch = useAppDispatch();

    const addCount = () => {
        if (cartItem) {
            const count = cartItem.count + 1;
            dispatch(cartSlice.actions.modProduct({ id: cartItem.id, count }));
        }
    }

    const removeCount = () => {
        if (cartItem) {
            const count = cartItem.count - 1;
            if (count < 1) {
                dispatch(cartSlice.actions.removeProduct(item.id));
                return;
            }
            dispatch(cartSlice.actions.modProduct({ id: cartItem.id, count }));
        }
    }

    const setCount = (n: number) => {
        if (cartItem) {
            dispatch(cartSlice.actions.modProduct({ id: cartItem.id, count: n }));
        }
    }

    const addToCart = () => {
        const data = { ...item, count: 1 };
        dispatch(cartSlice.actions.addProduct(data))
    }

    useEffect(() => {
        if (cart) {
            setIsCart(cart.some(prod => prod.id === item.id));
            setCartItem(cart.find(i => i.id === item.id));
        }
    }, [cart])

    return (
        <div className={style.cart}>
            <div className={style.top}>
                <div className={style.img}>
                    <img src={item.image_url} alt="img" />
                </div>
                <h3 className={style.title}>{item.title}</h3>
                <p className={style.desc}>{item.description}</p>
            </div>
            <div className={style.bot}>
                <p className={style.price}>цена: {formatPrice.format(item.price)}</p>
                {!isCart && <button onClick={addToCart} className={style.button}>Купить</button>}
                {isCart && cartItem && <CountButton count={cartItem.count} addCount={addCount} remCount={removeCount} setCount={setCount} />}
            </div>
        </div>
    )
}

export default ShopCart;