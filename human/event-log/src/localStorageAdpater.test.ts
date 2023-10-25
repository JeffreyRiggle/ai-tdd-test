import { LocalStorageAdapter } from "./localStorageAdpater";

describe('Local Storage Adapter', () => {
    let service: LocalStorageAdapter;
    let setStorageSpy: jest.Func;
    let readStorageSpy: jest.Func;

    beforeEach(() => {
        readStorageSpy = jest.fn(partition => {
            if (partition === 'foo') {
                return '["a"]';
            }
            return null;
        })
        setStorageSpy = jest.fn();
        global.localStorage = {
            getItem: readStorageSpy,
            setItem: setStorageSpy
        } as unknown as Storage;

        service = new LocalStorageAdapter();
    });

    describe('when parition is requested on new item', () => {
        it('should return an empty array', () => {
            expect(service.readLog('random')).toEqual([]);
        });
    });

    describe('when parition is requested on an existing item', () => {
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
                expect(setStorageSpy).toHaveBeenCalledWith('foo', "[\"a\",\"b\"]")
            });
        });
    });

    describe('when log is already read', () => {
        beforeEach(() => {
            service.readLog('foo');
            service.readLog('foo');
        });

        it('should only read the log once', () => {
            expect(readStorageSpy).toHaveBeenCalledTimes(1);
        });
    });
});