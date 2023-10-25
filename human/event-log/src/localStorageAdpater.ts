import { IBackingStore } from "./store";

export class LocalStorageAdapter implements IBackingStore {
    private logs = new Map();

    public readLog<T>(partition: string): T[] {
        const existing = this.logs.get(partition);
        if (existing) {
            return existing;
        }

        let partitionValue;
        try {
            partitionValue = JSON.parse(localStorage.getItem(partition) ?? '[]');
        } catch {
            partitionValue = [];
        }

        this.logs.set(partition, partitionValue);
        return partitionValue;
    }

    public appendLog<T>(partition: string, value: T) {
        let existing = this.logs.get(partition);
        if (!existing) {
            existing = [];
        }

        existing.push(value);
        localStorage.setItem(partition, JSON.stringify(existing));
        this.logs.set(partition, existing);
    }
}