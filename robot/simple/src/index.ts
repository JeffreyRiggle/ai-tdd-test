class LocalStorageLog {
    private logs: Record<string, string[]> = {};

    constructor() {}

    private getLogFromLocalStorage(partition: string): string[] {
        const logJSON = localStorage.getItem(partition);
        if (logJSON) {
            return JSON.parse(logJSON);
        }
        return [];
    }

    private updateLocalStorage(partition: string): void {
        const logArray = this.logs[partition];
        if (logArray) {
            const logJSON = JSON.stringify(logArray);
            localStorage.setItem(partition, logJSON);
        }
    }

    readLog(partition: string): string[] {
        if (!this.logs.hasOwnProperty(partition)) {
            this.logs[partition] = this.getLogFromLocalStorage(partition);
        }
        return this.logs[partition];
    }

    appendLog(partition: string, value: string): void {
        if (!this.logs.hasOwnProperty(partition)) {
            this.logs[partition] = this.getLogFromLocalStorage(partition);
        }
        this.logs[partition].push(value);
        this.updateLocalStorage(partition);
    }
}

export { LocalStorageLog };