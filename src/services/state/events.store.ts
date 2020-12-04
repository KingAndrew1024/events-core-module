import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IEventsCommonProps } from '../../core/contracts/IEvents.repository';
import * as fromActions from '../../store/events.actions';
import * as fromReducer from '../../store/events.reducer';
import * as fromSelector from '../../store/events.selectors';

@Injectable()
export class EventsStore {
    constructor(private store: Store<fromReducer.EventsState>) { }

    get Loading$() {
        return this.store.select(fromSelector.getIsLoading);
    }

    get Error$() {
        return this.store.select(fromSelector.getError);
    }

    get Success$() {
        return this.store.select(fromSelector.getSuccess);
    }

    get Calendar$() {
        return this.store.select(fromSelector.getEvents);
    }

    EventById$(id: number) {
        this.store.dispatch(fromActions.SelectEventAction({ eventId: id }));
        return this.store.select(fromSelector.getEventById);
    }

    selectedEvent$() {
        return this.store.select(fromSelector.getSelectedEventId);
    }

    getEvents() {
        return this.store.dispatch(fromActions.GetEventsBeginAction());
    }

    createEvent(payload: IEventsCommonProps) {
        return this.store.dispatch(fromActions.CreateEventBeginAction({ payload }));
    }

    updateEvent(id: number, payload: IEventsCommonProps) {
        return this.store.dispatch(fromActions.UpdateEventBeginAction({ id, payload }));
    }

    deleteEvent(eventId: number) {
        return this.store.dispatch(fromActions.DeleteEventBeginAction({ eventId }));
    }

}
