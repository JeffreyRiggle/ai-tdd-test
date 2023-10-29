import { PersistentEventEmitter } from "./persistentEventEmitter";
import { IBackingStore } from "./store"

describe('Persistent Event emitter', () => {
    let mockStorage: Pick<IBackingStore, 'readLog'> & { appendLog: jest.Mock };
    let eventEmitter: PersistentEventEmitter;

    beforeEach(() => {
        mockStorage = {
            readLog: <T>() => ['foo'] as T[],
            appendLog: jest.fn()
        };

        eventEmitter = new PersistentEventEmitter(mockStorage);
    });

    describe('when a subscriber is registered', () => {
        let cbMock: jest.Mock;
        let unsub: () => void;

        beforeEach(() => {
            cbMock = jest.fn();
            unsub = eventEmitter.subscribe('event', cbMock);
        });

        it('it should replay existing events', () => {
            expect(cbMock).toHaveBeenCalledWith('foo');
        });

        describe('when a new event comes in', () => {
            beforeEach(() => {
                eventEmitter.publish('event', 'bar');
            });

            it('should update with the new event', () => {
                expect(cbMock).toHaveBeenCalledWith('bar');
            });

            it('should store the event data', () => {
                expect(mockStorage.appendLog).toHaveBeenCalledWith('event', 'bar');
            });
        });

        describe('when listener is unregistered', () => {
            beforeEach(() => {
                unsub();
            });

            describe('and an event comes in', () => {
                beforeEach(() => {
                    eventEmitter.publish('event', 'baz');
                });

                it('should not update with the new event', () => {
                    expect(cbMock).not.toHaveBeenCalledWith('baz');
                });
    
                it('should store the event data', () => {
                    expect(mockStorage.appendLog).toHaveBeenCalledWith('event', 'baz');
                });
            });
        });
    });
});