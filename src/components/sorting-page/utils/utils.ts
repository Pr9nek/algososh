import { ElementStates } from "../../../types/element-states";

export interface IRandomArray {
    value: number;
	state: ElementStates;
  }

export const generateRandomArray = (): IRandomArray[] => {
    const minSize = 3; // минимальный размер массива
    const maxSize = 17; // максимальный размер массива
    const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize; // генерируем случайный размер массива от minSize до maxSize
    const arr: number[] = []; // создаем пустой массив

    for (let i = 0; i < size; i++) { // начинаем цикл по размеру массива
        const randomNum = Math.floor(Math.random() * 101); // генерируем случайное число от 0 до 100 включительно
        arr.push(randomNum); // добавляем случайное число в конец массива
    }

    return arr.map((item) => ({value: item, state: ElementStates.Default}) ); // возвращаем сгенерированный массив
}