import React from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { generateRandomArray } from "./utils/utils";
import { Column } from "../ui/column/column";
import { IRandomArray } from "./utils/utils";

export const SortingPage: React.FC = () => {
  const [isBubble, setIsbubble] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [array, setArray] = useState<IRandomArray[]>([]);

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
