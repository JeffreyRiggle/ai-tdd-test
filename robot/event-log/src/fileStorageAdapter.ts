import { IBackingStore } from "./store";
import * as fs from 'fs';

class FileStorageAdapter implements IBackingStore {
    private logCache: { [key: string]: unknown[] } = {};

    constructor() {
        // Initialize any required setup, if needed.
    }

    readLog<T>(partition: string): T[] {
        if (this.logCache[partition]) {
            return this.logCache[partition] as T[];
        }

        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs');
        }

        if (!fs.existsSync(`logs/${partition}`)) {
            fs.writeFileSync(`logs/${partition}`, ''); // Create an empty log file
            this.logCache[partition] = [];
            return [];
        }

        const storageData = fs.readFileSync(`logs/${partition}`, 'utf-8');
        const logArray = storageData.split('\n').filter(entry => entry !== "").map(entry => entry.replace(/"/g, '')) as T[];
        this.logCache[partition] = logArray;
        return logArray;
    }

    appendLog(partition: string, entry: string): void {
        const logArray = this.readLog<string>(partition);
        logArray.push(entry);
        this.logCache[partition] = logArray;

        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs');
        }

        if (!fs.existsSync(`logs/${partition}`)) {
            fs.writeFileSync(`logs/${partition}`, ''); // Create an empty log file
        }

        fs.appendFileSync(`logs/${partition}`, `"${entry}"\n`);
    }
}

export { FileStorageAdapter };