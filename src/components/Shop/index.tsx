import React, { FC, useEffect, useState } from "react";
import { useAction, useAppDispatch, useAppSelector } from "../../hooks/redux";
import axios from "axios";
import { TFetching } from "../../types/shopTypes";
import ShopCart from "./ShopCart";
import { ReactComponent as Loader } from '../../assets/loader.svg';
import style from './Shop.module.scss';
import { shopReducerSlice } from "../../store/reducers/shopReducer";

const Shop: FC = () => {
    const { page, products, error, loading, total } = useAppSelector(state => state.shop);
    const { setData } = useAction();
    const [fetching, setFetching] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(page + 1);
    const dispatch = useAppDispatch();

    const getMoreProducts = (e: Event) => {
        const target = e.target as Document;
        if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', getMoreProducts);
        return () => document.removeEventListener('scroll', getMoreProducts)
    }, []);

    useEffect(() => {
        if (fetching) {
            dispatch(shopReducerSlice.actions.setLoading());
            axios.get<TFetching>(`http://o-complex.com:1337/products?page=${pages}&page_size=6`)
                .then(resp => {
                    const data = resp.data
                    setData(data.products, pages + 1);
                    setPages(pages + 1);

                })
                .finally(() => {
                    console.log('Fetchng end');
                    setFetching(false)
                });
        }
    }, [fetching])

    return (
        <div className={style.shop}>
            {products?.map((item, index) => <ShopCart key={index.toString()} item={item} />)}
            {loading && <div className={style.preloader}><Loader /></div>}
        </div>
    )
}

export default Shop