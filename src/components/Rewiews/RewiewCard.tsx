import React, { FC, useEffect, useState } from "react";
import { TFeedback } from "../../types/feedbackTypes";
import style from './Rewiews.module.scss';

type TProps = {
    data: TFeedback,
}

export const RewiewCard: FC<TProps> = (props) => {
    const { data } = props;
    const [text, setText] = useState('');

    useEffect(() => {
        let newText = data.text.replace('<script>', '&lt;script&gt;');
        newText = newText.replace('</script>', '&lt;/script&gt;');
        setText(newText);
    }, []);

    return (
        <div className={style.card}>
            <div className={style.wrapper} dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
    )
}

export default RewiewCard;