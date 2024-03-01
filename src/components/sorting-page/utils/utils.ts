import { ElementStates } from "../../../types/element-states";
import { performDelay } from "../../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../../constants/delays";
import { swap } from "../../../utils/utils";
import { Direction } from "../../../types/direction";
import { IRandomArray } from "../../../utils/utils";

export const makeSelectSorting = async (
    arr: IRandomArray[],
    direction: Direction.Descending | Direction.Ascending,
    setArray: React.Dispatch<React.SetStateAction<IRandomArray[]>>,
): Promise<IRandomArray[]> => {

    const len = arr.length;
    if (!len) {return []} 
    if (len === 1) {return arr}

    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        arr[minIndex].state = ElementStates.Changing;
        for (let j = i + 1; j < len; j++) { // вложенный цикл для поиска минимального элемента в оставшейся части массива
            arr[i].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            setArray([...arr]);
            await performDelay(SHORT_DELAY_IN_MS);
            if (direction === Direction.Descending ? arr[j].value > arr[minIndex].value
                : arr[j].value < arr[minIndex].value)
            // если текущий элемент больше или меньше минимального
            {
                minIndex = j;
                // обновляем индекс минимального элемента
            }
            arr[j].state = ElementStates.Default;
            setArray([...arr]);
        }
        if (minIndex !== i) { // если индекс минимального элемента не равен текущему индексу
            arr[minIndex].state = ElementStates.Modified;
            arr[i].state = ElementStates.Default;
            swap(arr, i, minIndex);
        }
        else {
            arr[i].state = ElementStates.Modified;
        }
        setArray([...arr]);
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    return arr;
}

export const makeBubbleSorting = async (
    arr: IRandomArray[],
    direction: Direction.Descending | Direction.Ascending,
    setArray: React.Dispatch<React.SetStateAction<IRandomArray[]>>,
): Promise<IRandomArray[]> => {

    const len = arr.length; // сохраняем длину массива в переменную len

    for (let i = 0; i < len; i++) { // начинаем цикл по всем элементам массива
        for (let j = 0; j < len - 1 - i; j++) { // вложенный цикл для сравнения пар соседних элементов
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setArray([...arr]);
            await performDelay(SHORT_DELAY_IN_MS);

            if (
                direction === Direction.Ascending
                    ? arr[j].value > arr[j + 1].value
                    : arr[j].value < arr[j + 1].value
            ) { // если текущий элемент больше/меньше следующего
                swap(arr, j, j + 1)// заменяем следующий элемент на временную переменную
            }
            arr[j].state = ElementStates.Default;
        }
        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArray([...arr]);
    }
    return arr; // возвращаем отсортированный массив
}