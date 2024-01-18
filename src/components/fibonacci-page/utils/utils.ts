import { performDelay } from "../../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../../constants/delays";

export const getFibonacciNumbers = (number: number): number[] => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < number + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1])
    }
    return arr;
};

export const makePerform = async (number: number, setPerform: React.Dispatch<React.SetStateAction<number[]>>, setLoader: React.Dispatch<React.SetStateAction<boolean>>, setPerformed: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoader(true);
    setPerformed(true);
    setPerform([]);
    const newArrFibonacci = getFibonacciNumbers(number);
    for (let i = 0; i < newArrFibonacci.length; i++) {
        setPerform(curr => [...curr, newArrFibonacci[i]]);
        await performDelay(SHORT_DELAY_IN_MS);
    }
    setLoader(false);
}