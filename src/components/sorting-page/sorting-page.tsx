import React, { useEffect } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { generateRandomArray, makeBubbleSorting, makeSelectSorting, IRandomArray } from "./utils/utils";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

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
  }

  const makeSort = async (direction: Direction.Descending | Direction.Ascending) => {
    setLoader(true);
    array.map(item => item.state = ElementStates.Default)

    if (!isBubble) {
      setArray(await makeSelectSorting(array, direction, setArray));
    }
    else {
      setArray(await makeBubbleSorting(array, direction, setArray));
    }
    setLoader(false);
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
              onClick={() => makeSort(Direction.Ascending)}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => makeSort(Direction.Descending)}
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
