import * as fromReducer from './events.reducer';
import * as fromActions from './events.actions';
import { TEST_EVENTS_FORM_MODEL, TEST_EVENTS_FORM_MODEL_LIST } from '../mocks/events.data';

describe('Events Reducer', () => {
    const { initialState } = fromReducer;

    const thrownError = 'some bad error';

    describe('On unknown Action', () => {
        it('should return the default state', () => {

            const action = { type: 'Unknown' };

            const state = fromReducer.eventsReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('On Begin Actions', () => {
        it('should set State.isLoading = true', () => {
            const expectedState: fromReducer.EventsState = {
                ...initialState,
                error: null,
                success: null,
                isLoading: true,
            };

            const eventId = 123;

            let state: fromReducer.EventsState;

            const getAction = fromActions.GetEventsBeginAction();
            state = fromReducer.eventsReducer(initialState, getAction);
            expect(state).toEqual(expectedState);

            const createAction = fromActions.CreateEventBeginAction({} as any);
            state = fromReducer.eventsReducer(initialState, createAction);
            expect(state).toEqual(expectedState);

            const updateAction = fromActions.UpdateEventBeginAction({ id: eventId, payload: {} as any });
            state = fromReducer.eventsReducer(initialState, updateAction);
            expect(state).toEqual(expectedState);

            const deleteAction = fromActions.DeleteEventBeginAction({ eventId });
            state = fromReducer.eventsReducer(initialState, deleteAction);
            expect(state).toEqual(expectedState);
        });
    });

    describe('On Success Actions should update the State', () => {
        it('GetEventSuccessAction', () => {
            const items = [TEST_EVENTS_FORM_MODEL as any];

            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: null,
                success: { after: 'GET' },
                items,
            };

            let state: fromReducer.EventsState;

            const getAction = fromActions.GetEventSuccessAction({ events: items });
            state = fromReducer.eventsReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });

        it('CreateEventSuccessAction', () => {
            const item = TEST_EVENTS_FORM_MODEL as any;

            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: null,
                success: { after: 'CREATE', data: item },
                items: [item, ...initialState.items],
            };

            let state: fromReducer.EventsState;

            const getAction = fromActions.CreateEventSuccessAction({ event: item });
            state = fromReducer.eventsReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });

        it('UpdateEventSuccessAction', () => {

            const updatedItem = TEST_EVENTS_FORM_MODEL_LIST[1] as any;
            updatedItem.title = 'New Title';

            initialState.items = [...TEST_EVENTS_FORM_MODEL_LIST as any];

            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: null,
                success: { after: 'UPDATE' },
                items: [TEST_EVENTS_FORM_MODEL_LIST[0], updatedItem, TEST_EVENTS_FORM_MODEL_LIST[2]],
            };

            let state: fromReducer.EventsState;

            const getAction = fromActions.UpdateEventSuccessAction({ event: updatedItem as any });
            state = fromReducer.eventsReducer(initialState, getAction);

            expect(state).toEqual(expectedState);
        });

        it('DeleteEventSuccessAction', () => {

            initialState.items = [...TEST_EVENTS_FORM_MODEL_LIST as any];

            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: null,
                success: { after: 'DELETE' },
                items: [TEST_EVENTS_FORM_MODEL_LIST[0], TEST_EVENTS_FORM_MODEL_LIST[2] as any],
            };

            let state: fromReducer.EventsState;

            const getAction = fromActions.DeleteEventSuccessAction({ eventId: TEST_EVENTS_FORM_MODEL_LIST[1].id });
            state = fromReducer.eventsReducer(initialState, getAction);

            expect(state).toEqual(expectedState);
        });
    });

    describe('On Fail Actions', () => {
        it('GetEventFailAction should set State.error { after: \'GET\', error: any }', () => {
            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: { after: 'GET', error: thrownError },
            };

            let state: fromReducer.EventsState;

            const getAction = fromActions.GetEventFailAction({ errors: thrownError });
            state = fromReducer.eventsReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });

        it('CreateEventFailAction should set State.error { after: \'CREATE\', error: any }', () => {
            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: { after: 'CREATE', error: thrownError },
            };

            let state: fromReducer.EventsState;

            const createAction = fromActions.CreateEventFailAction({ errors: thrownError });
            state = fromReducer.eventsReducer(initialState, createAction);
            expect(state).toEqual(expectedState);
        });

        it('UpdateEventFailAction should set State.error { after: \'UPDATE\', error: any }', () => {
            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: { after: 'UPDATE', error: thrownError },
            };

            let state: fromReducer.EventsState;

            const createAction = fromActions.UpdateEventFailAction({ errors: thrownError });
            state = fromReducer.eventsReducer(initialState, createAction);
            expect(state).toEqual(expectedState);
        });

        it('DeleteEventFailAction should set State.error { after: \'DELETE\', error: any }', () => {
            const expectedState: fromReducer.EventsState = {
                ...initialState,
                isLoading: false,
                error: { after: 'DELETE', error: thrownError },
            };

            let state: fromReducer.EventsState;

            const createAction = fromActions.DeleteEventFailAction({ errors: thrownError });
            state = fromReducer.eventsReducer(initialState, createAction);
            expect(state).toEqual(expectedState);
        });
    });

    it('SelectEventAction', () => {

        initialState.items = TEST_EVENTS_FORM_MODEL_LIST as any;

        const expectedState: fromReducer.EventsState = {
            ...initialState,
            error: null,
            success: null,
            selectedId: TEST_EVENTS_FORM_MODEL_LIST[1].id
        };

        let state: fromReducer.EventsState;

        const getAction = fromActions.SelectEventAction({ eventId: TEST_EVENTS_FORM_MODEL_LIST[1].id });
        state = fromReducer.eventsReducer(initialState, getAction);
        expect(state).toEqual(expectedState);
    });
});
