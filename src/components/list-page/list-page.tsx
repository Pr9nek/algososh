import React from "react";
import { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const inputLength: number = 4;

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.main}`}>
        <div className={`${styles.options}`}>
          <Input extraClass={`${styles.input}`} type="number" onChange={onChangeValue} maxLength={inputLength} value={inputValue} placeholder="Введите значение" />
          <Button
            text="Добавить в head"
            extraClass={`${styles.button}`}
            onClick={() => { }}
          />
          <Button
            text="Добавить в tail"
            extraClass={`${styles.button}`}
            onClick={() => { }}
          />
          <Button
            text="Удалить из head"
            extraClass={`${styles.button}`}
            onClick={() => { }}
          />
          <Button
            text="Удалить из tail"
            extraClass={`${styles.button}`}
            onClick={() => { }}
          />
        </div>
        <span className={`${styles.text}`}>Максимум — 4 символа</span>
        <div className={`${styles.options}`}>
          <Input extraClass={`${styles.input}`} type="number" onChange={onChangeValue} maxLength={inputLength} value={inputValue} placeholder="Введите индекс" />
          <Button
            text="Добавить по индексу"
            extraClass={`${styles.buttonLow}`}
            onClick={() => { }}
          />
          <Button
            text="Удалить по индексу"
            extraClass={`${styles.buttonLow}`}
            onClick={() => { }}
          />
        </div>
      </div>

    </SolutionLayout>
  );
};
