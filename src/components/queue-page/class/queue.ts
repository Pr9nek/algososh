import { ElementStates } from "../../../types/element-states";

export interface IQueueArray {
    letter?: string;
    state: ElementStates;
}

interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getElements: () => (T | null)[];
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
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this.container[this.head % this.size] = null;
        this.head = this.head % this.size;
        this.length--;
		this.head++;
    };

    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = Array(this.size);
    }

    getElements = () => [...this.container];
    getHead = () => this.head;
    getTail = () => this.tail;
    isEmpty = () => {
        return this.container.length === 0;
    }
}

export const queue = new Queue<IQueueArray>(7);

