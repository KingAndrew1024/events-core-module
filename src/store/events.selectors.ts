import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromReducer from './events.reducer';
import { EventModel } from '../core/models/events.model';


export const getEventsState = createFeatureSelector<fromReducer.EventsState>('events');

export const getEventsPageState = createSelector(
    getEventsState,
    state => state
);

const _getIsLoading = (state: fromReducer.EventsState) => state.isLoading;

export const _getEvents = (state: fromReducer.EventsState) => state.items;

export const _getFilteredItems = (state: fromReducer.EventsState) => state.filteredItems;

export const getIsLoading = createSelector(
    getEventsPageState,
    _getIsLoading
);

export const getError = createSelector(
    getEventsPageState,
    state => state.error
)

export const getSuccess = createSelector(
    getEventsPageState,
    state => state.success
)

export const getEvents = createSelector(
    getEventsPageState,
    _getEvents
)

export const getFilteredEvents = createSelector(
    getEventsPageState,
    _getFilteredItems
)

export const getEventById = createSelector(
    getEventsPageState,
    state => state.items.filter((m: EventModel) => +m.id == state.selectedId)[0]
)

export const getSelectedEventId = createSelector(
    getEventsPageState,
    state => state.selectedId
)