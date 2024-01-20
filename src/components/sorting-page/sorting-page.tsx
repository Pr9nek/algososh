import React, { useEffect } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { generateRandomArray } from "./utils/utils";
import { Column } from "../ui/column/column";
import { IRandomArray } from "./utils/utils";
import { performDelay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const makeSelectSorting = async (
  arr: IRandomArray[],
  direction: Direction.Descending | Direction.Ascending,
  setArray: React.Dispatch<React.SetStateAction<IRandomArray[]>>,
  performDelay: Promise<void>
): Promise<IRandomArray[]> => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) { // начинаем цикл по всем элементам массива, кроме последнего
    let minIndex = i; // сохраняем индекс текущего элемента в переменную minIndex
    arr[minIndex].state = ElementStates.Changing;
    for (let j = i + 1; j < len; j++) { // вложенный цикл для поиска минимального элемента в оставшейся части массива
      arr[j].state = ElementStates.Changing;
      setArray(...[arr]);
      await performDelay
      if (arr[j] < arr[minIndex]) { // если текущий элемент меньше минимального
        minIndex = j; // обновляем индекс минимального элемента
      }
    }
  }

  export const SortingPage: React.FC = () => {
    const [isBubble, setIsbubble] = useState(false);
    const [isLoader, setLoader] = useState(false);
    const [array, setArray] = useState<IRandomArray[]>([]);

    useEffect(() => {
      setArray(generateRandomArray());
    }, []);

    const changeRadio = () => {
      setIsbubble(!isBubble);
    }

    const makeArray = () => {
      setArray(generateRandomArray())
      console.log(array);
    }

    return (
      <SolutionLayout title="Сортировка массива">
        <div className={`${styles.main}`}>
          <div className={`${styles.options}`}>
            <div className={`${styles.radios}`}>
              <RadioInput
                label="Выбор"
                checked={!isBubble}
                value="select"
                onChange={changeRadio}
                disabled={false}
              />
              <RadioInput
                label="Пузырёк"
                checked={isBubble}
                value="bubble"
                onChange={changeRadio}
                disabled={false}
              />
            </div>
            <div className={`${styles.sortbuttons}`}>
              <Button
                text="По возрастанию"
                sorting={Direction.Ascending}

              />
              <Button
                text="По возрастанию"
                sorting={Direction.Descending}
              />
            </div>
            <Button
              text="Новый массив"
              isLoader={isLoader}
              onClick={makeArray}
            />
          </div>
          <div className={`${styles.array}`}>
            {array.map((item, index) => {
              return <Column key={index} index={item.value} state={item.state} />;
            })

            }
          </div>
        </div>
      </SolutionLayout>
    );
  };
