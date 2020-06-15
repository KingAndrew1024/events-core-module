import { createAction, props } from '@ngrx/store'

import { EventModel } from '../core/models/events.model'
import { IEventsCommonProps } from '../core/contracts/IEvents.repository'

export enum EventsActionTypes {
    GetEventsBegin = "[Calendar] Get Events begin",
    GetEventsSuccess = "[Calendar] Get Events success",
    GetEventsFail = "[Calendar] Get Events failure",

    CreateEventBegin = "[Calendar] Create Event begin",
    CreateEventSuccess = "[Calendar] Create Event success",
    CreateEventFail = "[Calendar] Create Event failure",

    UpdateEventBegin = "[Calendar] Update Event begin",
    UpdateEventSuccess = "[Calendar] Update Event success",
    UpdateEventFail = "[Calendar] Update Event failure",

    DeleteEventBegin = "[Calendar] Delete Event begin",
    DeleteEventSuccess = "[Calendar] Delete Event success",
    DeleteEventFail = "[Calendar] Delete Event failure",

    SelectEvent = "[Calendar] Select Event"
}

//GET
export const GetEventsBeginAction = createAction(
    EventsActionTypes.GetEventsBegin
)

export const GetEventSuccessAction = createAction(
    EventsActionTypes.GetEventsSuccess,
    props<{ events: EventModel[] }>()
)

export const GetEventFailAction = createAction(
    EventsActionTypes.GetEventsFail,
    props<{ errors: any }>()
)

//CREATE
export const CreateEventBeginAction = createAction(
    EventsActionTypes.CreateEventBegin,
    props<{ payload: IEventsCommonProps }>()
)

export const CreateEventSuccessAction = createAction(
    EventsActionTypes.CreateEventSuccess,
    props<{ event: EventModel }>()
)

export const CreateEventFailAction = createAction(
    EventsActionTypes.CreateEventFail,
    props<{ errors: any }>()
)

//UPDATE
export const UpdateEventBeginAction = createAction(
    EventsActionTypes.UpdateEventBegin,
    props<{ id: number, payload: IEventsCommonProps }>()
)

export const UpdateEventSuccessAction = createAction(
    EventsActionTypes.UpdateEventSuccess,
    props<{ event: EventModel }>()
)

export const UpdateEventFailAction = createAction(
    EventsActionTypes.UpdateEventFail,
    props<{ errors: any }>()
)

//DELETE
export const DeleteEventBeginAction = createAction(
    EventsActionTypes.DeleteEventBegin,
    props<{ eventId: number }>()
)

export const DeleteEventSuccessAction = createAction(
    EventsActionTypes.DeleteEventSuccess,
    props<{ eventId: number }>()
)

export const DeleteEventFailAction = createAction(
    EventsActionTypes.DeleteEventFail,
    props<{ errors: any }>()
)

export const SelectEventAction = createAction(
    EventsActionTypes.SelectEvent,
    props<{ eventId: number }>()
)