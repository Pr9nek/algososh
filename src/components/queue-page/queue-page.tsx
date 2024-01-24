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
  head?: string;
}
const arr = Array.from({ length: 7 }, () => ({ letter: '', state: ElementStates.Default }));

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [queue, setQueue] = useState(new Queue<IQueueArray>(7));
  const [arrFromQueue, setarrFromQueue] = useState<(IQueueArray | null)[]>(arr);
  // const [tail, setTail] = useState(queue.getTail());
  // const [head, setHead] = useState(queue.getHead());
  const [isLoader, setLoader] = useState(false);

  console.log(queue);
  // console.log(arrFromQueue);
  // const arr = queue.getElements().map(item => ({ letter: item, state: ElementStates.Default }));

  const inputLength: number = 4;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const addQueueElement = async () => {
    if (input !== '' && queue.getTail() < 7) {
      setLoader(true);
      
      queue.enqueue({ letter: input, state: ElementStates.Default });

      arrFromQueue[queue.getTail() - 1] = { letter: '', state: ElementStates.Changing };
      setarrFromQueue([...arrFromQueue])
      
      setInput('');
      await performDelay(SHORT_DELAY_IN_MS);
      
      setarrFromQueue(queue.getElements())
      setLoader(false);
    };
    
  };


  const delQueueElement = async () => {
    setLoader(true);
    queue.dequeue();
    await performDelay(SHORT_DELAY_IN_MS);
    // Добавьте здесь логику для визуализации удаления элемента
    // Например, подсветка #D252E1 на короткое время
    setLoader(false);
  };

  // Обработчик удаления элемента из очереди
  // const delQueueElement = async () => {
  //   setLoader(true);

  //   queue.dequeue();

  //   arrFromQueue[queue.getHead() -1] = { letter: arrFromQueue[queue.getHead() - 1]?.letter, state: ElementStates.Changing };
  //   setarrFromQueue([...arrFromQueue])

  //   await performDelay(SHORT_DELAY_IN_MS);
   
  //   // setarrFromQueue(queue.getElements())

  //   arrFromQueue[queue.getHead() - 1] = { letter: '', state: ElementStates.Default };
  //   setarrFromQueue([...arrFromQueue]);

  //   if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
  //     arrFromQueue[queue.getHead() - 1] = { letter: '', state: ElementStates.Default, head: 'head' };
  //     setarrFromQueue([...arrFromQueue]);
  //   };
  //     setLoader(false);
  // };

  const delAllQueue = async () => {
    setLoader(true);
    queue.clear();
    setarrFromQueue(queue.getElements())
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
              disabled={!input}
              // isLoader={isLoader}
              onClick={addQueueElement}
            />
            <Button
              text="Удалить"
              disabled={(!queue.getLength()) || queue.getHead() === 7}
              isLoader={isLoader}
              onClick={delQueueElement}
            />
          </div>
          <Button
            text="Очистить"
            disabled={queue.getHead() === 0 && queue.getTail() === 0} 
            // isLoader={isLoader}
            onClick={delAllQueue}
          />
        </div>
        <div className={`${styles.circles}`}>
          {queue.getElements().map((item, index) => (
          
            <Circle
              key = {index}
              index = {index}
              letter = {item?.letter}
              head = {(index === queue.getHead() && !queue.isEmpty() && queue.getTail() !==0 && item) || item?.head ? 'head' : ''}
              tail = {index === queue.getTail() - 1 && !queue.isEmpty() && item ? 'tail' : ''} 
              state = {!item ? ElementStates.Default : item.state}
              />
              
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
