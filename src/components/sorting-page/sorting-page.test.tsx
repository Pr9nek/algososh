import { makeBubbleSorting, makeSelectSorting,  } from "./utils/utils";
import { IRandomArray } from "../../utils/utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

const testArr: IRandomArray[] = [
    {value: 1, state: ElementStates.Default },
    {value: 65, state: ElementStates.Default },
    {value: 31, state: ElementStates.Default },
    {value: 94, state: ElementStates.Default },
    {value: 5, state: ElementStates.Default },
    {value: 13, state: ElementStates.Default }
];

const expectedAscendingArr: IRandomArray[] = [
    {value: 1, state: ElementStates.Modified },
    {value: 5, state: ElementStates.Modified },
    {value: 13, state: ElementStates.Modified },
    {value: 31, state: ElementStates.Modified },
    {value: 65, state: ElementStates.Modified },
    {value: 94, state: ElementStates.Modified }
];

const expectedDescendingArr: IRandomArray[] = [
    {value: 94, state: ElementStates.Modified },
    {value: 65, state: ElementStates.Modified },
    {value: 31, state: ElementStates.Modified },
    {value: 13, state: ElementStates.Modified },
    {value: 5, state: ElementStates.Modified },
    {value: 1, state: ElementStates.Modified },
]

jest.setTimeout(20000);
describe('makeSelectSorting function', () => {
    it('correctly ascending-sort an empty array', async () => {
        const arr: IRandomArray[] = [];
        const setArray = jest.fn();

        const sortedArray = await makeSelectSorting(arr, Direction.Ascending, setArray);

        expect(sortedArray).toEqual([]);
    });

    it('correctly descending-sort an empty array', async () => {
        const arr: IRandomArray[] = [];
        const setArray = jest.fn();

        const sortedArray = await makeSelectSorting(arr, Direction.Descending, setArray);

        expect(sortedArray).toEqual([]);
    });

    it('correctly ascending-sort an array with one element', async () => {
        const arr: IRandomArray[] = [{value: 1, state: ElementStates.Default }];
        const setArray = jest.fn();

        const sortedArray = await makeSelectSorting(arr, Direction.Ascending, setArray);

        expect(sortedArray).toEqual([{value: 1, state: ElementStates.Default }]);
    });

    it('correctly descending-sort an array with one element', async () => {
        const arr: IRandomArray[] = [{value: 1, state: ElementStates.Default }];
        const setArray = jest.fn();

        const sortedArray = await makeSelectSorting(arr, Direction.Descending, setArray);

        expect(sortedArray).toEqual([{value: 1, state: ElementStates.Default }]);
    });

    it('correctly ascending-sort an array with some elements', async () => {
        const setArray = jest.fn();

        const sortedArray = await makeSelectSorting(testArr, Direction.Ascending, setArray);

        expect(sortedArray).toEqual(expectedAscendingArr);
    });

    it('correctly descending-sort an array with some elements', async () => {
        const setArray = jest.fn();

        const sortedArray = await makeSelectSorting(testArr, Direction.Descending, setArray);

        expect(sortedArray).toEqual(expectedDescendingArr);
    });
});

    //ниже пузырёк

    describe('makeBubbleSorting function', () => {
        it('correctly ascending-sort an empty array', async () => {
            const arr: IRandomArray[] = [];
            const setArray = jest.fn();
    
            const sortedArray = await makeBubbleSorting(arr, Direction.Ascending, setArray);
    
            expect(sortedArray).toEqual([]);
        });
    
        it('correctly descending-sort an empty array', async () => {
            const arr: IRandomArray[] = [];
            const setArray = jest.fn();
    
            const sortedArray = await makeBubbleSorting(arr, Direction.Descending, setArray);
    
            expect(sortedArray).toEqual([]);
        });
    
        it('correctly ascending-sort an array with one element', async () => {
            const arr: IRandomArray[] = [{value: 1, state: ElementStates.Default }];
            const setArray = jest.fn();
    
            const sortedArray = await makeBubbleSorting(arr, Direction.Ascending, setArray);
    
            expect(sortedArray).toEqual([{value: 1, state: ElementStates.Modified }]);
        });
    
        it('correctly descending-sort an array with one element', async () => {
            const arr: IRandomArray[] = [{value: 1, state: ElementStates.Default }];
            const setArray = jest.fn();
    
            const sortedArray = await makeBubbleSorting(arr, Direction.Descending, setArray);
    
            expect(sortedArray).toEqual([{value: 1, state: ElementStates.Modified }]);
        });
    
        it('correctly ascending-sort an array with some elements', async () => {
            const setArray = jest.fn();
    
            const sortedArray = await makeBubbleSorting(testArr, Direction.Ascending, setArray);
    
            expect(sortedArray).toEqual(expectedAscendingArr);
        });
    
        it('correctly descending-sort an array with some elements', async () => {
            const setArray = jest.fn();
    
            const sortedArray = await makeBubbleSorting(testArr, Direction.Descending, setArray);
    
            expect(sortedArray).toEqual(expectedDescendingArr);
        });
});