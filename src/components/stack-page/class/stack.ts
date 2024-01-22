import { ElementStates } from "../../../types/element-states";

interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    getArray: () => T[];
    clear: () => void;
}

export interface IStackArray {
    letter: string;
    state: ElementStates;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T) => {
        this.container.push(item);
    };

    pop = () => {
        this.container.pop();
    };

    peak = () => this.container[this.container.length - 1];
    
    getSize = () => this.container.length;
    getArray = () => this.container;
    clear = () => this.container = [];
};

export const stack = new Stack<IStackArray>();