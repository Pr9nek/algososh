import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { performDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./class/queue";
interface IQueueArray {
  letter?: string;
  state: ElementStates;
  head?: string;
}
const arr = Array.from({ length: 7 }, () => ({ letter: '', state: ElementStates.Default }));

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [queue] = useState(new Queue<IQueueArray>(7));
  const [arrFromQueue, setarrFromQueue] = useState<(IQueueArray | null)[]>(arr);
  const [adIsLoader, setadIsLoader] = useState(false);
  const [delIsLoader, setdelIsLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);

  const inputLength: number = 4;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const addQueueElement = async () => {
    if (input !== '' && queue.getTail() < 7) {
      setadIsLoader(true);
      setInput('');
      arrFromQueue[queue.getTail()] = { letter: '', state: ElementStates.Changing };
      await performDelay(SHORT_DELAY_IN_MS);
      queue.enqueue({ letter: input, state: ElementStates.Default });
      setarrFromQueue(queue.getElements())
      setadIsLoader(false);
    };

  };

  const delQueueElement = async () => {
    setdelIsLoader(true);
    arrFromQueue[queue.getHead()] = { letter: arrFromQueue[queue.getHead() - 1]?.letter, state: ElementStates.Changing };
    await performDelay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setarrFromQueue(queue.getElements())
    setdelIsLoader(false);

    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.getLength() === 0) {
      arrFromQueue[arrFromQueue.length - 1] = { letter: '', state: ElementStates.Default, head: 'head' };
      setarrFromQueue([...arrFromQueue]);
      console.log(arrFromQueue);

    };
  };

  const delAllQueue = async () => {
    setClearLoader(true);
    queue.clear();
    setarrFromQueue(queue.getElements())
    await performDelay(SHORT_DELAY_IN_MS);
    setClearLoader(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.main}`}>
        <div className={`${styles.options}`}>
          <div className={`${styles.left_option}`}>
            <Input onChange={onChange} maxLength={inputLength} value={input} />
            <Button
              text="Добавить"
              disabled={!input || delIsLoader || clearLoader}
              isLoader={adIsLoader}
              onClick={addQueueElement}
            />
            <Button
              text="Удалить"
              disabled={(!queue.getLength()) || queue.getHead() === 7 || adIsLoader || clearLoader}
              isLoader={delIsLoader}
              onClick={delQueueElement}
            />
          </div>
          <Button
            text="Очистить"
            disabled={queue.getHead() === 0 && queue.getTail() === 0 || adIsLoader || delIsLoader}
            isLoader={clearLoader}
            onClick={delAllQueue}
          />
        </div>
        <span className={`${styles.text}`}>Максимум — 4 символа</span>
        <div className={`${styles.circles}`}>
          {arrFromQueue.map((item, index) => (

            <Circle
              key={index}
              index={index}
              letter={item?.letter}
              head={(index === queue.getHead() && !queue.isEmpty() && queue.getTail() !== 0 && item) || item?.head ? 'head' : ''}
              tail={(index === queue.getTail() - 1 && !queue.isEmpty() && item && !item?.head) ? 'tail' : ''}
              state={!item ? ElementStates.Default : item.state}
            />

          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
