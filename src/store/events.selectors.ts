import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventModel } from '../core/models/events.model';
import * as fromReducer from './events.reducer';

export const getEventsState = createFeatureSelector<fromReducer.EventsState>('events');

export const getEventsPageState = createSelector(
    getEventsState,
    state => state
);

const stateGetIsLoading = (state: fromReducer.EventsState) => state.isLoading;

export const stateGetEvents = (state: fromReducer.EventsState) => state.items;

export const stateGetFilteredItems = (state: fromReducer.EventsState) => state.filteredItems;

export const getIsLoading = createSelector(
    getEventsPageState,
    stateGetIsLoading
);

export const getError = createSelector(
    getEventsPageState,
    state => state.error
);

export const getSuccess = createSelector(
    getEventsPageState,
    state => state.success
);

export const getEvents = createSelector(
    getEventsPageState,
    stateGetEvents
);

export const getFilteredEvents = createSelector(
    getEventsPageState,
    stateGetFilteredItems
);

export const getEventById = createSelector(
    getEventsPageState,
    state => state.items.filter((m: EventModel) => +m.id === state.selectedId)[0]
);

export const getSelectedEventId = createSelector(
    getEventsPageState,
    state => state.selectedId
);
