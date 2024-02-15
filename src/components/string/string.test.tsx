import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { makePerform } from "./utils/utils";

describe('swap function', () => {
    it('works correctly', () => {
        const expected = [3, 2, 1];

        const act = swap([1, 2, 3], 0, 2);
        expect(act).toEqual(expected);
    });
});