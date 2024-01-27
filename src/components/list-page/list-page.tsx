import React from "react";
import { nanoid } from "nanoid";
import { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { IRandomArray, generateRandomArray, performDelay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "./class/list";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const list = new LinkedList(generateRandomArray(1, 6));

export const ListPage: React.FC = () => {
  const [addToHeadLoad, setAddToHeadLoad] = useState(false);
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

  const addToHead = async () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    setAddToHeadLoad(true);
    setInputValue('');

    list.prepend({
      value: +inputValue,
      state: ElementStates.Default
    })

    array[0]!.small = {
      value: inputValue,
      type: 'top'
    };
    await performDelay(1000)

    array[0]!.small = undefined;
    setAddToHeadLoad(false);
    list.toArray()[0]!.state = ElementStates.Modified;
    setArray(list.toArray());
    await performDelay(1000)

    list.toArray()[0]!.state = ElementStates.Default;
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
          {array.map((item, index, arr) => (
            <div className={`${styles.circles__item}`}>
              <Circle
                key={nanoid()}
                index={index}
                letter={`${item?.value}`}
                head={index === 0 && !addToHeadLoad ? 'head' : ''}
                tail={index === array.length - 1 ? 'tail' : ''}
                state={!item ? ElementStates.Default : item.state}
              />
              {arr.length - 1 !== index ?
                (
                  <ArrowIcon />)
                : null}

              {item?.small && (
                <Circle
                  extraClass={item.small.type === 'top'
                    ? styles.circles__top
                    : styles.circles__bottom}
                  letter={item.small.value}
                  isSmall={true}
                  state={ElementStates.Changing}
                />
              )}
            </div>

          ))}
        </div>
      </div>

    </SolutionLayout>
  );
};
