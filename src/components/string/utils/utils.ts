import { DELAY_IN_MS } from "../../../constants/delays";
import { ElementStates } from "../../../types/element-states";
import { IPerformance } from "../string";
import { performDelay } from "../../../utils/utils";
import { swap } from "../../../utils/utils";

export const makePerform = async (arr: IPerformance[], setPerform: React.Dispatch<React.SetStateAction<IPerformance[]>>, setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    setPerformed: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoader(true);
    setPerformed(true);
    const mid = Math.ceil(arr.length / 2);
    for (let left = 0; left < mid; left++) {
        let right = arr.length - 1 - left;

        if (left !== right) {
            arr[left].state = ElementStates.Changing;
            arr[right].state = ElementStates.Changing;
            setPerform([...arr]);
            await performDelay(DELAY_IN_MS);
        };
        swap(arr, left, right);

        arr[left].state = ElementStates.Modified;
        arr[right].state = ElementStates.Modified;

        setPerform([...arr]);
    }
    setLoader(false);
}




