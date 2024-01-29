import { ElementStates } from "../types/element-states";

export const performDelay = async (ms: number): Promise<void> => await new Promise<void>(resolve => setTimeout(resolve, ms));
export const swap = async <T>(arr: T[], fst: number, snd: number) => {
    const tmp = arr[fst];
    arr[fst] = arr[snd];
    arr[snd] = tmp;
}

export interface IRandomArray {
    value: number;
    state: ElementStates;
    small?: ISmall;
    stringvalue?: string;
}

interface ISmall {
    value: string;
    type: 'top' | 'bottom';
}

export const generateRandomArray = (minSize: number, maxSize: number): IRandomArray[] => {
    // const minSize = 3; // минимальный размер массива
    // const maxSize = 17; // максимальный размер массива
    const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize; // генерируем случайный размер массива от minSize до maxSize
    const arr: number[] = []; // создаем пустой массив

    for (let i = 0; i < size; i++) { // начинаем цикл по размеру массива
        const randomNum = Math.floor(Math.random() * 101); // генерируем случайное число от 0 до 100 включительно
        arr.push(randomNum); // добавляем случайное число в конец массива
    }

    return arr.map((item) => ({ value: item, state: ElementStates.Default, small: undefined })); // возвращаем сгенерированный массив
}