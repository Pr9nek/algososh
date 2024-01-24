import { ElementStates } from "../../../types/element-states";

export interface IQueueArray {
    letter?: string;
    state: ElementStates;
}

interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getElements: () => (T | null)[];
    getLength: () => number;
    clear: () => void;
    isEmpty: () => boolean
    getHead: () => number | null;
    getTail: () => number;
}

export class Queue<T> implements IQueue<T>{
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }


    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error('Maximum length exceeded');
        }
        if (this.length < this.size) {
            this.container[this.tail % this.size] = item;
            this.tail++
            this.length++
        };
    }

    dequeue = () => {
        // if (this.isEmpty()) {
        //     throw new Error('No elements in the queue');
        // }
        this.container[this.head % this.size] = null;
        this.head++
        this.length--

        if (this.length === 0 && this.getTail() === 6) {
            this.container[this.head ] = null;
            this.length--
        }

    };

    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = Array(this.size);
    }

    getElements = () => [...this.container];
    getLength = () => this.length;
    getHead = () => this.head;
    getTail = () => this.tail;
    isEmpty = () => {
        return this.container.length === 0;
    }
}

// export const queue = new Queue<IQueueArray>(7);

