import React, { FC, useState, useEffect } from "react";
import { useAction, useAppSelector } from "../../hooks/redux";
import RewiewCard from "./RewiewCard";
import style from './Rewiews.module.scss';

const Rewiews: FC = () => {
    const { rewiews, error, isLoading } = useAppSelector(state => state.rewiews)
    const { getRewiews } = useAction();

    useEffect(() => {
        getRewiews();
    }, []);

    return (
        <div className={style.rewiews}>
            {
                !isLoading &&
                rewiews?.map((rewiew, index) => <RewiewCard key={index.toString()} data={rewiew} />)
            }
        </div>
    )
}

export default Rewiews;