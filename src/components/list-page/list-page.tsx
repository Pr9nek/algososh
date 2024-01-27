import React from "react";
import { nanoid } from "nanoid";
import { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { IRandomArray, generateRandomArray } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "./class/list";
import { ArrowIcon } from "../ui/icons/arrow-icon";

const list = new LinkedList(generateRandomArray(1, 6));

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  // const [array, setArray] = useState<IRandomArray[]>([]);
  const [array, setArray] = useState(list.toArray());
  // const [arrayList, setArrayList] = useState(list);
  const inputLength: number = 4;

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

  // const showHead = (index: number): string => index !== 0 ? "" : "head";
  // const showTail = (index: number): string => index !== array.length - 1 ? "" : "tail";

  const addToHead = () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    list.prepend({
      value: +inputValue,
      state: ElementStates.Default
    })
    setArray(list.toArray());
  }

  const addToTail = () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    list.append({
      value: +inputValue,
      state: ElementStates.Default
    })
    setArray(list.toArray());
  }

  const delHead = () => {
    list.deleteHead();
    setArray(list.toArray());
  }

  const delTail = () => {
    list.deleteTail();
    setArray(list.toArray());
  }

  const addWithIndex = () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    list.addByIndex({
      value: +inputValue,
      state: ElementStates.Default
    }, +inputIndex);
    setArray(list.toArray());
  }

  const delWithIndex = () => {
    list.deleteByIndex(+inputIndex);
    setArray(list.toArray());
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.main}`}>
        <div className={`${styles.options}`} >
          <Input extraClass={`${styles.input}`} onChange={onChangeValue} maxLength={inputLength} value={inputValue} placeholder="Введите значение" />
          <Button
            text="Добавить в head"
            extraClass={`${styles.button}`}
            onClick={addToHead}
          />
          <Button
            text="Добавить в tail"
            extraClass={`${styles.button}`}
            onClick={addToTail}
          />
          <Button
            text="Удалить из head"
            extraClass={`${styles.button}`}
            onClick={delHead}
          />
          <Button
            text="Удалить из tail"
            extraClass={`${styles.button}`}
            onClick={delTail}
          />
        </div>
        <span className={`${styles.text}`}>Максимум — 4 символа</span>
        <div className={`${styles.options}`}>
          <Input extraClass={`${styles.input}`} type="number" onChange={onChangeIndex} maxLength={inputLength} value={inputIndex} placeholder="Введите индекс" />
          <Button
            text="Добавить по индексу"
            extraClass={`${styles.buttonLow}`}
            onClick={addWithIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={`${styles.buttonLow}`}
            onClick={delWithIndex}
          />
        </div>
        <div className={`${styles.circles}`}>
          {array.map((item, index) => (
            <div className={`${styles.circles__item}`}>
              <Circle
                key={nanoid()}
                index={index}
                letter={`${item?.value}`}
                head={index === 0 ? 'head' : ''}
                tail={index === array.length - 1 ? 'tail' : ''}
                state={!item ? ElementStates.Default : item.state}
              />
              {array.length - 1 !== index ?
                (
                  <ArrowIcon />)
                : null}
            </div>

          ))}
        </div>
      </div>

    </SolutionLayout>
  );
};
