import { TEST_EVENTS_FORM_MODEL_LIST } from '../mocks/events.data';
import { AppState } from './events.effects';
import * as fromReducer from './events.reducer';
import {
    getError,
    getEventById,
    getEventsPageState,
    getIsLoading,
    getSelectedEventId,
    getSuccess,
    stateGetEvents,
    stateGetFilteredItems,
    stateGetIsLoading
} from './events.selectors';

describe('Events Selectors', () => {
    const state: fromReducer.EventsState = {
        ...fromReducer.initialState,
        isLoading: true,
        items: [...TEST_EVENTS_FORM_MODEL_LIST as any],
        filteredItems: TEST_EVENTS_FORM_MODEL_LIST.slice(1) as any,
        selectedId: TEST_EVENTS_FORM_MODEL_LIST[1].id,
    };

    const pageState: AppState = { events: state };

    it('stateGetIsLoading should retrieve state.isLoading value', () => {
        expect(stateGetIsLoading(state)).toBe(state.isLoading);
    });

    it('stateGetEvents should retrieve state.items value', () => {
        expect(stateGetEvents(state)).toBe(state.items);
    });

    it('stateGetFilteredItems should retrieve state.filteredItems value', () => {
        expect(stateGetFilteredItems(state)).toEqual(TEST_EVENTS_FORM_MODEL_LIST.slice(1) as any);
    });

    it('getEventsPageState should retrieve state', () => {
        expect(getEventsPageState(pageState)).toBe(state);
    });

    it('getIsLoading should retrieve state.isLoading value', () => {
        expect(getIsLoading(pageState)).toBe(state.isLoading);
    });

    it('getError should retrieve state.error value', () => {
        expect(getError(pageState)).toBe(state.error);
    });

    it('getSuccess should retrieve state.success value', () => {
        expect(getSuccess(pageState)).toBe(state.success);
    });

    it('getEventById should retrieve the event with id = state.selectedId', () => {
        expect(getEventById(pageState)).toEqual(TEST_EVENTS_FORM_MODEL_LIST[1] as any);
    });

    it('getSelectedEventId should retrieve state.selectedId', () => {
        expect(getSelectedEventId(pageState)).toEqual(TEST_EVENTS_FORM_MODEL_LIST[1].id);
    });
});
