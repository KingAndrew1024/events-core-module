import { Injectable, Inject } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import * as fromActions from './events.actions';
import * as fromReducer from './events.reducer';
import { EVENTS_SERVICE } from '../services/identifiers';
import { IEventsService } from '../core/contracts/IEvents.service';
import { EventModel } from '../core/models/events.model';


@Injectable()
export class EventsEffects {
    load$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.GetEventsBegin),
            switchMap(() => {
                return this.service.getEvents().pipe(
                    map((events: EventModel[]) => fromActions.GetEventSuccessAction({ events })),
                    catchError(errors => {
                        console.error("Couldn't get events");
                        return of(fromActions.GetEventFailAction({ errors }));
                    })
                )
            })
        )
    )

    create$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.CreateEventBegin),
            switchMap((action) => {
                return this.service.createEvent((<any>action).payload).pipe(
                    map((event: EventModel) => fromActions.CreateEventSuccessAction({ event })),
                    catchError(errors => {
                        console.error("Couldn't Create event");
                        return of(fromActions.CreateEventFailAction({ errors }));
                    })
                )
            })
        )
    )

    update$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.UpdateEventBegin),
            switchMap((action) => {
                return this.service.updateEvent((<any>action).id, (<any>action).payload).pipe(
                    map((event: EventModel) => fromActions.UpdateEventSuccessAction({ event })),
                    catchError(errors => {
                        console.error("Couldn't Update event");
                        return of(fromActions.UpdateEventFailAction({ errors }));
                    })
                )
            })
        )
    )

    delete$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.DeleteEventBegin),
            switchMap((action) => {
                return this.service.deleteEvent((<any>action).eventId).pipe(
                    map((success: boolean) => {
                        if(success)
                            return fromActions.DeleteEventSuccessAction({ eventId: (<any>action).eventId })
                        else
                            return fromActions.DeleteEventFailAction({ errors: "Error desconocido" })
                    }),
                    catchError(errors => {
                        console.error("Couldn't Delete event");
                        return of(fromActions.DeleteEventFailAction({ errors }));
                    })
                )
            })
        )
    )
    
    constructor(
        private actions$: Actions,
        @Inject(EVENTS_SERVICE) private service: IEventsService<EventModel>
    ){}   
}