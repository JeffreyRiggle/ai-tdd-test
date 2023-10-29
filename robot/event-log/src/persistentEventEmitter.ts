import { IBackingStore } from "./store";

class PersistentEventEmitter {
    private subscribers: { [event: string]: Function[] } = {};

    constructor(private storage: IBackingStore) {
        // Initialize any required setup, if needed.
    }

    subscribe(event: string, callback: Function): () => void {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
            this.replayEvents(event, callback);
        }

        this.subscribers[event].push(callback);

        return () => {
            this.unsubscribe(event, callback);
        };
    }

    publish(event: string, data: string): void {
        this.emitEvent(event, data);
        this.storage.appendLog(event, data);
    }

    private replayEvents(event: string, callback: Function): void {
        const log = this.storage.readLog<string>(event);
        for (const entry of log) {
            this.emitEvent(event, entry);
            callback(entry);
        }
    }

    private emitEvent(event: string, data: string): void {
        const listeners = this.subscribers[event];
        if (listeners) {
            for (const listener of listeners) {
                listener(data);
            }
        }
    }

    private unsubscribe(event: string, callback: Function): void {
        const listeners = this.subscribers[event];
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
}

export { PersistentEventEmitter };