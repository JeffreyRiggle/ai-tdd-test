export type IBackingStore = {
    readLog<T>(partition: string): T[];
    appendLog(partition: string, entry: string): void;
};