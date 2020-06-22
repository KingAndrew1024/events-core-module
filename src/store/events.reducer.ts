import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from './events.actions';
import { EventModel } from '../core/models/events.model';
import { IEventsStateError, IEventsStateSuccess } from '../core/contracts/IStateErrorSuccess';


export interface EventsState {
    isLoading: boolean;
    items: EventModel[];
    filteredItems: EventModel[];
    selectedId: number;
    error: IEventsStateError,
    success: IEventsStateSuccess
}

export const initialState: EventsState = {
    isLoading: false,
    items: [],
    filteredItems: [],
    selectedId: null,
    error: null,
    success: null
}

const reducer = createReducer(
    initialState,
    //On Begin Actions
    on(fromActions.GetEventsBeginAction,
        fromActions.CreateEventBeginAction,
        fromActions.UpdateEventBeginAction,
        fromActions.DeleteEventBeginAction,
        (state): EventsState => ({
            ...state,
            error: null,
            success: null,
            isLoading: true
        })
    ),

    //ON Fail Actions
    on(fromActions.GetEventFailAction,
        fromActions.CreateEventFailAction,
        fromActions.UpdateEventFailAction,
        fromActions.DeleteEventFailAction,
        (state, action): EventsState => ({
            ...state,
            isLoading: false,
            error: { after: getErrorActionType(action.type), error: action.errors }
        })
    ),

    //ON Success
    on(fromActions.GetEventSuccessAction,
        (state, action): EventsState => ({
            ...state,
            isLoading: false,
            items: action.events,
            error: null,
            success: null
        })
    ),
    on(fromActions.CreateEventSuccessAction,
        (state, action): EventsState => ({
            ...state,
            isLoading: false,
            items: [action.event, ...state.items],
            error: null,
            success: { after: getSuccessActionType(action.type), data: action.event }
        })
    ),
    on(fromActions.UpdateEventSuccessAction,
        (state, action): EventsState => ({
            ...state,
            isLoading: false,
            items: [
                ...((el) => {
                    let tmp = [...el];

                    const idx = el.findIndex((m) => m.id == action.event.id);

                    if (idx !== -1)
                        tmp.splice(idx, 1, action.event)

                    return tmp;
                })(state.items),
            ],
            error: null,
            success: { after: getSuccessActionType(action.type) }
        })
    ),
    on(fromActions.DeleteEventSuccessAction,
        (state, action): EventsState => ({
            ...state,
            isLoading: false,
            items: [...state.items.filter((m: EventModel) => +m.id != action.eventId)],
            error: null,
            success: { after: getSuccessActionType(action.type) }
        })
    ),

    //SELECT
    on(fromActions.SelectEventAction, (state, action): EventsState => ({
        ...state,
        selectedId: action.eventId,
        error: null,
        success: null
    })),
)

function getErrorActionType(type: fromActions.EventsActionTypes) {

    let action: "GET" | "CREATE" | "UPDATE" | "DELETE" | "UNKNOWN" = "UNKNOWN";

    switch (type) {
        case fromActions.EventsActionTypes.GetEventsFail:
            action = "GET"; break;
        case fromActions.EventsActionTypes.CreateEventFail:
            action = "CREATE"; break;
        case fromActions.EventsActionTypes.UpdateEventFail:
            action = "UPDATE"; break;
        case fromActions.EventsActionTypes.DeleteEventFail:
            action = "DELETE"; break;
    }

    return action;
}

function getSuccessActionType(type: fromActions.EventsActionTypes) {

    let action: "GET" | "CREATE" | "UPDATE" | "DELETE" | "UNKNOWN" = "UNKNOWN";

    switch (type) {
        case fromActions.EventsActionTypes.GetEventsSuccess:
            action = "GET"; break;
        case fromActions.EventsActionTypes.CreateEventSuccess:
            action = "CREATE"; break;
        case fromActions.EventsActionTypes.UpdateEventSuccess:
            action = "UPDATE"; break;
        case fromActions.EventsActionTypes.DeleteEventSuccess:
            action = "DELETE"; break;
    }

    return action;
}

export function eventsReducer(state: EventsState | undefined, action: Action) {
    return reducer(state, action);
}