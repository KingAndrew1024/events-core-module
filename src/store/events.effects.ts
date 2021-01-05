import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IEventsService } from '../core/contracts/IEvents.service';
import { EventModel } from '../core/models/events.model';
import { EVENTS_SERVICE } from '../services/identifiers';
import * as fromActions from './events.actions';
import * as fromReducer from './events.reducer';

@Injectable()
export class EventsEffects {
    load$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.GetEventsBegin),
            switchMap(() => {
                return this.service.getEvents().pipe(
                    map((events: EventModel[]) => fromActions.GetEventSuccessAction({ events })),
                    catchError(errors => {
                        console.error('Couldn\'t get events');
                        return of(fromActions.GetEventFailAction({ errors }));
                    })
                );
            })
        )
    );

    create$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.CreateEventBegin),
            switchMap((action) => {
                return this.service.createEvent((action as any).payload).pipe(
                    map((event: EventModel) => fromActions.CreateEventSuccessAction({ event })),
                    catchError(errors => {
                        console.error('Couldn\'t Create event');
                        return of(fromActions.CreateEventFailAction({ errors }));
                    })
                );
            })
        )
    );

    update$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.UpdateEventBegin),
            switchMap((action) => {
                return this.service.updateEvent((action as any).id, (action as any).payload).pipe(
                    map((event: EventModel) => fromActions.UpdateEventSuccessAction({ event })),
                    catchError(errors => {
                        console.error('Couldn\'t Update event');
                        return of(fromActions.UpdateEventFailAction({ errors }));
                    })
                );
            })
        )
    );

    delete$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.EventsActionTypes.DeleteEventBegin),
            switchMap((action) => {
                return this.service.deleteEvent((action as any).eventId).pipe(
                    map((success: boolean) => {
                        if (success) {
                            return fromActions.DeleteEventSuccessAction({ eventId: (action as any).eventId });
                        }
                        else {
                            return fromActions.DeleteEventFailAction({ errors: 'Error desconocido' });
                        }
                    }),
                    catchError(errors => {
                        console.error('Couldn\'t Delete event');
                        return of(fromActions.DeleteEventFailAction({ errors }));
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        @Inject(EVENTS_SERVICE) private service: IEventsService<EventModel>
    ) { }
}

export interface AppState {
    events: fromReducer.EventsState;
}
