import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { performDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
// import { queue } from "./class/queue";
import { Queue } from "./class/queue";

interface IQueueArray {
  letter?: string;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [queue, setQueue] = useState(new Queue<IQueueArray>(7));
  const [queueArr, setQueueArr] = useState(queue.getElements());
  const [tail, setTail] = useState(queue.getTail());
  const [head, setHead] = useState(queue.getHead());
  const [isLoader, setLoader] = useState(false);

  console.log(queue);
  

  const inputLength: number = 4;
   // Определите максимальный размер очереди

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const addQueueElement = async () => {
    if (input !== '') {
      setLoader(true);
      setInput('');
      queue.enqueue({ letter: input, state: ElementStates.Default });
      await performDelay(SHORT_DELAY_IN_MS);
    }
    setLoader(false);
  };

  // Обработчик удаления элемента из очереди
  const delQueueElement = async () => {
    setLoader(true);
    queue.dequeue();
    await performDelay(SHORT_DELAY_IN_MS);
    // Добавьте здесь логику для визуализации удаления элемента
    // Например, подсветка #D252E1 на короткое время
    setLoader(false);
  };

  const delAllQueue = async () => {
    setLoader(true);
    queue.clear();
    await performDelay(SHORT_DELAY_IN_MS);
    setLoader(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.main}`}>
        <div className={`${styles.options}`}>
          <div className={`${styles.left_option}`}>
            <Input onChange={onChange} maxLength={inputLength} value={input} />
            <Button
              text="Добавить"
              isLoader={isLoader}
              onClick={addQueueElement}
            />
            <Button
              text="Удалить"
              isLoader={isLoader}
              onClick={delQueueElement}
            />
          </div>
          <Button
            text="Очистить"
            isLoader={isLoader}
            onClick={delAllQueue}
          />
        </div>
        <div className={`${styles.circles}`}>
          {queue.getElements().map((item, index) => (
            <Circle
              key = {index}
              index = {index}
              letter = {item?.letter}
              head = {index === queue.getHead() && !queue.isEmpty() && item ? 'head' : ''}
              tail = {index === queue.getTail() - 1 && !queue.isEmpty() && item ? 'tail' : ''} 
              state = {!item ? ElementStates.Default : item.state}
              />
              
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
