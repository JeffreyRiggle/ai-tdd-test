import { FileStorageAdapter } from "./fileStorageAdapter";
import * as fs from 'fs';

jest.mock("fs");

const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

describe('File Storage Adapter', () => {
    let service: FileStorageAdapter;

    beforeEach(() => {
        service = new FileStorageAdapter();
    });

    describe('when parition is requested on new item', () => {
        it('should return an empty array', () => {
            expect(service.readLog('random')).toEqual([]);
        });
    });

    describe('when parition is requested on an existing item', () => {
        beforeEach(() => {
            mockFS.existsSync.mockReturnValue(true);
            mockFS.readFileSync.mockReturnValue('"a"\n');
        });

        it('should return an empty array', () => {
            expect(service.readLog('foo')).toEqual(["a"]);
        });

        describe('when existing log is updated', () => {
            beforeEach(() => {
                service.readLog('foo');
                service.appendLog('foo', 'b');
            });

            it('should get updated on get requests', () => {
                expect(service.readLog('foo')).toEqual(['a', 'b']);
            });

            it('should update the local storage', () => {
                expect(mockFS.appendFileSync).toHaveBeenCalledWith('logs/foo', "\"b\"\n")
            });
        });
    });

    describe('when log is already read', () => {
        beforeEach(() => {
            mockFS.readFileSync.mockClear();
            mockFS.existsSync.mockReturnValue(true);
            service.readLog('foo');
            service.readLog('foo');
        });

        it('should only read the log once', () => {
            expect(mockFS.readFileSync).toHaveBeenCalledTimes(1);
        });
    });
});