import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { IBackingStore } from "./store";

export class FileStorageAdapter implements IBackingStore {
    private fileContents: Map<string, unknown[]> = new Map();

    public readLog<T>(partition: string): T[] {
        const logPath = `logs/${partition}`;

        if (this.fileContents.has(partition)) {
            return this.fileContents.get(partition) as T[];
        }

        if (!existsSync(logPath)) {
            if (!existsSync('logs')) {
                mkdirSync('logs');
            }

            writeFileSync(logPath, '');
            this.fileContents.set(partition, []);
            return [];
        }

        const file = readFileSync(logPath, 'utf-8');
        const contents = file.split('\n').filter(f => f).map(f => {
            try {
                const content = JSON.parse(f);
                return content;
            } catch {
                return f;
            }
        });

        this.fileContents.set(partition, contents);
        return contents;
    }

    public appendLog<T>(partition: string, value: T) {
        if (this.fileContents.has(partition)) {
            this.fileContents.get(partition)?.push(value);
        } else {
            this.fileContents.set(partition, [value]);
        }

        if (!existsSync('logs')) {
            mkdirSync('logs');
        }

        const logPath = `logs/${partition}`;
        if (!existsSync(logPath)) {
            writeFileSync(logPath, JSON.stringify(value));
            return;
        }

        appendFileSync(logPath, JSON.stringify(value) + '\n');
    }
}