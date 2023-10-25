export interface IBackingStore {
    readLog<T>(partition: string): T[];
    appendLog<T>(partition: string, value: T);
}