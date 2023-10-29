import { IBackingStore } from "./store";

class LocalStorageAdapter implements IBackingStore {
    private logCache: { [key: string]: unknown[] } = {};

    constructor() {
        // Initialize any required setup, if needed.
    }

    readLog<T>(partition: string): T[] {
        if (this.logCache[partition]) {
            return this.logCache[partition] as T[];
        }

        const storageData = localStorage.getItem(partition);

        if (storageData) {
            const logArray = JSON.parse(storageData) as T[];
            this.logCache[partition] = logArray;
            return logArray;
        } else {
            return [] as T[];
        }
    }

    appendLog(partition: string, entry: string): void {
        const logArray = this.readLog<string>(partition);
        logArray.push(entry);
        this.logCache[partition] = logArray;

        localStorage.setItem(partition, JSON.stringify(logArray));
    }
}

export { LocalStorageAdapter };