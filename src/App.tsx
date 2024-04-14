import React, { useEffect } from 'react';

import Rewiews from './components/Rewiews';
import OrderForm from './components/OrderForm';
import { useAction, useAppDispatch, useAppSelector } from './hooks/redux';
import { TCart, cartSlice } from './store/reducers/cartReducer'
import Shop from './components/Shop';
import style from './App.module.css';


function App() {
  const { products, loading } = useAppSelector(state => state.shop);
  const { getShopData } = useAction()
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      const cartString = localStorage.getItem('cart');
      if (cartString) {
        const cart: TCart[] = JSON.parse(cartString);
        dispatch(cartSlice.actions.setData(cart));
      }
    }
  });

  useEffect(() => {
    if (!loading) {
      getShopData(1);
    }
  }, []);

  return (
    <div className={style.App}>
      <h1 className={style.title}>тестовое задание</h1>
      <Rewiews />
      <OrderForm />
      <Shop />
    </div>
  );
}

export default App;
