import React, { useEffect } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { makeBubbleSorting, makeSelectSorting } from "./utils/utils";
import { generateRandomArray, IRandomArray } from "../../utils/utils";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [isBubble, setIsbubble] = useState(false);
  const [isLoaderDes, setLoaderDes] = useState(false);
  const [isLoaderAs, setLoaderAs] = useState(false);
  const [isLoaderNewAr, setIsLoaderNewAr] = useState(false)
  const [array, setArray] = useState<IRandomArray[]>([]);

  useEffect(() => {
    setArray(generateRandomArray(3, 17));
  }, []);

  const changeRadio = () => {
    setIsbubble(!isBubble);
  }

  const makeArray = () => {
    setIsLoaderNewAr(true)
    setArray(generateRandomArray(3, 17))
    setIsLoaderNewAr(false)
  }

  const makeSortAs = async (direction: Direction.Ascending) => {
    setLoaderAs(true);

    array.map(item => item.state = ElementStates.Default)

    if (!isBubble) {
      setArray(await makeSelectSorting(array, direction, setArray));
    }
    else {
      setArray(await makeBubbleSorting(array, direction, setArray));
    }
    setLoaderAs(false);
  }

  const makeSortDes = async (direction: Direction.Descending) => {
    setLoaderDes(true);

    array.map(item => item.state = ElementStates.Default)

    if (!isBubble) {
      setArray(await makeSelectSorting(array, direction, setArray));
    }
    else {
      setArray(await makeBubbleSorting(array, direction, setArray));
    }
    setLoaderDes(false);
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
              disabled={isLoaderAs || isLoaderDes || isLoaderNewAr}
            />
            <RadioInput
              label="Пузырёк"
              checked={isBubble}
              value="bubble"
              onChange={changeRadio}
              disabled={isLoaderAs || isLoaderDes || isLoaderNewAr}
            />
          </div>
          <div className={`${styles.sortbuttons}`}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() => makeSortAs(Direction.Ascending)}
              isLoader={isLoaderAs}
              disabled={isLoaderDes || isLoaderNewAr}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => makeSortDes(Direction.Descending)}
              isLoader={isLoaderDes}
              disabled={isLoaderAs || isLoaderNewAr}
            />
          </div>
          <Button
            text="Новый массив"
            isLoader={isLoaderNewAr}
            onClick={makeArray}
            disabled={isLoaderAs || isLoaderDes}
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
