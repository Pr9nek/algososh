import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { performDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { stack } from "./class/stack";
export interface IStackArray {
  letter: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoader, setLoader] = useState(false);
  const [stackArr, setStack] = useState<IStackArray[]>([]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const addStackElement = async () => {
    if (!Number(input)) {
      return null;
    }

    stack.push({ letter: input, state: ElementStates.Changing })
    setLoader(true);
    setStack(stack.getArray());
    setInput('');
    await performDelay(SHORT_DELAY_IN_MS);

    stack.peak().state = ElementStates.Default;
    setStack([...stack.getArray()]);
    setLoader(false);

  };

  const delStackElement = async () => {
    setLoader(true);
    stack.peak().state = ElementStates.Changing;
    setStack([...stack.getArray()]);
    await performDelay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStack([...stack.getArray()]);
    setLoader(false);
  }

  const delAllStack = () => {
    setLoader(true);
    stack.clear();
    setStack([...stack.getArray()]);
    setLoader(false);
  }

  const inputLength: number = 4;

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.main}`}>
        <div className={`${styles.options}`}>
          <div className={`${styles.left_option}`}>
            <Input onChange={onChange} maxLength={inputLength} value={input} />
            <Button
              text="Добавить"
              isLoader={isLoader}
              onClick={addStackElement}
            />
            <Button
              text="Удалить"
              isLoader={isLoader}
              onClick={delStackElement}
            />
          </div>
          <Button
            text="Очистить"
            isLoader={isLoader}
            onClick={delAllStack}
          />
        </div>
        <div className={`${styles.circles}`}>
          {stackArr && stackArr.map((item, index, arr) =>
            <Circle key={index} index={index} letter={item.letter} state={item.state} head={index === arr.length - 1 ? 'top' : ''} />
          )

          }
        </div>
      </div>
    </SolutionLayout>
  );
};
