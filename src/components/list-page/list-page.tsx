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
  const [addToTailLoad, setAddToTailLoad] = useState(false);

  const [delFromHeadLoad, SetDelFromHeadLoad] = useState(false);
  const [delFromTailLoad, SetDelFromTailLoad] = useState(false);

  const [addWithIndexLoad, setAddWithIndexLoad] = useState(false);
  const [delWithIndexLoad, setDelWithIndexLoad] = useState(false);
  const [delWithIndexTail, setDelWithIndexTail] = useState(false);
  const [addWithIndexHead, setAddWithIndexHead] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [array, setArray] = useState(list.toArray());
  const inputLength: number = 4;

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

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

  const addToTail = async () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    setAddToTailLoad(true);
    setInputValue('');
    list.append({
      value: +inputValue,
      state: ElementStates.Default
    })
    array[array.length - 1]!.small = {
      value: inputValue,
      type: 'top'
    }
    await performDelay(SHORT_DELAY_IN_MS);
    array[array.length - 1]!.small = undefined;
    setAddToTailLoad(false);
    list.toArray()[list.toArray().length - 1]!.state = ElementStates.Modified;
    setArray(list.toArray());
    await performDelay(SHORT_DELAY_IN_MS);
    list.toArray()[list.toArray().length - 1]!.state = ElementStates.Default;
    setArray(list.toArray());
  }

  const delHead = async () => {
    SetDelFromHeadLoad(true);
    list.deleteHead();
    array[0]!.stringvalue = " ";

    array[0]!.small = {
      value: String(array[0]?.value),
      type: 'bottom'
    };

    await performDelay(SHORT_DELAY_IN_MS);
    array[0]!.small = undefined;
    setArray(list.toArray());
    SetDelFromHeadLoad(false);
  }

  const delTail = async () => {
    SetDelFromTailLoad(true);
    list.deleteTail();
    array[array.length - 1]!.stringvalue = " ";
    array[array.length - 1]!.small = {
      value: String(array[0]?.value),
      type: 'bottom'
    };
    await performDelay(SHORT_DELAY_IN_MS);
    array[array.length - 1]!.small = undefined;
    setArray(list.toArray());
    SetDelFromTailLoad(false);
  }

  const addWithIndex = async () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }

    setAddWithIndexLoad(true);
    setAddWithIndexHead(true);
    setInputValue('');
    setInputIndex('');

    list.addByIndex({
      value: +inputValue,
      state: ElementStates.Default
    }, +inputIndex);

    for (let i = 0; i <= +inputIndex; i++) {
      array[i]!.small = {
        value: inputValue,
        type: 'top',
      };
      array[i]!.state = ElementStates.Changing;
      await performDelay(SHORT_DELAY_IN_MS);
      if (i > 0) {
        array[i - 1]!.small = undefined;
        setAddWithIndexHead(false);
      }
      setArray([...array]);
    }
    await performDelay(SHORT_DELAY_IN_MS);
    array[+inputIndex]!.small = undefined;
    array[+inputIndex]!.state = ElementStates.Default;
    list.toArray().forEach((item) => item!.state = ElementStates.Default)

    array.splice(+inputIndex, 0, {
      value: +inputValue,
      state: ElementStates.Modified,
      small: undefined,
    })
    setArray([...array]);
    await performDelay(SHORT_DELAY_IN_MS);

    setArray(list.toArray());
    await performDelay(SHORT_DELAY_IN_MS);
    setAddWithIndexLoad(false);
  }

  const delWithIndex = async() => {
    setDelWithIndexLoad(true);
    setInputValue('');
    setInputIndex('');

    list.deleteByIndex(+inputIndex);
    for (let i = 0; i <= +inputIndex; i++) {
      array[i]!.state = ElementStates.Changing;
      setArray([...array]);
      await performDelay(SHORT_DELAY_IN_MS);
    }
    if (+inputIndex === array.length - 1) {
      setDelWithIndexTail(true);
    }

    list.toArray().forEach((item) => item!.state = ElementStates.Default);
    
    array[+inputIndex]!.stringvalue = " ";
    array[+inputIndex]!.state = ElementStates.Default;
    array[+inputIndex]!.small = {
      value: `${array[+inputIndex]!.value}`,
      type: "bottom"
    }
    setArray([...array]);
    await performDelay(SHORT_DELAY_IN_MS);
    
    console.log(list.toArray());
    setArray(list.toArray());
    setDelWithIndexTail(false);
    setDelWithIndexLoad(false);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.main}`}>
        <div className={`${styles.options}`} >
          <Input extraClass={`${styles.input}`} onChange={onChangeValue} maxLength={inputLength} value={inputValue} placeholder="Введите значение" />
          <Button
            isLoader={addToHeadLoad}
            text="Добавить в head"
            extraClass={`${styles.button}`}
            onClick={addToHead}
            disabled={!inputValue}
          />
          <Button
            isLoader={addToTailLoad}
            text="Добавить в tail"
            extraClass={`${styles.button}`}
            onClick={addToTail}
            disabled={!inputValue}
          />
          <Button
            isLoader={delFromHeadLoad}
            text="Удалить из head"
            extraClass={`${styles.button}`}
            onClick={delHead}
          />
          <Button
            isLoader={delFromTailLoad}
            text="Удалить из tail"
            extraClass={`${styles.button}`}
            onClick={delTail}
          />
        </div>
        <span className={`${styles.text}`}>Максимум — 4 символа</span>
        <div className={`${styles.options}`}>
          <Input extraClass={`${styles.input}`} type="number" onChange={onChangeIndex} maxLength={inputLength} value={inputIndex} placeholder="Введите индекс" />
          <Button
            isLoader={addWithIndexLoad}
            text="Добавить по индексу"
            extraClass={`${styles.buttonLow}`}
            onClick={addWithIndex}
            disabled={!inputIndex || !inputValue || (+inputIndex > list.getSize()) || (+inputIndex === list.getSize())}
          />
          <Button
            isLoader={delWithIndexLoad}
            text="Удалить по индексу"
            extraClass={`${styles.buttonLow}`}
            onClick={delWithIndex}
            disabled={!inputIndex || (+inputIndex > list.getSize()) || (+inputIndex === list.getSize())}
          />
        </div>
        <div className={`${styles.circles}`}>
          {array.map((item, index, arr) => (
            <div className={`${styles.circles__item}`}>
              <Circle
                key={index}
                index={index}
                letter={!(item!.stringvalue) ? `${item?.value}` : item?.stringvalue}
                head={index === 0 && !addToHeadLoad && !addWithIndexHead ? 'head' : ''}
                tail={index === array.length - 1 && !delFromTailLoad  && !delWithIndexTail ? 'tail' : ''}
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
