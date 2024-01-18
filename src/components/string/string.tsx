import React from "react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import Styles from "./string.module.css";
import { makePerform } from "./utils/utils";
import { ElementStates } from "../../types/element-states";

export interface IPerformance {
  letter: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoader, setLoader] = useState(false);
  const [isPerformed, setPerformed] = useState(false);
  const [perform, setPerform] = useState<IPerformance[]>([]);

  const inputLength = 11;
  const arr = input.split("").map(item => ({ letter: item, state: ElementStates.Default }));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerformed(false);
    setInput(event.target.value);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    makePerform(arr, setPerform, setLoader, setPerformed);
  }


  return (
    <SolutionLayout title="Строка">
      <div className={`${Styles.main}`}>
        <form onSubmit={onSubmit} className={`${Styles.form}`} >
          <Input value={input} onChange={onChange} maxLength={inputLength} />
          <Button text="Развернуть" type='submit' isLoader={isLoader} />
        </form>
        <span className={`${Styles.text}`}>Максимум — 11 символов</span>
      </div>
      <div className={`${Styles.circles}`}>
        {input && !isPerformed ?
          arr.map((item, index) => (
            <Circle key={index} letter={item.letter} state={item.state} />
          ))
          : perform.map((item, index) => (
            <Circle key={index} letter={item.letter} state={item.state} />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
