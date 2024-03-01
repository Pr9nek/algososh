import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { makePerform } from "./utils/utils";
import { IPerformance } from "./string";

describe('swap function', () => {
    it('works correctly', () => {
        const expected = [3, 2, 1];

        const act = swap([1, 2, 3], 0, 2);
        expect(act).toEqual(expected);
    });
});

describe('makePerform function', () => {
    it('correctly reverses a string with even number of characters', async () => {
        const arr: IPerformance[] = [{ letter: 'a', state: ElementStates.Default }, { letter: 'b', state: ElementStates.Default }];
        const setPerform = jest.fn();
        const setLoader = jest.fn();
        const setPerformed = jest.fn();

        await makePerform(arr, setPerform, setLoader, setPerformed);

        expect(arr[0].letter).toBe('b');
        expect(arr[1].letter).toBe('a');
    });

    it('correctly reverses a string with odd number of characters', async () => {
        const arr: IPerformance[] = [{ letter: 'a', state: ElementStates.Default }, { letter: 'b', state: ElementStates.Default }, { letter: 'c', state: ElementStates.Default }];
        const setPerform = jest.fn();
        const setLoader = jest.fn();
        const setPerformed = jest.fn();

        await makePerform(arr, setPerform, setLoader, setPerformed);

        expect(arr[0].letter).toBe('c');
        expect(arr[1].letter).toBe('b');
        expect(arr[2].letter).toBe('a');
    });

    it('correctly reverses a string with with one character', async () => {
        const arr: IPerformance[] = [{ letter: 'a', state: ElementStates.Default }];
        const setPerform = jest.fn();
        const setLoader = jest.fn();
        const setPerformed = jest.fn();

        await makePerform(arr, setPerform, setLoader, setPerformed);

        expect(arr[0].letter).toBe('a');
    });

    it('correctly reverses an empty string', async () => {
        const arr: IPerformance[] = [];
        const setPerform = jest.fn();
        const setLoader = jest.fn();
        const setPerformed = jest.fn();

        await makePerform(arr, setPerform, setLoader, setPerformed);

        expect(arr).toEqual([]);
    });

});