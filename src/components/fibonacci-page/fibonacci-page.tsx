import React from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import Styles from "./fibonacci-page.module.css";
import { makePerform } from "./utils/utils";

export interface IPerformance {
  letter: string;
  index: number;
  // state?: ElementStates;

}

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoader, setLoader] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isPerformed, setPerformed] = useState(false);
  const [perform, setPerform] = useState<number[]>([]);;

  const inputLength = 2;
  const inputValue = Number(input);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerformed(false);
    setPerform([]);
    setInput(event.target.value);
    if (Number(input)>19) {
      setDisabled(true);
    }
    setDisabled(false);
  }


  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPerformed(true);

    if (input && inputValue > 19) {
      setDisabled(true)
    }

    if (input && inputValue <= 19) {
      setDisabled(false)
      makePerform(+input, setPerform, setLoader, setPerformed)
    }

    setDisabled(false)
  }

  const arrResult = perform?.map((letter, index) => ({ letter: letter, state: ElementStates.Default, index: index }));

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${Styles.main}`}>
        <form className={`${Styles.form}`} onSubmit={onSubmit}>
          <Input onChange={onChange} maxLength={inputLength} max={19} />
          <Button text="Развернуть" type='submit' isLoader={isLoader} disabled={isDisabled} />
        </form>
        <span className={`${Styles.text}`}>Максимальное число — 19</span>
      </div>
      <div className={`${Styles.circles}`}>
        {isPerformed &&
          arrResult.map((item, index) => (
            <Circle key={index} letter={`${item.letter}`} state={item.state} index={item.index} />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
