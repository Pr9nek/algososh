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
import { Stack } from "./class/stack";
export interface IStackArray {
  letter: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<IStackArray>())
  const [input, setInput] = useState('');
  // const [isLoader, setLoader] = useState(false);
  const [isLoaderAdd, setIsLoaderAdd] = useState(false);
  const [isLoaderDel, setIsLoaderDel] = useState(false);
  const [isLoaderClear, setIsLoaderClear] = useState(false);
  const inputLength: number = 4;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const addStackElement = async () => {
    if (!Number(input)) {
      return null;
    }

    stack.push({ letter: input, state: ElementStates.Changing })
    setIsLoaderAdd(true);
    setInput('');
    await performDelay(SHORT_DELAY_IN_MS);

    stack.peak().state = ElementStates.Default;
    setIsLoaderAdd(false);

  };

  const delStackElement = async () => {
    if (stack.getSize() > 0) {
      setIsLoaderDel(true);
      stack.peak().state = ElementStates.Changing;
      await performDelay(SHORT_DELAY_IN_MS);
      stack.pop();
      setIsLoaderDel(false);
    }
  }

  const delAllStack = async () => {
    setIsLoaderClear(true);
    stack.clear();
    await performDelay(SHORT_DELAY_IN_MS);
    setIsLoaderClear(false);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.main}`}>
        <div className={`${styles.options}`}>
          <div className={`${styles.left_option}`}>
            <Input onChange={onChange} maxLength={inputLength} value={input} />
            <Button
              text="Добавить"
              isLoader={isLoaderAdd}
              onClick={addStackElement}
              disabled={!input || isLoaderDel || isLoaderClear}
            />
            <Button
              text="Удалить"
              isLoader={isLoaderDel}
              onClick={delStackElement}
              disabled={isLoaderAdd || isLoaderClear}
            />
          </div>
          <Button
            text="Очистить"
            isLoader={isLoaderClear}
            onClick={delAllStack}
            disabled={isLoaderAdd || isLoaderDel}
          />
        </div>
        <span className={`${styles.text}`}>Максимум — 4 символа</span>
        <div className={`${styles.circles}`}>
          {stack.getArray().map((item, index, arr) =>
            <Circle key={index} index={index} letter={item.letter} state={item.state} head={index === stack.getSize() - 1 ? 'top' : ''} />
          )};
        </div>
      </div>
    </SolutionLayout>
  );
};
