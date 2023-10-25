import { IBackingStore } from "./store";

export class PersistentEventEmitter {
    private subscribers: Map<string, ((data: unknown) => void)[]> = new Map();

    constructor(private storage: IBackingStore) {}

    public subscribe<T>(event: string, callback: (data: T) => void) {
        let ind = 0;
        if (this.subscribers.has(event)) {
            ind = this.subscribers.get(event)?.push(callback as (data: unknown) => void) ?? 0;
        } else {
            this.subscribers.set(event, [callback as (data: unknown) => void]);
        }

        this.storage.readLog<T>(event).forEach(e => callback(e));

        return () => {
            this.subscribers.get(event)?.splice(ind, 1);
        }
    }

    public publish<T>(event: string, data: T) {
        this.subscribers.get(event)?.forEach(s => s(data));
        this.storage.appendLog(event, data);
    }
}